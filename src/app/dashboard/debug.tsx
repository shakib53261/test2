"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../supabase/client";

export default function DebugUserInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const supabase = createClient();

        // Get the current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          setError("No user found");
          setLoading(false);
          return;
        }

        // Get the user profile
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        setUserInfo({ user, profile });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <div className="p-4">Loading user information...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-white rounded-lg border">
      <h2 className="text-xl font-bold mb-4">User Debug Information</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Auth User:</h3>
        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-40">
          {JSON.stringify(userInfo?.user, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold mb-2">User Profile:</h3>
        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-40">
          {JSON.stringify(userInfo?.profile, null, 2)}
        </pre>
      </div>
    </div>
  );
}
