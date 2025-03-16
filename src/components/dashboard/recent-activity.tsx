import { Clock } from "lucide-react";

interface Activity {
  id: string;
  action: string;
  user: string;
  time: string;
  details: string;
}

export default function RecentActivity() {
  // Sample activity data
  const activities: Activity[] = [
    {
      id: "1",
      action: "Added new client",
      user: "John Doe",
      time: "10:30 AM",
      details: 'Added "Global Tech Solutions" as a new client',
    },
    {
      id: "2",
      action: "Updated project",
      user: "Jane Smith",
      time: "09:45 AM",
      details: 'Updated deadline for "Website Redesign" project',
    },
    {
      id: "3",
      action: "Processed payment",
      user: "Mike Johnson",
      time: "Yesterday",
      details: 'Processed payment of $1,500 from "Acme Corp"',
    },
    {
      id: "4",
      action: "Added document",
      user: "Sarah Williams",
      time: "Yesterday",
      details: 'Uploaded "Q2 Financial Report" to documents',
    },
    {
      id: "5",
      action: "Approved leave request",
      user: "David Brown",
      time: "2 days ago",
      details: "Approved leave request for Emily Davis",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="divide-y">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="bg-orange-100 p-2 rounded-full h-fit">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.action}</span>
                  <span className="text-xs text-muted-foreground">
                    by {activity.user}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
