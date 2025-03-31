import { z } from "zod";
import { Tag } from "./format";

// タグ作成フォームのスキーマ
export const createTagFormSchema = z.object({
  tagName: z
    .string()
    .min(1, { message: "タグ名は必須です" })
    .max(32, { message: "タグ名は32文字以内で入力してください" }),
  isFavorite: z.boolean().default(false),
});

// コンテンツ作成フォームのスキーマ
export const createContentFormSchema = z.object({
  srcUrl: z.string().min(1, { message: "URLは必須です" }),
  title: z.string().min(1, { message: "タイトルは必須です" }),
  tags: z.array(z.custom<Tag>()),
  note: z.string(),
});

// コンテンツ更新フォームのスキーマ
export const updateContentFormSchema = z.object({
  srcUrl: z.string().min(1, { message: "URLは必須です" }),
  title: z.string().min(1, { message: "タイトルは必須です" }),
  tags: z.array(z.custom<Tag>()),
  note: z.string(),
});

// スキーマから型を生成
export type CreateTagFormType = z.infer<typeof createTagFormSchema>;
export type CreateContentFormType = z.infer<typeof createContentFormSchema>;
export type UpdateContentFormType = z.infer<typeof updateContentFormSchema>;
