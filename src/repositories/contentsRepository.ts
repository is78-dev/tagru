import "server-only";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

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
    let response;

    if (!tagId) {
      // タグ指定がない場合は全件取得
      if (range) {
        response = await supabase
          .from("contents")
          .select("*")
          .order("created_at", { ascending: false })
          .range(range.offset, range.offset + range.limit - 1);
      } else {
        response = await supabase
          .from("contents")
          .select("*")
          .order("created_at", { ascending: false });
      }
    } else {
      // タグ指定がある場合はタグを持つコンテンツを取得
      const { data: contentIdsData, error: contentIdsError } = await supabase
        .from("content_tags")
        .select("content_id")
        .eq("tag_id", tagId);

      if (contentIdsError) {
        console.log("[error] ", contentIdsError.message);
        return null;
      }
      const contentIds = contentIdsData.map(({ content_id }) => content_id);

      if (range) {
        response = await supabase
          .from("contents")
          .select("*")
          .in("id", contentIds)
          .order("created_at", { ascending: false })
          .range(range.offset, range.offset + range.limit - 1);
      } else {
        response = await supabase
          .from("contents")
          .select("*")
          .in("id", contentIds)
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

// ----

export const insertContentWithTags = cache(
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

export const updateContentNoteByContentId = cache(
  async (contentId: string, newNoteText: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("contents")
      .update({ note: newNoteText })
      .eq("id", contentId)
      .select()
      .single();

    if (error) {
      console.log("[error] updateContentNoteByContentId: ", error.message);
      return null;
    }

    return data;
  },
);

// コンテンツを更新
export const updateContentByContentId = cache(
  async (props: {
    contentId: string;
    userId: string;
    title: string;
    type: string;
    srcUrl: string;
    thumbnailUrl: string;
    contentUrl: string;
    note: string;
    tags: string[];
  }) => {
    const supabase = await createClient();

    const { error } = await supabase.rpc("update_content_and_tags", {
      p_content_id: props.contentId,
      p_user_id: props.userId,
      p_title: props.title,
      p_type: props.type,
      p_src_url: props.srcUrl,
      p_thumbnail_url: props.thumbnailUrl,
      p_content_url: props.contentUrl,
      p_note: props.note,
      p_tags: props.tags,
    });

    if (error) {
      console.log("[error] updateContentByContentId: ", error.message);
      return null;
    }

    return props.contentId;
  },
);

// コンテンツを削除
export const deleteContentByContentId = cache(async (contentId: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contents")
    .delete()
    .eq("id", contentId);

  if (error) {
    console.log("[error] deleteContentByContentId: ", error.message);
    return null;
  }

  return contentId;
});
