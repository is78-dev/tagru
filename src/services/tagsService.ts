import {
  createTagRepository,
  getTagRepository,
  getTagByTagName,
  getTagListRepository,
  getParentTagListRepository,
  getChildTagListRepository,
  getContentTagListRepository,
  updateTagRepository,
  deleteTagRepository,
  updateParentTagRepository,
  updateChildTagRepository,
} from "@/repositories/tagsRepository";
import { getUserService } from "./usersService";
import { Tag, UpdateTag } from "@/types/format";
import { CreateTagFormType } from "@/types/zod-schema";

// 作成
export const createTagService = async (
  createTag: CreateTagFormType,
): Promise<Tag> => {
  const userData = await getUserService();

  const tagData = await getTagByTagName(createTag.tagName);

  if (tagData) {
    throw new Error("同名のタグが既に存在します");
  }

  const createdTagData = await createTagRepository(userData.id, createTag);

  if (!createdTagData) {
    throw new Error("タグデータの作成に失敗しました");
  }

  return {
    tagId: createdTagData.id,
    tagName: createdTagData.tag_name,
    isFavorite: createdTagData.is_favorite,
    note: createdTagData.note,
  };
};

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
    note: data.note,
  };
};

// 一覧取得
export const getTagListService = async ({
  range,
}: {
  range?: {
    offset: number;
    limit: number;
  };
}): Promise<Tag[]> => {
  const data = await getTagListRepository({ range });

  if (!data) {
    throw new Error("タグデータの取得に失敗しました");
  }

  return data.map((t) => {
    return {
      tagId: t.id,
      tagName: t.tag_name,
      isFavorite: t.is_favorite,
      note: t.note,
    };
  });
};

// コンテンツが持つタグを取得
export const getContentTagListService = async (
  contentId: string,
): Promise<Tag[]> => {
  const data = await getContentTagListRepository(contentId);

  if (!data) {
    throw new Error("タグデータの取得に失敗しました");
  }

  return data.map((t) => {
    return {
      tagId: t.id,
      tagName: t.tag_name,
      isFavorite: t.is_favorite,
      note: t.note,
    };
  });
};

// タグが持つ親タグを取得
export const getParentTagListService = async (
  tagId: string,
): Promise<Tag[]> => {
  const data = await getParentTagListRepository(tagId);

  if (!data) {
    throw new Error("タグデータの取得に失敗しました");
  }

  return data.map((t) => {
    return {
      tagId: t.id,
      tagName: t.tag_name,
      isFavorite: t.is_favorite,
      note: t.note,
    };
  });
};

// タグが持つ子タグを取得
export const getChildTagListService = async (tagId: string): Promise<Tag[]> => {
  const data = await getChildTagListRepository(tagId);

  if (!data) {
    throw new Error("タグデータの取得に失敗しました");
  }

  return data.map((t) => {
    return {
      tagId: t.id,
      tagName: t.tag_name,
      isFavorite: t.is_favorite,
      note: t.note,
    };
  });
};

// 更新
export const updateTagService = async (
  tagId: string,
  updateTag: UpdateTag,
): Promise<Tag> => {
  const data = await updateTagRepository(tagId, updateTag);

  if (!data) {
    throw new Error("タグデータの更新に失敗しました");
  }

  return {
    tagId: data.id,
    tagName: data.tag_name,
    isFavorite: data.is_favorite,
    note: data.note,
  };
};

// タグが持つ親タグを更新
export const updateParentTagService = async (
  tagId: string,
  parentTagIds: string[],
) => {
  const user = await getUserService();

  const data = await updateParentTagRepository(user.id, tagId, parentTagIds);

  if (!data) {
    throw new Error("親タグの更新に失敗しました");
  }

  return;
};

// タグが持つ子タグを更新
export const updateChildTagService = async (
  tagId: string,
  childTagIds: string[],
) => {
  const user = await getUserService();

  const data = await updateChildTagRepository(user.id, tagId, childTagIds);

  if (!data) {
    throw new Error("子タグの更新に失敗しました");
  }

  return;
};

// 削除
export const deleteTagService = async (tagId: string): Promise<string> => {
  const data = await deleteTagRepository(tagId);

  if (!data) {
    throw new Error("タグデータの削除に失敗しました");
  }

  return data;
};
