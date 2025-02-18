import "server-only";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const selectAllContents = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("contents").select("*");

  if (error) {
    console.log("[error] selectAllContents: ", error.message);
    return null;
  }

  return data;
});

export const selectContentByContentId = cache(async (contentId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contents")
    .select("*")
    .eq("id", contentId)
    .single();

  if (error) {
    console.log("[error] selectContentByContentId: ", error.message);
    return null;
  }

  return data;
});

export const selectContentsByTagId = cache(async (tagId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_contents_by_tag_id", {
    target_tag_id: tagId,
  });

  if (error) {
    console.log("[error] selectContentsByTagId: ", error.message);
    return null;
  }

  return data;
});

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
