import { getUser } from "@/repositories/usersRepository";

export const currentUser = async () => {
  const userData = await getUser();

  if (!userData) {
    throw new Error("ユーザーの取得に失敗しました");
  }

  return userData;
};

export const isAuthenticated = async () => {
  const userData = await getUser();

  return !!userData;
};
