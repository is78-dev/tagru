import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getContentListService,
  getContentService,
} from "@/services/contentsService";
import { getTagService } from "@/services/tagsService";
import InfinityContentList from "@/components/element/infinity-content-list/infinity-content-list";
import ContentCreateDialog from "@/components/element/content-create-dialog/content-create-dialog";
import ContentInfo from "./_components/content-info";
import { Tag } from "lucide-react";
import { CurrentContentContext } from "@/context/current-content-context";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { c: contentId, t: tagId } = await searchParams;
  if (typeof contentId !== "string") notFound();
  if (!(typeof tagId === "string" || typeof tagId === "undefined")) notFound();

  const contentPromise = getContentService(contentId);
  const initialContentsPromise = getContentListService({
    range: { offset: 0, limit: 20 },
    tagId,
  });
  const [content, initialContents] = await Promise.all([
    contentPromise,
    initialContentsPromise,
  ]);
  const currentTag = tagId ? await getTagService(tagId) : undefined;

  return (
    <CurrentContentContext contentId={contentId}>
      <div className="flex flex-col gap-6">
        {/* コンテンツ */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* コンテンツ本体 */}
          <div className="aspect-video w-full overflow-hidden rounded-md outline outline-1 outline-border">
            <iframe
              src={content.contentUrl + "?rel=0"}
              className="size-full"
              allowFullScreen
            ></iframe>
          </div>
          {/* コンテンツ情報 */}
          <div className="relative h-[400px] grow p-2 xl:h-auto xl:min-w-[25%]">
            <ContentInfo
              contentId={contentId}
              currentTag={currentTag}
              className="absolute inset-0"
            />
          </div>
        </div>
        {/* 関連コンテンツ */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Button
              asChild
              variant="ghost"
              className="-ml-4 text-xl font-semibold"
            >
              <Link href={currentTag ? `/tag?t=${currentTag.tagId}` : "/"}>
                <Tag className="size-5 stroke-[2.5]" />
                {currentTag ? currentTag.tagName : "全てのコンテンツ"}
              </Link>
            </Button>
            <ContentCreateDialog initialTags={currentTag ? [currentTag] : []}>
              <Button size="sm" variant="default">
                コンテンツを追加
              </Button>
            </ContentCreateDialog>
          </div>
          <InfinityContentList
            initialContents={initialContents}
            chunkSize={10}
            currentContentId={content.contentId}
            currentTagId={currentTag?.tagId}
          />
        </div>
      </div>
    </CurrentContentContext>
  );
}
