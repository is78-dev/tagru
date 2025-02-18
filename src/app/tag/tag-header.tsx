import { Tag } from "@/types/format";
import TagCarousel from "./tag-carousel";

type Props = {
  tag: Tag;
};

export default function TagHeader({ tag }: Props) {
  return (
    <div className="grid py-1 md:grid-cols-2">
      <div className="md:border-r md:pr-1">
        <h1 className="text-3xl font-bold">{tag.tagName}</h1>
        <TagCarousel tags={[]} />
      </div>
      <div className="h-20 rounded bg-muted md:ml-1">tag note</div>
    </div>
  );
}
