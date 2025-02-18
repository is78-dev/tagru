import { z } from "zod";
import { Tag } from "./format";

export const createTagFormSchema = z.object({
  tagName: z
    .string()
    .min(1, { message: "タグ名は必須です" })
    .max(32, { message: "タグ名は32文字以内で入力してください" }),
  isFavorite: z.boolean().default(false),
});

export const createContentFormSchema = z.object({
  srcUrl: z.string().min(1, { message: "URLは必須です" }),
  title: z.string().min(1, { message: "タイトルは必須です" }),
  tags: z.array(z.custom<Tag>()),
});
