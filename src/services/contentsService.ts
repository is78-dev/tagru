import {
  selectContentByContentId,
  selectAllContents,
  selectContentsByTagId,
  insertContentWithTags,
  updateContentNoteByContentId,
  deleteContentByContentId,
  updateContentByContentId,
} from "@/repositories/contentsRepository";
import { Content, ContentWithTags, Tag } from "@/types/format";
import { getUser } from "./usersService";
import { extractYoutubeVideoId } from "@/utils/common/extractYoutubeVideoId";
import { UpdateContentFormType } from "@/types/zod-schema";

export const getAllContents = async () => {
  const contentsData = await selectAllContents();

  if (!contentsData) {
    throw new Error("コンテンツ一覧データの取得に失敗しました");
  }

  return contentsData;
};

export const getContentByContentId = async (
  contentId: string,
): Promise<Content> => {
  const contentData = await selectContentByContentId(contentId);

  if (!contentData) {
    throw new Error("コンテンツデータの取得に失敗しました");
  }

  return {
    contentId: contentData.id,
    type: contentData.type,
    title: contentData.title,
    note: contentData.note,
    srcUrl: contentData.src_url,
    thumbnailUrl: contentData.thumbnail_url,
    contentUrl: contentData.content_url,
  };
};

export const getContentsByTagId = async (tagId: string) => {
  const rawData = await selectContentsByTagId(tagId);

  if (!rawData) {
    throw new Error("コンテンツデータの取得に失敗しました");
  }

  // ContentWithTags型にフォーマットする
  const contentMap = new Map<string, ContentWithTags>();
  rawData.forEach(
    ({ content_id, title, thumbnail_url, tag_id, tag_name, is_favorite }) => {
      if (!contentMap.has(content_id)) {
        contentMap.set(content_id, {
          contentId: content_id,
          title,
          thumbnailUrl: thumbnail_url,
          tags: [],
        });
      }
      contentMap.get(content_id)!.tags.push({
        tagId: tag_id,
        tagName: tag_name,
        isFavorite: is_favorite,
      });
    },
  );
  return Array.from(contentMap.values());
};

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
    type: updatedContentData.type,
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
