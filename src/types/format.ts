export type Profile = {
  profileId: string;
  userId: string;
  userName: string;
  avatarUrl: string | null;
};

export type Tag = {
  tagId: string;
  tagName: string;
  isFavorite: boolean;
  note: string;
};

export type CreateTag = {
  tagName: string;
  isFavorite: boolean;
  note: string;
};

export type UpdateTag = {
  tagName?: string;
  isFavorite?: boolean;
  note?: string;
};

export type ContentWithTags = {
  contentId: string;
  title: string;
  thumbnailUrl: string;
  tags: Tag[];
};

export type Content = {
  contentId: string;
  title: string;
  note: string;
  srcUrl: string;
  thumbnailUrl: string;
  contentUrl: string;
};

export type UpdateContent = {
  title?: string;
  note?: string;
  srcUrl?: string;
  thumbnailUrl?: string;
  contentUrl?: string;
};
