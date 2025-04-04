import { registerProfile } from "@/services/profilesService";
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

  try {
    await registerProfile();
  } catch {
    await supabase.auth.signOut();
    redirect("/error");
  }

  redirect("/home");
}
