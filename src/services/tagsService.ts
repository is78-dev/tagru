import {
  insertTag,
  selectAllTags,
  selectTagByTagId,
  selectTagByTagName,
  selectTagsByContentId,
} from "@/repositories/tagsRepository";
import { getUser } from "./usersService";
import { Tag } from "@/types/format";

export const getTagByTagId = async (tagId: string): Promise<Tag> => {
  const tagData = await selectTagByTagId(tagId);

  if (!tagData) {
    throw new Error("タグの取得に失敗しました");
  }

  return {
    tagId: tagData.id,
    tagName: tagData.tag_name,
    isFavorite: tagData.is_favorite,
  };
};

export const getAllTags = async (): Promise<Tag[]> => {
  const tagsData = await selectAllTags();

  if (!tagsData) {
    throw new Error("タグ一覧の取得に失敗しました");
  }

  return tagsData.map(({ id, tag_name, is_favorite }) => {
    return { tagId: id, tagName: tag_name, isFavorite: is_favorite };
  });
};

export const getTagsByContentId = async (contentId: string): Promise<Tag[]> => {
  const tagsData = await selectTagsByContentId(contentId);

  if (!tagsData) {
    throw new Error("タグの取得に失敗しました");
  }

  return tagsData.map(({ tags }) => {
    return {
      tagId: tags.id,
      tagName: tags.tag_name,
      isFavorite: tags.is_favorite,
    };
  });
};

export const createTag = async (
  tagName: string,
  isFavorite: boolean,
): Promise<Tag> => {
  const tagData = await selectTagByTagName(tagName);

  if (tagData) {
    throw new Error("そのタグは既に存在します");
  }

  const userData = await getUser();

  const createdTagData = await insertTag(userData.id, tagName, isFavorite);

  if (!createdTagData) {
    throw new Error("タグの作成に失敗しました");
  }

  return {
    tagId: createdTagData.id,
    tagName: createdTagData.tag_name,
    isFavorite: createdTagData.is_favorite,
  };
};
