import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentCreateDialog from "@/components/element/content-create-dialog/content-create-dialog";
import { Button } from "@/components/ui/button";
import TagCreateDialog from "@/components/element/tag-create-dialog/tag-create-dialog";
import InfinityContentList from "@/components/element/infinity-content-list/infinity-content-list";
import { getContentListService } from "@/services/contentsService";
import AllTagList from "./_components/all-tag-list";
import TagSearchNavigator from "@/components/layout/header/tag-search-navigator/tag-search-navigator";

export default async function Page() {
  const initialContents = await getContentListService({
    range: { offset: 0, limit: 20 },
  });

  return (
    <div>
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
            chunkSize={10}
          />
        </TabsContent>
        <TabsContent value="tag" className="mt-4">
          <div className="flex flex-col items-center gap-4">
            <TagSearchNavigator />
            <AllTagList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
