"use server";

import {
  createYoutubeContent,
  deleteContentService,
  getContentListService,
  getContentService,
  updateContentNoteService,
  updateContentService,
} from "@/services/contentsService";
import {
  createContentFormSchema,
  UpdateContentFormType,
} from "@/types/zod-schema";
import { z } from "zod";

// 作成
export const createYoutubeContentAction = async (
  data: z.infer<typeof createContentFormSchema>,
) => {
  const result = createContentFormSchema.safeParse(data);

  if (!result.success) {
    throw new Error("入力の形式が正しくありません");
  }

  // コンテンツ追加処理
  await createYoutubeContent(data.srcUrl, data.title, data.tags);
};

// 取得
export const getContentAction = async (contentId: string) => {
  const data = await getContentService(contentId);
  return data;
};

// 一覧取得
export const getContentsAction = async ({
  range,
  tagId,
}: {
  range?: { offset: number; limit: number };
  tagId?: string;
}) => {
  const data = await getContentListService({ range, tagId });
  return data;
};

// 更新
export const updateContentAction = async (
  contentId: string,
  data: UpdateContentFormType,
) => {
  const result = createContentFormSchema.safeParse(data);

  if (!result.success) {
    throw new Error("入力の形式が正しくありません");
  }

  const updatedContentData = await updateContentService(contentId, data);
  return updatedContentData;
};

// メモの更新
export const updateContentNoteAction = async (
  contentId: string,
  note: string,
) => {
  const updatedContentData = await updateContentNoteService(contentId, note);
  return updatedContentData;
};

// 削除
export const deleteContentAction = async (contentId: string) => {
  await deleteContentService(contentId);
};
