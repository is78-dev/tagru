"use client";
import { Button } from "@/components/ui/button";
import { useAllTags } from "@/context/all-tags-context";
import Link from "next/link";

export default function AllTagList() {
  const { allTags } = useAllTags();
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {allTags.map((tag, index) => (
        <Button
          key={index}
          asChild
          variant={tag.isFavorite ? "default" : "outline"}
          size="sm"
          className="gap-1 rounded-full"
        >
          <Link href={`/tag?t=${tag.tagId}`} prefetch={false} className="block">
            {tag.tagName}
          </Link>
        </Button>
      ))}
    </div>
  );
}
