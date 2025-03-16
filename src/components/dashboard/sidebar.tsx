"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  Home,
  CreditCard,
  Calendar,
  LifeBuoy,
  LogOut,
  Mail,
} from "lucide-react";
import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";

interface SidebarProps {
  role?: string;
}

export default function Sidebar({ role = "Employee" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Different menu items based on user role
  const menuItems = {
    "Super Admin": [
      {
        title: "Dashboard",
        icon: <Home className="h-5 w-5" />,
        href: "/dashboard",
      },
      {
        title: "Clients",
        icon: <Users className="h-5 w-5" />,
        href: "/dashboard/clients",
      },
      {
        title: "Finances",
        icon: <CreditCard className="h-5 w-5" />,
        href: "/dashboard/finances",
      },
      {
        title: "HR Portal",
        icon: <FileText className="h-5 w-5" />,
        href: "/dashboard/hr",
      },
      {
        title: "User Management",
        icon: <Users className="h-5 w-5" />,
        href: "/dashboard/user-management",
      },
      {
        title: "Email Invitations",
        icon: <Mail className="h-5 w-5" />,
        href: "/dashboard/email-invitations",
      },
      {
        title: "Reports",
        icon: <BarChart3 className="h-5 w-5" />,
        href: "/dashboard/reports",
      },
      {
        title: "Calendar",
        icon: <Calendar className="h-5 w-5" />,
        href: "/dashboard/calendar",
      },
      {
        title: "Settings",
        icon: <Settings className="h-5 w-5" />,
        href: "/dashboard/settings",
      },
    ],
    Admin: [
      {
        title: "Dashboard",
        icon: <Home className="h-5 w-5" />,
        href: "/dashboard",
      },
      {
        title: "Clients",
        icon: <Users className="h-5 w-5" />,
        href: "/dashboard/clients",
      },
      {
        title: "Finances",
        icon: <CreditCard className="h-5 w-5" />,
        href: "/dashboard/finances",
      },
      {
        title: "HR Portal",
        icon: <FileText className="h-5 w-5" />,
        href: "/dashboard/hr",
      },
      {
        title: "Reports",
        icon: <BarChart3 className="h-5 w-5" />,
        href: "/dashboard/reports",
      },
      {
        title: "Settings",
        icon: <Settings className="h-5 w-5" />,
        href: "/dashboard/settings",
      },
    ],
    "Project Manager": [
      {
        title: "Dashboard",
        icon: <Home className="h-5 w-5" />,
        href: "/dashboard",
      },
      {
        title: "Projects",
        icon: <FileText className="h-5 w-5" />,
        href: "/dashboard/projects",
      },
      {
        title: "Team",
        icon: <Users className="h-5 w-5" />,
        href: "/dashboard/team",
      },
      {
        title: "Clients",
        icon: <Users className="h-5 w-5" />,
        href: "/dashboard/clients",
      },
      {
        title: "Calendar",
        icon: <Calendar className="h-5 w-5" />,
        href: "/dashboard/calendar",
      },
      {
        title: "Reports",
        icon: <BarChart3 className="h-5 w-5" />,
        href: "/dashboard/reports",
      },
    ],
    Employee: [
      {
        title: "Dashboard",
        icon: <Home className="h-5 w-5" />,
        href: "/dashboard",
      },
      {
        title: "Tasks",
        icon: <FileText className="h-5 w-5" />,
        href: "/dashboard/tasks",
      },
      {
        title: "Time",
        icon: <Clock className="h-5 w-5" />,
        href: "/dashboard/time",
      },
      {
        title: "Leave",
        icon: <Calendar className="h-5 w-5" />,
        href: "/dashboard/leave",
      },
      {
        title: "Documents",
        icon: <FileText className="h-5 w-5" />,
        href: "/dashboard/documents",
      },
    ],
  };

  // Map the role string to the key in menuItems
  const roleKey =
    role === "Super Admin"
      ? "Super Admin"
      : role === "Admin"
        ? "Admin"
        : role === "Project Manager"
          ? "Project Manager"
          : "Employee";

  // Use the role to get the appropriate menu items, defaulting to Employee if role not found
  const roleMenuItems =
    menuItems[roleKey as keyof typeof menuItems] || menuItems["Employee"];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="h-screen w-64 border-r bg-white flex flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-xl font-bold">TigFin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {roleMenuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md ${isActive ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard/help"
              className="flex items-center gap-3 px-4 py-2.5 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <LifeBuoy className="h-5 w-5" />
              <span>Help & Support</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
