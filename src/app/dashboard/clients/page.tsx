import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardLayout from "@/components/dashboard/layout";
import ClientManagement from "@/components/dashboard/client-management";

export default async function ClientsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get user profile from the database to determine role
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <DashboardLayout role={profile?.role || "Employee"}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Client Management</h1>
        <p className="text-muted-foreground">
          Manage your clients, view their details, and track their activity.
        </p>
        <ClientManagement />
      </div>
    </DashboardLayout>
  );
}
