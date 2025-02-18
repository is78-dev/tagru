import "server-only";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const selectUser = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("[error] selectUser: ", error.message);
    return null;
  }

  return data.user;
});
