import {
  insertProfile,
  selectProfileByUserId,
} from "@/repositories/profilesRepository";
import { getUser } from "@/services/usersService";

export const registerProfile = async () => {
  const userData = await getUser();

  const profileData = await selectProfileByUserId(userData.id);

  if (profileData) {
    return profileData;
  }

  const createdProfileData = await insertProfile(
    userData.id,
    userData.user_metadata.name,
    userData.user_metadata.avatar_url,
  );

  if (!createdProfileData) {
    throw new Error("プロフィールの作成に失敗しました");
  }

  return createdProfileData;
};

export const getProfile = async () => {
  const userData = await getUser();

  const profileData = await selectProfileByUserId(userData.id);

  if (!profileData) {
    throw new Error("プロフィールの取得に失敗しました");
  }

  return profileData;
};
