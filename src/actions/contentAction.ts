"use server";

import { createYoutubeContent } from "@/services/contentsService";
import { createContentFormSchema } from "@/types/zod-schema";
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
