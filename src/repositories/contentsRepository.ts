import "server-only";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import { UpdateContent } from "@/types/format";

// 作成
export const createContentRepository = cache(
  async (props: {
    userId: string;
    type: string;
    title: string;
    note: string;
    srcUrl: string;
    thumbnailUrl: string;
    contentUrl: string;
    tagIds: string[];
  }) => {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("insert_content_with_tags", {
      p_user_id: props.userId,
      p_type: props.type,
      p_title: props.title,
      p_note: props.note,
      p_src_url: props.srcUrl,
      p_thumbnail_url: props.thumbnailUrl,
      p_content_url: props.contentUrl,
      p_tags: props.tagIds,
    });

    if (error) {
      console.log("[error] insertContentWithTags: ", error.message);
      return null;
    }

    return data;
  },
);

// 取得
export const getContentRepository = cache(async (contentId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contents")
    .select("*")
    .eq("id", contentId)
    .single();

  if (error) {
    console.log("[error] ", error.message);
    return null;
  }

  return data;
});

// 一覧取得
export const getContentListRepository = cache(
  async ({
    range,
    tagId,
  }: {
    range?: { offset: number; limit: number };
    tagId?: string;
  }) => {
    const supabase = await createClient();

    if (range) {
      if (tagId) {
        const { data: contentIdsData, error: contentIdsError } = await supabase
          .from("content_tags")
          .select("content_id")
          .eq("tag_id", tagId);

        if (contentIdsError) {
          return null;
        }

        const contentIds = contentIdsData.map(({ content_id }) => content_id);
        const { data, error } = await supabase
          .from("contents")
          .select("*")
          .in("id", contentIds)
          .order("created_at", { ascending: false })
          .range(range.offset, range.offset + range.limit - 1);

        if (error) {
          return null;
        }

        return data;
      } else {
        const { data, error } = await supabase
          .from("contents")
          .select("*")
          .order("created_at", { ascending: false })
          .range(range.offset, range.offset + range.limit - 1);

        if (error) {
          return null;
        }

        return data;
      }
    } else {
      if (tagId) {
        const { data: contentIdsData, error: contentIdsError } = await supabase
          .from("content_tags")
          .select("content_id")
          .eq("tag_id", tagId);

        if (contentIdsError) {
          return null;
        }

        const contentIds = contentIdsData.map(({ content_id }) => content_id);
        const { data, error } = await supabase
          .from("contents")
          .select("*")
          .in("id", contentIds)
          .order("created_at", { ascending: false });

        if (error) {
          return null;
        }

        return data;
      } else {
        const { data, error } = await supabase
          .from("contents")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          return null;
        }

        return data;
      }
    }
  },
);

// 更新
export const updateContentRepository = cache(
  async (contentId: string, updateContent: UpdateContent) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("contents")
      .update({
        title: updateContent.title,
        note: updateContent.note,
        src_url: updateContent.srcUrl,
        thumbnail_url: updateContent.thumbnailUrl,
        content_url: updateContent.contentUrl,
      })
      .eq("id", contentId)
      .select()
      .single();

    if (error) {
      return null;
    }

    return data;
  },
);

// 削除
export const deleteContentRepository = cache(async (contentId: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contents")
    .delete()
    .eq("id", contentId);

  if (error) {
    return null;
  }

  return contentId;
});
