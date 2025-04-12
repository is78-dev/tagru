import { getUserRepository } from "@/repositories/usersRepository";

export const getUserService = async () => {
  const user = await getUserRepository();

  if (!user) {
    throw new Error("ユーザーデータの取得に失敗しました");
  }

  return user;
};

export const getAuthStateService = async () => {
  const user = await getUserRepository();

  return !!user;
};
