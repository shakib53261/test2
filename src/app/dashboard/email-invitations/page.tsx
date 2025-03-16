"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../../supabase/client";
import { Mail, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface EmailInvitation {
  id: string;
  recipient_email: string;
  recipient_name?: string;
  role: string;
  invite_url?: string;
  sent_at: string;
  status: string;
}

export default function EmailInvitationsPage() {
  const [invitations, setInvitations] = useState<EmailInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("email_invitations")
        .select("*")
        .order("sent_at", { ascending: false });

      if (error) throw error;

      console.log("Fetched invitations:", data);
      setInvitations(data || []);
    } catch (error) {
      console.error("Error fetching invitations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInvitations = invitations.filter(
    (invitation) =>
      invitation.recipient_email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (invitation.recipient_name &&
        invitation.recipient_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      invitation.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Email Invitations</h2>
        <Button
          variant="outline"
          onClick={fetchInvitations}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search invitations by email, name or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Loading invitations...
              </p>
            </CardContent>
          </Card>
        ) : filteredInvitations.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No invitations found
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredInvitations.map((invitation) => (
            <Card key={invitation.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">
                      {invitation.recipient_name || "No name"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {invitation.recipient_email}
                    </p>
                    <div className="mt-1 flex gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {invitation.role}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {invitation.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Sent: {formatDate(invitation.sent_at)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Mail className="h-4 w-4" />
                      Resend
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
