import {
  getContentByContentId,
  getContentsByTagId,
} from "@/services/contentsService";
import { getTagByTagId, getTagsByContentId } from "@/services/tagsService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import ContentList from "./content-list";
import ContentInfo from "./content-info";
import CreateContentButton from "@/components/element/create-content-button/create-content-button";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { c: contentId, t: tagId } = await searchParams;
  if (typeof contentId !== "string") notFound();
  if (typeof tagId !== "string") notFound();

  const currentContent = await getContentByContentId(contentId);
  const currentContentTagList = await getTagsByContentId(contentId);
  const currentTag = await getTagByTagId(tagId);
  const currentTagContentList = await getContentsByTagId(tagId);

  return (
    <div className="flex flex-col gap-8 xl:px-10">
      {/* コンテンツ */}
      <div className="flex flex-col gap-4 xl:flex-row">
        {/* コンテンツ本体 */}
        <div className="aspect-video w-full overflow-hidden rounded-md outline outline-1 outline-border">
          <iframe
            src={currentContent.contentUrl + "?rel=0"}
            className="size-full"
            allowFullScreen
          ></iframe>
        </div>
        {/* コンテンツ詳細 */}
        <div className="relative h-[360px] grow xl:h-auto xl:min-w-[500px]">
          <ContentInfo
            key={currentContent.contentId}
            currentContent={currentContent}
            currentContentTagList={currentContentTagList}
            currentTag={currentTag}
            className="absolute inset-0"
          />
        </div>
      </div>
      {/* 関連コンテンツ */}
      <div className="flex flex-col gap-4">
        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          <CreateContentButton initTags={[currentTag]} />
          <Button asChild variant="ghost" className="text-xl font-semibold">
            <Link href={`/tag?t=${currentTag.tagId}`}>
              <Tag size={16} strokeWidth={2.5} />
              {currentTag.tagName}
            </Link>
          </Button>
        </div>
        {/* コンテンツリスト */}
        <ContentList
          contentList={currentTagContentList}
          currentTag={currentTag}
          currentContent={currentContent}
        />
      </div>
    </div>
  );
}
