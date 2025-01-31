import "server-only";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const createProfile = cache(
  async (user_id: string, username: string, avatar_url: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        user_id: user_id,
        username: username,
        avatar_url: avatar_url,
      })
      .select()
      .single();

    if (error) {
      console.log("[error] crateProfile: ", error.message);
      return null;
    }

    return data;
  },
);

export const getProfileByUserId = cache(async (user_id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.log("[error] getProfileByUserId: ", error.message);
    return null;
  }

  return data;
});
