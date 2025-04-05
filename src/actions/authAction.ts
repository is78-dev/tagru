"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const login = async () => {
  const supabase = await createClient();

  const {
    data: { url },
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.API_BASE_URL}/auth/callback`,
    },
  });

  if (!url) {
    redirect("/error");
  }

  redirect(url);
};

export const logout = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  redirect("/");
};
