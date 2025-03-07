"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tag } from "@/types/format";
import Link from "next/link";

type Props = {
  tags: Tag[];
};

export default function TagCarousel({ tags }: Props) {
  const sortedTagList = tags
    .filter((tag) => tag.isFavorite)
    .concat(tags.filter((tag) => !tag.isFavorite));

  return (
    <ScrollArea className="w-full">
      <div className="mb-3 flex gap-1.5">
        {sortedTagList.map((tag) => (
          <Link
            key={tag.tagId}
            href={`/tag?t=${tag.tagId}`}
            prefetch={false}
            className="z-20 mt-1 block"
          >
            <Badge variant={tag.isFavorite ? "default" : "secondary"}>
              {tag.tagName}
            </Badge>
          </Link>
        ))}
        {sortedTagList.length === 0 && (
          <div className="mt-1">
            <Badge variant="outline">タグ無し</Badge>
          </div>
        )}
      </div>
      <ScrollBar orientation="horizontal" className="z-20" />
    </ScrollArea>
  );
}
