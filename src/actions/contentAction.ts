"use server";

import {
  createYoutubeContent,
  deleteContent,
  getContentListService,
  getContentService,
  updateContent,
  updateContentNote,
} from "@/services/contentsService";
import {
  createContentFormSchema,
  UpdateContentFormType,
} from "@/types/zod-schema";
import { z } from "zod";

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

export const updateContentNoteAction = async (
  contentId: string,
  noteText: string,
) => {
  const updatedContentData = await updateContentNote(contentId, noteText);
  return updatedContentData;
};

// コンテンツを更新
export const updateContentAction = async (
  contentId: string,
  data: UpdateContentFormType,
) => {
  const result = createContentFormSchema.safeParse(data);

  if (!result.success) {
    throw new Error("入力の形式が正しくありません");
  }

  const updatedContentData = await updateContent(contentId, data);
  return updatedContentData;
};

// コンテンツを削除
export const deleteContentAction = async (contentId: string) => {
  await deleteContent(contentId);
};

// --------

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
