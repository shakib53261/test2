import Link from "next/link";
import { BarChart3, Users, FileText, Settings } from "lucide-react";

interface QuickAccessProps {
  role?: string;
}

export default function QuickAccess({ role = "Employee" }: QuickAccessProps) {
  // Different quick access items based on user role
  const accessItems = {
    "Super Admin": [
      {
        title: "Client Management",
        description: "Manage all clients and their details",
        icon: <Users className="h-6 w-6" />,
        href: "/dashboard/clients",
      },
      {
        title: "Financial Overview",
        description: "View financial reports and analytics",
        icon: <BarChart3 className="h-6 w-6" />,
        href: "/dashboard/finances",
      },
      {
        title: "User Management",
        description: "Manage user roles and permissions",
        icon: <Users className="h-6 w-6" />,
        href: "/dashboard/user-management",
      },
      {
        title: "HR Portal",
        description: "Manage employees and HR functions",
        icon: <FileText className="h-6 w-6" />,
        href: "/dashboard/hr",
      },
      {
        title: "System Settings",
        description: "Configure system settings and roles",
        icon: <Settings className="h-6 w-6" />,
        href: "/dashboard/settings",
      },
    ],
    Admin: [
      {
        title: "Client Management",
        description: "Manage clients and their details",
        icon: <Users className="h-6 w-6" />,
        href: "/dashboard/clients",
      },
      {
        title: "Financial Reports",
        description: "View and generate financial reports",
        icon: <BarChart3 className="h-6 w-6" />,
        href: "/dashboard/finances",
      },
      {
        title: "HR Portal",
        description: "Access HR functions and employee data",
        icon: <FileText className="h-6 w-6" />,
        href: "/dashboard/hr",
      },
      {
        title: "Department Settings",
        description: "Configure department settings",
        icon: <Settings className="h-6 w-6" />,
        href: "/dashboard/settings",
      },
    ],
    "Project Manager": [
      {
        title: "Project Clients",
        description: "View and manage project clients",
        icon: <Users className="h-6 w-6" />,
        href: "/dashboard/clients",
      },
      {
        title: "Project Finances",
        description: "Track project budgets and expenses",
        icon: <BarChart3 className="h-6 w-6" />,
        href: "/dashboard/finances",
      },
      {
        title: "Team Management",
        description: "Manage your project team members",
        icon: <FileText className="h-6 w-6" />,
        href: "/dashboard/team",
      },
      {
        title: "Project Settings",
        description: "Configure project settings",
        icon: <Settings className="h-6 w-6" />,
        href: "/dashboard/settings",
      },
    ],
    Employee: [
      {
        title: "My Tasks",
        description: "View and manage your assigned tasks",
        icon: <FileText className="h-6 w-6" />,
        href: "/dashboard/tasks",
      },
      {
        title: "Time Tracking",
        description: "Log and view your working hours",
        icon: <BarChart3 className="h-6 w-6" />,
        href: "/dashboard/time",
      },
      {
        title: "Leave Requests",
        description: "Submit and track leave requests",
        icon: <FileText className="h-6 w-6" />,
        href: "/dashboard/leave",
      },
      {
        title: "Personal Settings",
        description: "Update your profile and preferences",
        icon: <Settings className="h-6 w-6" />,
        href: "/dashboard/settings",
      },
    ],
  };

  // Map the role string to the key in accessItems
  const roleKey =
    role === "Super Admin"
      ? "Super Admin"
      : role === "Admin"
        ? "Admin"
        : role === "Project Manager"
          ? "Project Manager"
          : "Employee";

  // Use the role to get the appropriate quick access items, defaulting to Employee if role not found
  const roleAccessItems =
    accessItems[roleKey as keyof typeof accessItems] || accessItems["Employee"];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roleAccessItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow flex flex-col gap-2"
          >
            <div className="bg-orange-100 p-3 rounded-full w-fit">
              <div className="text-orange-600">{item.icon}</div>
            </div>
            <h3 className="font-semibold mt-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
