"use server";

import {
  createTagService,
  getTagService,
  getTagListService,
  getContentTagListService,
  getParentTagListService,
  getChildTagListService,
  updateTagService,
  deleteTagService,
  updateParentTagService,
  updateChildTagService,
} from "@/services/tagsService";
import { UpdateTag } from "@/types/format";
import {
  createTagFormSchema,
  CreateTagFormType,
  updateTagFormSchema,
  UpdateTagFormType,
} from "@/types/zod-schema";

// 作成
export const createTagAction = async (createTag: CreateTagFormType) => {
  const result = createTagFormSchema.safeParse(createTag);

  if (!result.success) {
    throw new Error("入力の形式が正しくありません");
  }

  const createdTag = await createTagService(createTag);

  return createdTag;
};

// 取得
export const getTagAction = async (tagId: string) => {
  const data = await getTagService(tagId);
  return data;
};

// 一覧取得
export const getTagListAction = async ({
  range,
}: {
  range?: { offset: number; limit: number };
}) => {
  const data = await getTagListService({ range });
  return data;
};

// コンテンツが持つタグを取得
export const getContentTagListAction = async (contentId: string) => {
  const data = await getContentTagListService(contentId);
  return data;
};

// タグが持つ親タグを取得
export const getParentTagListAction = async (tagId: string) => {
  const data = await getParentTagListService(tagId);
  return data;
};

// タグが持つ子タグを取得
export const getChildTagListAction = async (tagId: string) => {
  const data = await getChildTagListService(tagId);
  return data;
};

// タグ、親タグ、子タグを取得
export const getRelativeTagAction = async (tagId: string) => {
  const tagPromise = await getTagService(tagId);
  const parentTagsPromise = await getParentTagListService(tagId);
  const childTagsPromise = await getChildTagListService(tagId);
  const [tag, parentTags, childTags] = await Promise.all([
    tagPromise,
    parentTagsPromise,
    childTagsPromise,
  ]);
  return { tag, parentTags, childTags };
};

// 更新
export const updateTagAction = async (tagId: string, updateTag: UpdateTag) => {
  const data = await updateTagService(tagId, updateTag);
  return data;
};

// タグ情報、親タグ、子タグを更新
export const updateRelativeTagAction = async (
  tagId: string,
  data: UpdateTagFormType,
) => {
  const result = updateTagFormSchema.safeParse(data);

  if (!result.success) {
    throw new Error("入力の形式が正しくありません");
  }

  const updatedTag = await updateTagService(tagId, {
    tagName: data.tagName,
    isFavorite: data.isFavorite,
    note: data.note,
  });

  const updateParentPromise = updateParentTagService(tagId, data.parentTagIds);
  const updateChildPromsie = updateChildTagService(tagId, data.childTagIds);
  await Promise.all([updateParentPromise, updateChildPromsie]);

  return updatedTag;
};

// 削除
export const deleteTagAction = async (tagId: string) => {
  const data = await deleteTagService(tagId);
  return data;
};
