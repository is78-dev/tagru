"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tag } from "@/types/format";
import { X } from "lucide-react";

type Props = {
  tags: Tag[];
  handleSelectTag: (tag: Tag) => void;
  isCreatingTag: boolean;
};

export default function SelectedTagCarousel({
  tags,
  handleSelectTag,
  isCreatingTag,
}: Props) {
  const sortedTagList = tags
    .filter((tag) => tag.isFavorite)
    .concat(tags.filter((tag) => !tag.isFavorite));

  return isCreatingTag ? (
    <div className="h-6 text-sm text-muted-foreground">タグを作成中</div>
  ) : tags.length > 0 ? (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1 select-none text-nowrap *:basis-auto *:pl-1">
        {sortedTagList.map((tag, index) => (
          <CarouselItem key={index} onClick={() => handleSelectTag(tag)}>
            <Badge variant={tag.isFavorite ? "default" : "outline"}>
              <X size={12} className="-ml-1 mr-1" />
              <span>{tag.tagName}</span>
            </Badge>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  ) : (
    <div className="h-6 text-sm text-muted-foreground">
      タグが指定されていません
    </div>
  );
}
