"use client";

import TagSearchBox from "@/components/element/tag-search-box/tag-search-box";
import { useAllTags } from "@/context/all-tags-context";
import { useRouter } from "next/navigation";

export default function TagSearchNavigator() {
  const { allTags } = useAllTags();
  const router = useRouter();
  return (
    <TagSearchBox
      tags={allTags}
      onSelect={(tag) => {
        router.push(`/tag?t=${tag.tagId}`);
      }}
      placeholder="タグを検索"
    />
  );
}
