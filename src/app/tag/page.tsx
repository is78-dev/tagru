import { getContentsByTagId } from "@/services/contentsService";
import { notFound } from "next/navigation";
import { getTagByTagId } from "@/services/tagsService";
import ContentCard from "./content-card";
import TagHeader from "./tag-header";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const { t: tagId } = await searchParams;
  if (typeof tagId !== "string") notFound();

  const tagData = await getTagByTagId(tagId);
  const contentsData = await getContentsByTagId(tagId);

  return (
    <div className="p-4">
      <div className="mx-2">
        <TagHeader tag={tagData} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-y-1">
        {contentsData.map((content) => (
          <ContentCard
            key={content.contentId}
            contentWithTags={content}
            currentTagId={tagData.tagId}
          />
        ))}
      </div>
    </div>
  );
}
