import Sidebar from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: string;
}

export default function DashboardLayout({
  children,
  role = "Employee",
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={role} />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
