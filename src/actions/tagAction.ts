"use server";

import { createTag, getTagListService } from "@/services/tagsService";
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

// ------------------

// 一覧取得
export const getTagListAction = async ({
  range,
  contentId,
}: {
  range?: { offset: number; limit: number };
  contentId?: string;
}) => {
  const data = await getTagListService({ range, contentId });
  return data;
};
