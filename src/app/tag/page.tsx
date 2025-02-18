import { getContentsByTagId } from "@/services/contentsService";
import { notFound } from "next/navigation";
import { getTagByTagId } from "@/services/tagsService";
import ContentCard from "./content-card";
import TagCarousel from "./tag-carousel";
import TagHeader from "./tag-header";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const { t: tag_id } = await searchParams;
  if (typeof tag_id !== "string") notFound();

  const tagData = await getTagByTagId(tag_id);
  const contentsData = await getContentsByTagId(tag_id);

  return (
    <div>
      <div className="mx-2">
        <TagHeader tag={tagData} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-y-3">
        {contentsData.map((content) => (
          <ContentCard key={content.contentId} content={content} />
        ))}
      </div>
    </div>
  );
}
