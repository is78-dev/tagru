import { notFound } from "next/navigation";
import TagHeader from "./tag-header";
import { getContentListService } from "@/services/contentsService";

import InfinityContentList from "@/components/element/infinity-content-list/infinity-content-list";
import {
  getChildTagListService,
  getParentTagListService,
  getTagService,
} from "@/services/tagsService";
import ContentCreateDialog from "@/components/element/content-create-dialog/content-create-dialog";
import CreateContentCard from "@/components/element/content-card/create-content-card";
import { CurrentTagContext } from "@/context/curent-tag-context";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const { t: tagId } = await searchParams;
  if (typeof tagId !== "string") notFound();

  const tagPromise = getTagService(tagId);
  const parentTagsPromise = getParentTagListService(tagId);
  const childTagsPromise = getChildTagListService(tagId);
  const initialContentsPromise = getContentListService({
    range: { offset: 0, limit: 30 },
    tagId,
  });
  const [tag, parentTags, childTags, initialContents] = await Promise.all([
    tagPromise,
    parentTagsPromise,
    childTagsPromise,
    initialContentsPromise,
  ]);

  return (
    <CurrentTagContext tagId={tagId}>
      <div className="flex flex-col gap-6">
        <TagHeader
          initialTag={tag}
          initialParentTags={parentTags}
          initialChildTags={childTags}
        />

        <InfinityContentList
          key={tagId}
          initialContents={initialContents}
          chunkSize={30}
          currentTagId={tag.tagId}
        >
          <ContentCreateDialog initialTags={[tag]}>
            <CreateContentCard />
          </ContentCreateDialog>
        </InfinityContentList>
      </div>
    </CurrentTagContext>
  );
}
