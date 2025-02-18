import { selectUser } from "@/repositories/usersRepository";

export const getUser = async () => {
  const userData = await selectUser();

  if (!userData) {
    throw new Error("ユーザーデータの取得に失敗しました");
  }

  return userData;
};

export const isAuthenticated = async () => {
  const userData = await selectUser();

  return !!userData;
};
