"use client";
import { getTagListAction } from "@/actions/tagAction";
import { Button } from "@/components/ui/button";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Tag } from "@/types/format";
import { Star } from "lucide-react";
import Link from "next/link";

type Props = {
  initialTags?: Tag[];
  chunkSize?: number;
};

export default function InfinityTagList({
  initialTags = [],
  chunkSize = 10,
}: Props) {
  const {
    items: tags,
    loading,
    hasMore,
    targetRef,
  } = useInfiniteScroll<Tag>(initialTags, (offset) =>
    getTagListAction({ range: { offset, limit: chunkSize } }),
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      {tags.map((tag, index) => (
        <Button
          key={index}
          asChild
          variant={tag.isFavorite ? "outline" : "ghost"}
          className="gap-1"
        >
          <Link href={`/tag?t=${tag.tagId}`} prefetch={false} className="block">
            {tag.tagName}
          </Link>
        </Button>
      ))}
      {!loading && hasMore && <div ref={targetRef} className="opacity-0"></div>}
    </div>
  );
}
