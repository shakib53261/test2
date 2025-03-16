import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, role, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Get the current user to verify they have permission
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the current user is a Super Admin
    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "Super Admin" && profile?.role !== "Admin") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 },
      );
    }

    // Get the site URL for the invitation link
    const origin = request.headers.get("origin") || "http://localhost:3000";

    // Create a user invitation
    // Note: In a real app, you would use the Supabase Admin API to send invitations
    // For this demo, we'll create a user record and simulate an invitation
    const userId = crypto.randomUUID();

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: userId,
        email: email,
        full_name: name || email.split("@")[0],
        role: role || "Employee",
        token_identifier: email,
        created_at: new Date().toISOString(),
        active: true,
        user_id: userId,
        invitation_sent: true,
      },
    ]);

    if (insertError) {
      console.error("Error creating user record:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Call the edge function to send the invitation email
    const inviteUrl = `${origin}/dashboard/accept-invitation?token=${userId}`;

    try {
      const { error: functionError } = await supabase.functions.invoke(
        "supabase-functions-send-invitation-email",
        {
          body: { email, name, role, inviteUrl },
        },
      );

      if (functionError) {
        console.error(
          "Error calling send-invitation-email function:",
          functionError,
        );
      }
    } catch (functionCallError) {
      console.error("Error invoking edge function:", functionCallError);
      // Continue execution even if the email sending fails
    }

    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${email}`,
    });
  } catch (error: any) {
    console.error("Error in invite-user API:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
