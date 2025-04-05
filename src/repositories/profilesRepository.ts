import "server-only";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const insertProfile = cache(
  async (userId: string, userName: string, avatarUrl: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        user_id: userId,
        user_name: userName,
        avatar_url: avatarUrl,
      })
      .select()
      .single();

    if (error) {
      console.log("[error] insertProfile: ", error.message);
      return null;
    }

    return data;
  },
);

export const selectProfileByUserId = cache(async (userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.log("[error] selectProfileByUserId: ", error.message);
    return null;
  }

  return data;
});
