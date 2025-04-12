import {
  getLoginUrlRepository,
  loginRepository,
  logoutRepository,
} from "@/repositories/authRepository";
import { redirect } from "next/navigation";
import { createProfileService } from "./profilesService";

// ログイン画面にリダイレクト
export const redirectLoginPageService = async () => {
  const loginUrl = await getLoginUrlRepository();

  if (!loginUrl) {
    throw new Error("ログインURLの取得に失敗しました");
  }

  redirect(loginUrl);
};

// ログイン処理
export const loginService = async (code: string) => {
  const loginUser = await loginRepository(code);

  if (!loginUser) {
    throw new Error("ログインに失敗しました");
  }

  await createProfileService();

  redirect("/home");
};

// ログアウト処理
export const logoutService = async () => {
  const logoutSuccess = await logoutRepository();

  if (!logoutSuccess) {
    throw new Error("ログアウトに失敗しました");
  }

  redirect("/");
};
