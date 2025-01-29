import "server-only";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getUser = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("getUser: ", error.message);
    return null;
  }

  return data.user;
});
