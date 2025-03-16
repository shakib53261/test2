import { BarChart3, Users, FileText, DollarSign } from "lucide-react";

interface MetricsCardsProps {
  role?: string;
}

export default function MetricsCards({ role = "Employee" }: MetricsCardsProps) {
  // Different metrics based on user role
  const metrics = {
    "Super Admin": [
      {
        title: "Total Revenue",
        value: "$128,430",
        change: "+12.5%",
        icon: <DollarSign className="h-5 w-5" />,
      },
      {
        title: "Active Clients",
        value: "64",
        change: "+3",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Projects",
        value: "24",
        change: "+2",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Employees",
        value: "38",
        change: "+5",
        icon: <Users className="h-5 w-5" />,
      },
    ],
    Admin: [
      {
        title: "Monthly Revenue",
        value: "$42,384",
        change: "+8.3%",
        icon: <DollarSign className="h-5 w-5" />,
      },
      {
        title: "Active Clients",
        value: "48",
        change: "+2",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Projects",
        value: "18",
        change: "+1",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Team Members",
        value: "24",
        change: "+3",
        icon: <Users className="h-5 w-5" />,
      },
    ],
    "Project Manager": [
      {
        title: "Project Budget",
        value: "$24,500",
        change: "-2.1%",
        icon: <DollarSign className="h-5 w-5" />,
      },
      {
        title: "Project Clients",
        value: "12",
        change: "0",
        icon: <Users className="h-5 w-5" />,
      },
      {
        title: "Active Tasks",
        value: "36",
        change: "+8",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Team Members",
        value: "8",
        change: "0",
        icon: <Users className="h-5 w-5" />,
      },
    ],
    Employee: [
      {
        title: "Tasks Completed",
        value: "18",
        change: "+4",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Hours Logged",
        value: "164",
        change: "+12",
        icon: <BarChart3 className="h-5 w-5" />,
      },
      {
        title: "Projects Assigned",
        value: "3",
        change: "0",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Leave Balance",
        value: "14 days",
        change: "0",
        icon: <FileText className="h-5 w-5" />,
      },
    ],
  };

  // Map the role string to the key in metrics
  const roleKey =
    role === "Super Admin"
      ? "Super Admin"
      : role === "Admin"
        ? "Admin"
        : role === "Project Manager"
          ? "Project Manager"
          : "Employee";

  // Use the role to get the appropriate metrics, defaulting to Employee if role not found
  const roleMetrics =
    metrics[roleKey as keyof typeof metrics] || metrics["Employee"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {roleMetrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border p-6 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <div className="bg-orange-100 p-2 rounded-md">
              <div className="text-orange-600">{metric.icon}</div>
            </div>
            <div
              className={`text-xs font-medium ${metric.change.startsWith("+") ? "text-green-600" : metric.change.startsWith("-") ? "text-red-600" : "text-gray-600"}`}
            >
              {metric.change}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">{metric.title}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
