import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tag } from "@/types/format";
import { useRouter } from "next/navigation";

type Props = {
  tags: Tag[];
  onSelect?: (tag: Tag) => void;
  loading?: boolean;
};
export default function TagCarousel({
  tags,
  onSelect,
  loading = false,
}: Props) {
  const router = useRouter();
  const handleClick = (tag: Tag) => {
    if (onSelect) {
      onSelect(tag);
    } else {
      router.push(`/tag?t=${tag.tagId}`);
    }
  };

  if (loading) {
    return (
      <div className="py-[1.5px]">
        <div className="h-[22px] w-full animate-pulse rounded-full bg-muted"></div>
      </div>
    );
  }

  return (
    <Carousel>
      <CarouselContent className="-ml-1 select-none *:basis-auto *:pl-1">
        {tags.map((tag, index) => (
          <CarouselItem key={index} onClick={() => handleClick(tag)}>
            <Badge variant={tag.isFavorite ? "default" : "secondary"}>
              {tag.tagName}
            </Badge>
          </CarouselItem>
        ))}
        {tags.length === 0 && (
          <div>
            <Badge variant="outline">タグなし</Badge>
          </div>
        )}
      </CarouselContent>
    </Carousel>
  );
}
