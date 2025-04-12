import "server-only";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

// ログインURL取得
export const getLoginUrlRepository = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.API_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error("[error] getLoginUrlRepository: ", error.message);
    return null;
  }

  return data.url;
});

// ログイン処理
export const loginRepository = cache(async (code: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[error] loginRepository: ", error.message);
    return null;
  }

  return data.user;
});

// ログアウト処理
export const logoutRepository = cache(async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("[error] logoutRepository: ", error.message);
    return false;
  }

  return true;
});
