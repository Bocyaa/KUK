import { supabase } from "@app/lib/supabaseClient";
import { useState } from "react";

type UpdateFields = Record<string, any>;

export function useUpdateUserProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pass the fields to update
  const updateProfile = async (fields: UpdateFields) => {
    setLoading(true);
    setError(null);

    // Get user id from supabase auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("User not authenticated!");
      setLoading(false);
      return { error: "User not authenticated" };
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update(fields)
      .eq("id", user.id);

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return { error: updateError.message };
    }
    return { error: null };
  };

  return { updateProfile, loading, error };
}
