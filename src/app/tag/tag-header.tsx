import { Tag } from "@/types/format";

type Props = {
  tag: Tag;
};

export default function TagHeader({ tag }: Props) {
  return (
    <div className="space-y-2 border">
      <h1 className="text-3xl font-bold">{tag.tagName}</h1>
      <div className="h-20 rounded bg-muted">tag note</div>
    </div>
  );
}
