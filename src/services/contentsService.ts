import {
  getContentRepository,
  getContentListRepository,
  deleteContentRepository,
  updateContentRepository,
  createContentRepository,
} from "@/repositories/contentsRepository";
import { Content, Tag } from "@/types/format";
import { getUserService } from "./usersService";
import { extractYoutubeVideoId } from "@/utils/common/extractYoutubeVideoId";
import { UpdateContentFormType } from "@/types/zod-schema";
import { updateContentTagService } from "./tagsService";

// 作成
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
  const userId = (await getUserService()).id;
  const type = "youtube";
  const note = "";
  const tagIds = tags.map((tag) => tag.tagId);

  const createdContentData = await createContentRepository({
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

// 更新
export const updateContentService = async (
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

  const updatedContentId = await updateContentRepository(contentId, {
    title: data.title,
    note: data.note,
    srcUrl: standardSrcUrl,
    thumbnailUrl,
    contentUrl,
  });

  if (!updatedContentId) {
    throw new Error("コンテンツの更新に失敗しました");
  }

  await updateContentTagService(
    contentId,
    data.tags.map((tag) => tag.tagId),
  );

  return updatedContentId;
};

// メモの更新
export const updateContentNoteService = async (
  contentId: string,
  note: string,
) => {
  const updatedContentId = await updateContentRepository(contentId, {
    note: note,
  });

  if (!updatedContentId) {
    throw new Error("メモの更新に失敗しました");
  }

  return updatedContentId;
};

// 削除
export const deleteContentService = async (contentId: string) => {
  const deletedContentId = await deleteContentRepository(contentId);

  if (!deletedContentId) {
    throw new Error("コンテンツの削除に失敗しました");
  }

  return deletedContentId;
};
