import {
  createProfile,
  getProfileByUserId,
} from "@/repositories/profilesRepository";
import { currentUser } from "@/services/usersService";

export const registerProfile = async () => {
  const userData = await currentUser();

  const profileData = await getProfileByUserId(userData.id);

  if (profileData) {
    return profileData;
  }

  const createdProfileData = await createProfile(
    userData.id,
    userData.user_metadata.name,
    userData.user_metadata.avatar_url,
  );

  if (!createdProfileData) {
    throw new Error("プロフィールの作成に失敗しました");
  }

  return createdProfileData;
};

export const currentProfile = async () => {
  const userData = await currentUser();

  const profileData = await getProfileByUserId(userData.id);

  if (!profileData) {
    throw new Error("プロフィールの取得に失敗しました");
  }

  return profileData;
};
