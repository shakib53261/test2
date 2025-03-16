import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import DashboardLayout from "@/components/dashboard/layout";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import MetricsCards from "@/components/dashboard/metrics-cards";
import QuickAccess from "@/components/dashboard/quick-access";
import NotificationCenter from "@/components/dashboard/notification-center";
import RecentActivity from "@/components/dashboard/recent-activity";
import DebugUserInfo from "./debug";

export default async function Dashboard() {
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

  // Default to a generic role if none is found
  const userRole = profile?.role || "Employee";

  console.log("User role from database:", userRole);
  console.log("User profile:", profile);

  // Redirect to role-specific dashboard
  if (userRole === "Super Admin") {
    return redirect("/dashboard/super-admin");
  } else if (userRole === "Admin") {
    return redirect("/dashboard/admin");
  } else if (userRole === "Project Manager") {
    return redirect("/dashboard/project-manager");
  } else if (userRole === "Employee") {
    return redirect("/dashboard/employee");
  }

  // Fallback dashboard if role doesn't match any of the above
  return (
    <DashboardLayout role={userRole}>
      <DashboardHeader />
      <MetricsCards role={userRole} />
      <QuickAccess role={userRole} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NotificationCenter />
        <RecentActivity />
      </div>
      <div className="mt-8">
        <DebugUserInfo />
      </div>
    </DashboardLayout>
  );
}
