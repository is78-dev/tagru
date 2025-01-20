import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    redirect("/error");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.exchangeCodeForSession(code);

  if (!user) {
    redirect("/error");
  }

  // const authUserId = user.id;

  // const { data: userData } = await supabase
  //   .from("users")
  //   .select("auth_id")
  //   .eq("auth_id", authData.user.id)
  //   .single();

  // // ユーザーが存在しない場合のみinsert
  // if (userData) {
  //   console.log("already exist userData");
  //   redirect("/error");
  // }

  // const googleUsername = authData.user.user_metadata.name;
  // const { error: userInsertError } = await supabase
  //   .from("users")
  //   .insert({ username: googleUsername, auth_user_id: authUserId });

  // if (userInsertError) {
  //   console.log("userInsertError");
  //   redirect("/error");
  // }

  redirect("/home");
}
