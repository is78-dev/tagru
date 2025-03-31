import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentCreateDialog from "@/components/element/content-create-dialog/content-create-dialog";
import { Button } from "@/components/ui/button";
import InfinityTagList from "./infinity-tag-list";
import TagCreateDialog from "@/components/element/tag-create-dialog/tag-create-dialog";
import InfinityContentList from "@/components/element/infinity-content-list/infinity-content-list";
import { getContentListService } from "@/services/contentsService";
import { getTagListService } from "@/services/tagsService";

export default async function Page() {
  const initialContents = await getContentListService({
    range: { offset: 0, limit: 30 },
  });
  const initialTags = await getTagListService({
    range: { offset: 0, limit: 100 },
  });

  return (
    <div className="py-6">
      <Tabs defaultValue="content">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TabsList>
            <TabsTrigger value="content">コンテンツ</TabsTrigger>
            <TabsTrigger value="tag" className="w-[94px]">
              タグ
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="mt-0">
            <ContentCreateDialog>
              <Button size="sm" variant="default">
                コンテンツを追加
              </Button>
            </ContentCreateDialog>
          </TabsContent>
          <TabsContent value="tag" className="mt-0">
            <TagCreateDialog>
              <Button size="sm" variant="default">
                タグを作成
              </Button>
            </TagCreateDialog>
          </TabsContent>
        </div>
        <TabsContent value="content" className="mt-4">
          <InfinityContentList
            initialContents={initialContents}
            chunkSize={30}
          />
        </TabsContent>
        <TabsContent value="tag" className="mt-4">
          <InfinityTagList initialTags={initialTags} chunkSize={100} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
