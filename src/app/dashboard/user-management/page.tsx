import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardLayout from "@/components/dashboard/layout";
import UserManagement from "@/components/dashboard/user-management";

export default async function UserManagementPage() {
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

  // Check if user has Super Admin role
  if (profile?.role !== "Super Admin") {
    return redirect("/dashboard");
  }

  return (
    <DashboardLayout role="Super Admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts, roles, and permissions across the system.
        </p>
        <UserManagement />
      </div>
    </DashboardLayout>
  );
}
