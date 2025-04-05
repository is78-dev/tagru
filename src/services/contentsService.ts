import {
  insertContentWithTags,
  updateContentNoteByContentId,
  deleteContentByContentId,
  updateContentByContentId,
  getContentRepository,
  getContentListRepository,
} from "@/repositories/contentsRepository";
import { Content, Tag } from "@/types/format";
import { getUser } from "./usersService";
import { extractYoutubeVideoId } from "@/utils/common/extractYoutubeVideoId";
import { UpdateContentFormType } from "@/types/zod-schema";

// 取得
export const getContentService = async (
  contentId: string,
): Promise<Content> => {
  const data = await getContentRepository(contentId);

  if (!data) {
    throw new Error("コンテンツデータの取得に失敗しました");
  }

  return {
    contentId: data.id,
    title: data.title,
    note: data.note,
    srcUrl: data.src_url,
    thumbnailUrl: data.thumbnail_url,
    contentUrl: data.content_url,
  };
};

// 一覧取得
export const getContentListService = async ({
  range,
  tagId,
}: {
  range?: { offset: number; limit: number };
  tagId?: string;
}): Promise<Content[]> => {
  const data = await getContentListRepository({ range, tagId });

  if (!data) {
    throw new Error("コンテンツデータの取得に失敗しました");
  }

  return data.map((c) => {
    return {
      contentId: c.id,
      title: c.title,
      note: c.note,
      srcUrl: c.src_url,
      thumbnailUrl: c.thumbnail_url,
      contentUrl: c.content_url,
    };
  });
};

// ---

export const createYoutubeContent = async (
  srcUrl: string,
  title: string,
  tags: Tag[],
) => {
  const videoId = extractYoutubeVideoId(srcUrl);
  if (!videoId) {
    throw new Error("無効なYouTube URLです");
  }
  const standardSrcUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const contentUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
  const userId = (await getUser()).id;
  const type = "youtube";
  const note = "";
  const tagIds = tags.map((tag) => tag.tagId);

  const createdContentData = await insertContentWithTags({
    userId,
    type,
    title,
    note,
    srcUrl: standardSrcUrl,
    thumbnailUrl,
    contentUrl,
    tagIds,
  });

  if (!createdContentData) {
    throw new Error("コンテンツの追加に失敗しました");
  }

  return createdContentData;
};

// コンテンツのメモを更新する
export const updateContentNote = async (
  contentId: string,
  noteText: string,
): Promise<Content> => {
  const updatedContentData = await updateContentNoteByContentId(
    contentId,
    noteText,
  );

  if (!updatedContentData) {
    throw new Error("コンテンツのメモの保存に失敗しました");
  }

  return {
    contentId: updatedContentData.id,
    title: updatedContentData.title,
    note: updatedContentData.note,
    srcUrl: updatedContentData.src_url,
    thumbnailUrl: updatedContentData.thumbnail_url,
    contentUrl: updatedContentData.content_url,
  };
};

// コンテンツを更新
export const updateContent = async (
  contentId: string,
  data: UpdateContentFormType,
) => {
  const videoId = extractYoutubeVideoId(data.srcUrl);
  if (!videoId) {
    throw new Error("無効なYouTube URLです");
  }
  const standardSrcUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const contentUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
  const userId = (await getUser()).id;
  const type = "youtube";
  const tagIds = data.tags.map((tag) => tag.tagId);

  const updatedContentId = await updateContentByContentId({
    contentId,
    userId,
    type,
    title: data.title,
    note: data.note,
    srcUrl: standardSrcUrl,
    thumbnailUrl,
    contentUrl,
    tags: tagIds,
  });

  if (!updatedContentId) {
    throw new Error("コンテンツの更新に失敗しました");
  }

  return updatedContentId;
};

// コンテンツを削除
export const deleteContent = async (contentId: string) => {
  const deletedContentId = await deleteContentByContentId(contentId);

  if (!deletedContentId) {
    throw new Error("コンテンツの削除に失敗しました");
  }

  return deletedContentId;
};
