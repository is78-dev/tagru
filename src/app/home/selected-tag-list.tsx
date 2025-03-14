"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tag } from "@/types/format";
import { X } from "lucide-react";

type Props = {
  tags: Tag[];
  handleSelectTag: (tag: Tag) => void;
  isCreatingTag: boolean;
};

export default function SelectedTagList({
  tags,
  handleSelectTag,
  isCreatingTag,
}: Props) {
  if (isCreatingTag) {
    return (
      <div className="h-8 text-sm text-muted-foreground">タグを作成中</div>
    );
  }

  if (tags.length === 0) {
    return (
      <div className="h-8 text-sm text-muted-foreground">
        タグが指定されていません
      </div>
    );
  }

  const sortedTagList = tags
    .filter((tag) => tag.isFavorite)
    .concat(tags.filter((tag) => !tag.isFavorite));

  return (
    <ScrollArea className="h-8 w-full" type="auto">
      <div className="flex min-w-0 gap-1.5">
        {sortedTagList.map((tag) => (
          <Badge
            key={tag.tagId}
            onClick={() => handleSelectTag(tag)}
            variant={tag.isFavorite ? "default" : "secondary"}
          >
            <X size={12} className="-ml-1 mr-1" />
            <span>{tag.tagName}</span>
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="z-20" />
    </ScrollArea>
  );
}
