import {
  getTagRepository,
  getTagListRepository,
  insertTag,
  selectTagByTagName,
} from "@/repositories/tagsRepository";
import { getUser } from "./usersService";
import { Tag } from "@/types/format";

// 取得
export const getTagService = async (tagId: string): Promise<Tag> => {
  const data = await getTagRepository(tagId);

  if (!data) {
    throw new Error("タグデータの取得に失敗しました");
  }

  return {
    tagId: data.id,
    tagName: data.tag_name,
    isFavorite: data.is_favorite,
  };
};

// 一覧取得
export const getTagListService = async ({
  range,
  contentId,
}: {
  range?: {
    offset: number;
    limit: number;
  };
  contentId?: string;
}): Promise<Tag[]> => {
  const data = await getTagListRepository({ range, contentId });

  if (!data) {
    throw new Error("タグデータの取得に失敗しました");
  }

  return data.map((t) => {
    return {
      tagId: t.id,
      tagName: t.tag_name,
      isFavorite: t.is_favorite,
    };
  });
};

// ---

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
