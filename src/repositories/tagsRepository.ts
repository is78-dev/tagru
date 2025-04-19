import "server-only";
import { UpdateTag } from "@/types/format";
import { CreateTagFormType } from "@/types/zod-schema";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

// 作成
export const createTagRepository = cache(
  async (userId: string, createTag: CreateTagFormType) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tags")
      .insert({
        user_id: userId,
        tag_name: createTag.tagName,
        is_favorite: createTag.isFavorite,
        note: createTag.note,
      })
      .select()
      .single();

    if (error) {
      return null;
    }

    return data;
  },
);

// 取得
export const getTagRepository = cache(async (tagId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("id", tagId)
    .single();

  if (error) {
    return null;
  }

  return data;
});

// タグ名を元にタグを取得
export const getTagByTagName = cache(async (tagName: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("tag_name", tagName)
    .single();

  if (error) {
    return null;
  }

  return data;
});

// 一覧取得
export const getTagListRepository = cache(
  async ({
    range,
  }: {
    range?: {
      offset: number;
      limit: number;
    };
  }) => {
    const supabase = await createClient();

    if (range) {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("created_at", { ascending: false })
        .range(range.offset, range.offset + range.limit - 1);

      if (error) {
        return null;
      }

      return data;
    } else {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return null;
      }

      return data;
    }
  },
);

// コンテンツが持つタグを取得
export const getContentTagListRepository = cache(async (contentId: string) => {
  const supabase = await createClient();

  const { data: contentTagIdsData, error: contentTagIdsError } = await supabase
    .from("content_tags")
    .select("tag_id")
    .eq("content_id", contentId);

  if (contentTagIdsError) {
    return null;
  }

  const contentTagIds = contentTagIdsData.map(({ tag_id }) => tag_id);
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .in("id", contentTagIds)
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return data;
});

// タグが持つ親タグを取得
export const getParentTagListRepository = cache(async (tagId: string) => {
  const supabase = await createClient();

  const { data: parentTagIdsData, error: parentTagIdsError } = await supabase
    .from("tag_tags")
    .select("parent_tag_id")
    .eq("child_tag_id", tagId);

  if (parentTagIdsError) {
    return null;
  }

  const parentTagIds = parentTagIdsData.map(
    ({ parent_tag_id }) => parent_tag_id,
  );
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .in("id", parentTagIds)
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return data;
});

// タグが持つ子タグを取得
export const getChildTagListRepository = cache(async (tagId: string) => {
  const supabase = await createClient();

  const { data: childTagIdsData, error: childTagIdsError } = await supabase
    .from("tag_tags")
    .select("child_tag_id")
    .eq("parent_tag_id", tagId);

  if (childTagIdsError) {
    return null;
  }

  const childTagIds = childTagIdsData.map(({ child_tag_id }) => child_tag_id);
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .in("id", childTagIds)
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return data;
});

// 更新
export const updateTagRepository = cache(
  async (tagId: string, updateTag: UpdateTag) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tags")
      .update({
        tag_name: updateTag.tagName,
        is_favorite: updateTag.isFavorite,
        note: updateTag.note,
      })
      .eq("id", tagId)
      .select()
      .single();

    if (error) {
      return null;
    }

    return data;
  },
);

// タグが持つ親タグを更新
export const updateParentTagRepository = cache(
  async (userId: string, tagId: string, parentTagIds: string[]) => {
    const supabase = await createClient();

    const { error: deleteError } = await supabase
      .from("tag_tags")
      .delete()
      .eq("child_tag_id", tagId);

    if (deleteError) {
      return null;
    }

    const newRelations = parentTagIds.map((parentTagId) => ({
      user_id: userId,
      parent_tag_id: parentTagId,
      child_tag_id: tagId,
    }));
    const { data, error } = await supabase
      .from("tag_tags")
      .insert(newRelations)
      .select();

    if (error) {
      return null;
    }

    return data;
  },
);

// タグが持つ子タグを更新
export const updateChildTagRepository = cache(
  async (userId: string, tagId: string, childTagIds: string[]) => {
    const supabase = await createClient();

    const { error: deleteError } = await supabase
      .from("tag_tags")
      .delete()
      .eq("parent_tag_id", tagId);

    if (deleteError) {
      return null;
    }

    const newRelations = childTagIds.map((childTagId) => ({
      user_id: userId,
      parent_tag_id: tagId,
      child_tag_id: childTagId,
    }));
    const { data, error } = await supabase
      .from("tag_tags")
      .insert(newRelations)
      .select();

    if (error) {
      return null;
    }

    return data;
  },
);

// コンテンツが持つタグを更新
export const updateContentTagRepository = cache(
  async (userId: string, contentId: string, tagIds: string[]) => {
    const supabase = await createClient();

    const { error: deleteError } = await supabase
      .from("content_tags")
      .delete()
      .eq("content_id", contentId);

    if (deleteError) {
      return null;
    }

    const newRelations = tagIds.map((tagId) => ({
      user_id: userId,
      content_id: contentId,
      tag_id: tagId,
    }));
    const { data, error } = await supabase
      .from("content_tags")
      .insert(newRelations)
      .select();

    if (error) {
      return null;
    }

    return data;
  },
);

// 削除
export const deleteTagRepository = cache(async (tagId: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from("tags").delete().eq("id", tagId);

  if (error) {
    return null;
  }

  return tagId;
});
