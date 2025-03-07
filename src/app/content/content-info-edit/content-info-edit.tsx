"use client";

import { useState } from "react";
import UpdateContentForm from "./update-content-form";
import { Content, Tag } from "@/types/format";
import { useToast } from "@/hooks/use-toast";
import { getContentAction } from "@/actions/contentAction";
import { getTagsByContentIdAction } from "@/actions/tagAction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  currentContent: Content;
  currentTag: Tag;
  editDisalbed: boolean;
};

export default function ContentInfoEdit({
  currentContent,
  currentTag,
  editDisalbed,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [initContent, setInitContent] = useState<Content | null>(null);
  const [initTags, setInitTags] = useState<Tag[] | null>(null);

  const handleClickEditButton = async () => {
    setLoading(true);
    try {
      const contentData = await getContentAction(currentContent.contentId);
      const tagsData = await getTagsByContentIdAction(currentContent.contentId);
      setInitContent(contentData);
      setInitTags(tagsData);
      setOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "エラー",
          description: error.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "エラー",
          description: "予期せぬエラーが発生しました",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={handleClickEditButton}
        type="button"
        variant="outline"
        className="bg-card"
        disabled={editDisalbed || loading}
      >
        <Settings size={16} />
        {loading ? "読み込み中..." : "編集"}
      </Button>
      <DialogContent
        className="max-w-xl bg-card"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>コンテンツの編集</DialogTitle>
        </DialogHeader>
        <div className="relative h-[80dvh]">
          {initContent && initTags && (
            <UpdateContentForm
              initContent={initContent}
              initTags={initTags}
              currentTag={currentTag}
              closeDialog={() => setOpen(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
