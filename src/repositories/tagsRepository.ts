import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const selectTagByTagId = cache(async (tagId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("id", tagId)
    .single();

  if (error) {
    console.log("[error] selectTagByTagId: ", error.message);
    return null;
  }

  return data;
});

export const selectAllTags = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("tags").select("*");

  if (error) {
    console.log("[error] selectAllTags: ", error.message);
    return null;
  }

  return data;
});

export const selectTagByTagName = cache(async (tagName: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("tag_name", tagName)
    .single();

  if (error) {
    console.log("[error] selectTagByTagName: ", error.message);
    return null;
  }

  return data;
});

export const selectTagsByContentId = cache(async (contentId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_tags")
    .select("tags(*)")
    .eq("content_id", contentId);

  if (error) {
    console.log("[error] selectTagsByContentId: ", error.message);
    return null;
  }

  return data;
});

export const insertTag = cache(
  async (userId: string, tagName: string, isFavorite: boolean) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tags")
      .insert({ user_id: userId, tag_name: tagName, is_favorite: isFavorite })
      .select()
      .single();

    if (error) {
      console.error("[error] insertTag: ", error.message);
      return null;
    }

    return data;
  },
);
