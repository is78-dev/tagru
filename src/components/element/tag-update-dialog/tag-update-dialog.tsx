"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCurrentTag } from "@/context/curent-tag-context";
import { ReactNode, useState } from "react";
import TagUpdateForm from "./tag-update-form";

type Props = {
  tagId: string;
  children: ReactNode;
};

export default function TagUpdateDialog({ tagId, children }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const {
    currentTag,
    currentParentTags,
    currentChildTags,
    refreshCurrentTag,
    loading,
  } = useCurrentTag();
  const error = !currentTag || !currentParentTags || !currentChildTags;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="block max-w-xl bg-card">
        <DialogHeader className="pb-4">
          <DialogTitle>タグの編集</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div>
            <p className="text-center text-sm">loading...</p>
          </div>
        ) : error ? (
          <div className="space-y-4">
            <p className="text-sm">データの取得に失敗しました</p>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={() => refreshCurrentTag(tagId)}>再試行</Button>
            </div>
          </div>
        ) : (
          <TagUpdateForm
            currentTag={currentTag}
            currentParentTags={currentParentTags}
            currentChildTags={currentChildTags}
            onClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
