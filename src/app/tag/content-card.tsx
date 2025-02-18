import { ContentWithTags } from "@/types/format";
import Link from "next/link";
import TagCarousel from "./tag-carousel";

type Props = {
  content: ContentWithTags;
};

export default function ContentCard({ content }: Props) {
  return (
    <div>
      <Link
        href={`/content?c=${content.contentId}`}
        prefetch={false}
        className="block rounded-lg border border-transparent p-2 hover:opacity-80 active:border-border active:bg-muted"
      >
        <div className="aspect-video w-full overflow-hidden rounded border">
          <img
            src={content.thumbnailUrl}
            className="pointer-events-none size-full object-cover"
          />
        </div>
        <div className="mt-2 overflow-hidden overflow-ellipsis text-nowrap text-sm font-medium">
          {content.title}
        </div>
      </Link>
      <div className="mx-2">
        <TagCarousel tags={content.tags} />
      </div>
    </div>
  );
}
