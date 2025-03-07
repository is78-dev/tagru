"use server";

import {
  createTag,
  getAllTags,
  getTagsByContentId,
} from "@/services/tagsService";
import { createTagFormSchema } from "@/types/zod-schema";
import { z } from "zod";

export const createTagAction = async (
  data: z.infer<typeof createTagFormSchema>,
) => {
  const result = createTagFormSchema.safeParse(data);

  if (!result.success) {
    throw new Error("入力の形式が正しくありません");
  }

  const createdTag = await createTag(data.tagName, data.isFavorite);

  return createdTag;
};

export const getAllTagAction = async () => {
  const data = await getAllTags();
  return data;
};

// タグリストを取得(key: contentId)
export const getTagsByContentIdAction = async (contentId: string) => {
  const tags = await getTagsByContentId(contentId);

  return tags;
};
