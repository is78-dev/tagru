import { notFound } from "next/navigation";
import TagHeader from "./tag-header";
import { getContentListService } from "@/services/contentsService";

import InfinityContentList from "@/components/element/infinity-content-list/infinity-content-list";
import { getTagService } from "@/services/tagsService";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const { t: tagId } = await searchParams;
  if (typeof tagId !== "string") notFound();

  const tag = await getTagService(tagId);
  const initialContents = await getContentListService({
    range: { offset: 0, limit: 30 },
    tagId,
  });

  return (
    <div className="flex flex-col gap-4 py-6">
      <TagHeader tag={tag} />
      <InfinityContentList
        key={tagId}
        initialContents={initialContents}
        chunkSize={30}
        currentTagId={tag.tagId}
      />
    </div>
  );
}
