import { getUser } from "@/repositories/users";

export const currentUser = async () => {
  const userData = await getUser();
  if (!userData) throw new Error();

  return userData;
};
