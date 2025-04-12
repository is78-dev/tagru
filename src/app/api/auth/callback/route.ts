import { loginService } from "@/services/authService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    throw new Error("認証コードが存在しません");
  }

  await loginService(code);
}
