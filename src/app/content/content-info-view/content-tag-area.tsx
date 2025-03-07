import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tag } from "@/types/format";
import Link from "next/link";

type Props = {
  tagList: Tag[];
};

export default function ContentTagArea({ tagList }: Props) {
  const sortedTagList = tagList
    .filter((tag) => tag.isFavorite)
    .concat(tagList.filter((tag) => !tag.isFavorite));

  return (
    <ScrollArea type="always">
      <div className="mr-2 flex flex-wrap gap-x-1.5 gap-y-1">
        {sortedTagList.map((tag) => (
          <Link
            key={tag.tagId}
            href={`/tag?t=${tag.tagId}`}
            prefetch={false}
            className="block"
          >
            <Badge variant={tag.isFavorite ? "default" : "secondary"}>
              {tag.tagName}
            </Badge>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
