import { redirect } from "next/navigation";
import { createClient } from "../../../../../supabase/server";
import DashboardLayout from "@/components/dashboard/layout";
import ClientDetails from "@/components/dashboard/client-details";

export default async function ClientDetailsPage({
  params,
}: {
  params: { id: string };
}) {
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

  // Get client details
  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!client) {
    return redirect("/dashboard/clients");
  }

  return (
    <DashboardLayout role={profile?.role || "Employee"}>
      <ClientDetails client={client} />
    </DashboardLayout>
  );
}
