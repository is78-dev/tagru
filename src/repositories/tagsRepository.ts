import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

// 取得
export const getTagRepository = cache(async (tagId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("id", tagId)
    .single();

  if (error) {
    console.log("[error] ", error.message);
    return null;
  }

  return data;
});

// 一覧取得
export const getTagListRepository = cache(
  async ({
    range,
    contentId,
  }: {
    range?: {
      offset: number;
      limit: number;
    };
    contentId?: string;
  }) => {
    const supabase = await createClient();
    let response;

    if (!contentId) {
      // コンテンツ指定がない場合は全件取得
      if (range) {
        response = await supabase
          .from("tags")
          .select("*")
          .order("created_at", { ascending: false })
          .range(range.offset, range.offset + range.limit - 1);
      } else {
        response = await supabase
          .from("tags")
          .select("*")
          .order("created_at", { ascending: false });
      }
    } else {
      // コンテンツ指定がある場合はコンテンツが持つタグを取得
      const { data: tagIdsData, error: tagIdsError } = await supabase
        .from("content_tags")
        .select("tag_id")
        .eq("content_id", contentId);

      if (tagIdsError) {
        console.log("[error] ", tagIdsError.message);
        return null;
      }
      const tagIds = tagIdsData.map(({ tag_id }) => tag_id);

      if (range) {
        response = await supabase
          .from("tags")
          .select("*")
          .in("id", tagIds)
          .order("created_at", { ascending: false })
          .range(range.offset, range.offset + range.limit - 1);
      } else {
        response = await supabase
          .from("tags")
          .select("*")
          .in("id", tagIds)
          .order("created_at", { ascending: false });
      }
    }
    if (response.error) {
      console.log("[error] ", response.error.message);
      return null;
    }

    return response.data;
  },
);

// ---

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
