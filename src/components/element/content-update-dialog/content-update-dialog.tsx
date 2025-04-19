"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCurrentContent } from "@/context/current-content-context";
import { ReactNode, useState } from "react";
import ContentUpdateForm from "./content-update-form";
import { Button } from "@/components/ui/button";

type Props = {
  contentId: string;
  children: ReactNode;
};

export default function ContentUpdateDialog({ contentId, children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { currentContent, currentContentTags, refreshCurrentContent } =
    useCurrentContent();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="block max-w-xl bg-card">
        <DialogHeader className="pb-4">
          <DialogTitle>コンテンツの編集</DialogTitle>
        </DialogHeader>
        {!currentContent || !currentContentTags ? (
          <div className="space-y-4">
            <p className="text-sm">データの取得に失敗しました</p>
            <div className="flex items-center justify-between">
              <Button onClick={() => refreshCurrentContent(contentId)}>
                再試行
              </Button>
            </div>
          </div>
        ) : (
          <ContentUpdateForm
            content={currentContent}
            tags={currentContentTags}
            onClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
