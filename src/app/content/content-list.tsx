import { Content, ContentWithTags, Tag } from "@/types/format";
import ContentCard from "../tag/content-card";

type Props = {
  contentList: ContentWithTags[];
  currentTag: Tag;
  currentContent?: Content;
};

export default function ContentList({
  contentList,
  currentTag,
  currentContent,
}: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {contentList.map((content) => (
        <ContentCard
          key={content.contentId}
          contentWithTags={content}
          currentTagId={currentTag.tagId}
          active={content.contentId === currentContent?.contentId}
        />
      ))}
    </div>
  );
}
