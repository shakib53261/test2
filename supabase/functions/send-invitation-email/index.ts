import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, name, role, inviteUrl } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // In a real application, you would send an email here
    // For this demo, we'll log the invitation details
    console.log(`Sending invitation to ${email} with role ${role}`);

    // For demonstration purposes, we'll simulate sending an email
    // by storing the invitation in a new table
    const { error: insertError } = await supabaseAdmin
      .from("email_invitations")
      .insert([
        {
          recipient_email: email,
          recipient_name: name || email.split("@")[0],
          role: role || "Employee",
          invite_url: inviteUrl || "https://tigfin.example.com/accept-invite",
          sent_at: new Date().toISOString(),
          status: "sent",
        },
      ]);

    if (insertError) {
      console.error("Error storing invitation:", insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: `Invitation sent to ${email}` }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error in send-invitation-email function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
