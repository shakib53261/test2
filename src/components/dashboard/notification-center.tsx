import { Bell, Check, X } from "lucide-react";
import { Button } from "../ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

export default function NotificationCenter() {
  // Sample notifications data
  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Client Added",
      message: 'A new client "Acme Corp" has been added to the system.',
      time: "10 minutes ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Payment Received",
      message: 'Payment of $2,500 received from client "TechSolutions Inc."',
      time: "2 hours ago",
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "Project Deadline Approaching",
      message: 'The "Website Redesign" project deadline is in 3 days.',
      time: "5 hours ago",
      read: false,
      type: "warning",
    },
  ];

  // Get the appropriate background color based on notification type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-600";
      case "success":
        return "bg-green-100 text-green-600";
      case "warning":
        return "bg-yellow-100 text-yellow-600";
      case "error":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <Button variant="outline" size="sm" className="text-xs">
          Mark all as read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-lg border p-4 flex gap-4"
            >
              <div
                className={`${getTypeColor(notification.type)} p-2 rounded-full h-fit`}
              >
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="text-green-500 hover:text-green-600">
                  <Check className="h-5 w-5" />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border p-6 text-center">
            <p className="text-muted-foreground">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
