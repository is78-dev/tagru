import {
  createProfileRepository,
  getProfileRepository,
} from "@/repositories/profilesRepository";
import { getUserService } from "@/services/usersService";
import { Profile } from "@/types/format";

// 作成
export const createProfileService = async (): Promise<Profile> => {
  const user = await getUserService();

  const profile = await getProfileRepository(user.id);

  if (profile) {
    return {
      profileId: profile.id,
      userId: profile.user_id,
      userName: profile.user_name,
      avatarUrl: profile.avatar_url,
    };
  }

  const createdProfile = await createProfileRepository(
    user.id,
    user.user_metadata.name,
    user.user_metadata.avatar_url,
  );

  if (!createdProfile) {
    throw new Error("プロフィールの作成に失敗しました");
  }

  return {
    profileId: createdProfile.id,
    userId: createdProfile.user_id,
    userName: createdProfile.user_name,
    avatarUrl: createdProfile.avatar_url,
  };
};

// 取得
export const getProfileService = async (): Promise<Profile> => {
  const user = await getUserService();

  const profile = await getProfileRepository(user.id);

  if (!profile) {
    throw new Error("プロフィールの取得に失敗しました");
  }

  return {
    profileId: profile.id,
    userId: profile.user_id,
    userName: profile.user_name,
    avatarUrl: profile.avatar_url,
  };
};
