import {
  selectContentByContentId,
  selectAllContents,
  selectContentsByTagId,
  insertContentWithTags,
} from "@/repositories/contentsRepository";
import { ContentWithTags, Tag } from "@/types/format";
import { getUser } from "./usersService";
import { extractYoutubeVideoId } from "@/utils/common/extractYoutubeVideoId";

export const getAllContents = async () => {
  const contentsData = await selectAllContents();

  if (!contentsData) {
    throw new Error("コンテンツ一覧データの取得に失敗しました");
  }

  return contentsData;
};

export const getContentByContentId = async (contentId: string) => {
  const contentData = await selectContentByContentId(contentId);

  if (!contentData) {
    throw new Error("コンテンツデータの取得に失敗しました");
  }

  return contentData;
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
