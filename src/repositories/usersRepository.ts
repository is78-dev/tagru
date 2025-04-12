import "server-only";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

// 取得
export const getUserRepository = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("[error] getUserRepository: ", error.message);
    return null;
  }

  return data.user;
});
