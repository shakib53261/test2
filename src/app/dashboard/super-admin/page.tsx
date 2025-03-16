import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../supabase/server";
import DashboardLayout from "@/components/dashboard/layout";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import MetricsCards from "@/components/dashboard/metrics-cards";
import QuickAccess from "@/components/dashboard/quick-access";
import NotificationCenter from "@/components/dashboard/notification-center";
import RecentActivity from "@/components/dashboard/recent-activity";
import { Button } from "@/components/ui/button";

export default async function SuperAdminDashboard() {
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
      <DashboardHeader />
      <MetricsCards role="Super Admin" />
      <QuickAccess role="Super Admin" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NotificationCenter />
        <RecentActivity />
      </div>

      {/* User Role Management Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">User Role Management</h2>
        <div className="bg-white rounded-lg border p-6">
          <p className="mb-4">
            Manage user roles and permissions across the system.
          </p>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/dashboard/user-management">Manage User Roles</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
