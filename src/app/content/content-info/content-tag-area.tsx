import { Badge } from "@/components/ui/badge";
import { Tag } from "@/types/format";
import Link from "next/link";

type Props = {
  tags: Tag[];
};

export default function ContentTagArea({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Link key={tag.tagId} href={`/tag?t=${tag.tagId}`} prefetch={false}>
          <Badge variant={tag.isFavorite ? "default" : "secondary"}>
            {tag.tagName}
          </Badge>
        </Link>
      ))}
      {tags.length === 0 && <Badge variant="outline">タグなし</Badge>}
    </div>
  );
}
