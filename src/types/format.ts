export type Tag = {
  tagId: string;
  tagName: string;
  isFavorite: boolean;
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
