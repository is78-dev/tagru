"use client";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tag } from "@/types/format";
import Link from "next/link";

type Props = {
  tags: Tag[];
};

export default function TagCarousel({ tags }: Props) {
  const sortedTagList = tags
    .filter((tag) => tag.isFavorite)
    .concat(tags.filter((tag) => !tag.isFavorite));

  return tags.length > 0 ? (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1 select-none text-nowrap *:basis-auto *:pl-1">
        {sortedTagList.map((tag, index) => (
          <CarouselItem key={index}>
            <Link href={`/tag?t=${tag.tagId}`} prefetch={false}>
              <Badge variant={tag.isFavorite ? "default" : "outline"}>
                {tag.tagName}
              </Badge>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  ) : (
    <div className="h-6"></div>
  );
}
