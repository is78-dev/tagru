import { ContentWithTags, Tag } from "@/types/format";
import Link from "next/link";
import TagCarousel from "./tag-carousel";
import { twMerge } from "tailwind-merge";
import { Card } from "@/components/ui/card";

type Props = {
  contentWithTags: ContentWithTags;
  currentTagId: string;
  active?: boolean;
};

export default function ContentCard({
  contentWithTags,
  currentTagId,
  active,
}: Props) {
  return (
    <Card
      className={twMerge(
        "group/content-card relative overflow-hidden rounded-md transition-all duration-200",
        active ? "pointer-events-none brightness-50" : "hover:shadow-md",
      )}
    >
      {/* サムネイル */}
      <div className="aspect-video w-full">
        <img
          src={contentWithTags.thumbnailUrl}
          className="pointer-events-none size-full object-cover transition-all duration-200 group-hover/content-card:opacity-80"
        />
      </div>
      <div className="px-3 pt-3">
        {/* タイトル */}
        <Link
          href={`/content?c=${contentWithTags.contentId}&t=${currentTagId}`}
          prefetch={false}
          className="block overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium"
        >
          {contentWithTags.title}
          <span className="absolute inset-0 z-10"></span>
        </Link>
        {contentWithTags.tags.length > 0 && (
          <TagCarousel tags={contentWithTags.tags} />
        )}
      </div>
    </Card>
  );
}
