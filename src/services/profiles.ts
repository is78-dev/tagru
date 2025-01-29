import { createProfile, getProfileByUserId } from "@/repositories/profiles";
import { getUser } from "@/repositories/users";

export const registerProfile = async () => {
  const userData = await getUser();
  if (!userData) throw new Error();

  const profileData = await getProfileByUserId(userData.id);
  if (profileData) return profileData;

  const createdProfileData = await createProfile(
    userData.id,
    userData.user_metadata.name,
    userData.user_metadata.avatar_url,
  );
  if (!createdProfileData) throw new Error();

  return createdProfileData;
};

export const currentProfile = async () => {
  const userData = await getUser();
  if (!userData) throw new Error();

  const profileData = await getProfileByUserId(userData.id);
  if (!profileData) throw new Error();

  return profileData;
};
