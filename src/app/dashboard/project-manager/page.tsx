import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardLayout from "@/components/dashboard/layout";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import MetricsCards from "@/components/dashboard/metrics-cards";
import QuickAccess from "@/components/dashboard/quick-access";
import NotificationCenter from "@/components/dashboard/notification-center";
import RecentActivity from "@/components/dashboard/recent-activity";

export default async function ProjectManagerDashboard() {
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

  // Check if user has Project Manager role
  if (profile?.role !== "Project Manager") {
    return redirect("/dashboard");
  }

  return (
    <DashboardLayout role="Project Manager">
      <DashboardHeader />
      <MetricsCards role="Project Manager" />
      <QuickAccess role="Project Manager" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NotificationCenter />
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}
