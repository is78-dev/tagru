"use client";

import { useCurrentContent } from "@/context/current-content-context";
import ContentUpdateForm from "./content-update-form";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  contentId: string;
};
export default function ContentUpdateFormFetcher({ contentId }: Props) {
  const { currentContent, currentContentTags, refreshCurrentContent, loading } =
    useCurrentContent(contentId);

  if (loading) {
    return <div className="text-center text-sm">loading...</div>;
  }

  if (!currentContent || !currentContentTags) {
    return (
      <div>
        <div className="mb-4 text-sm">データの取得に失敗しました</div>
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>
          <Button onClick={() => refreshCurrentContent(contentId)}>
            再試行
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ContentUpdateForm content={currentContent} tags={currentContentTags} />
  );
}
