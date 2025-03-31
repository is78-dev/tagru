"use client";
import { Card } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";
import { Content, Tag } from "@/types/format";
import { useState } from "react";
import ContentNoteTextArea from "./content-note-text-area";
import ContentTagArea from "./content-tag-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ContentDeleteDialog from "@/components/element/content-delete-dialog/content-delete-dialog";
import ContentUpdateDialog from "@/components/element/content-update-dialog/content-update-dialog";

type Props = {
  content: Content;
  tags: Tag[];
  currentTag: Tag | undefined;
  className?: string;
};

export default function ContentInfo({
  content,
  tags,
  currentTag,
  className = "",
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Card className={twMerge("p-5", className)}>
      <div className="flex h-full flex-col gap-5">
        {/* タイトル */}
        <div className="space-y-2">
          <div className="text-md line-clamp-2 font-semibold">
            {content.title}
          </div>
          <Separator />
        </div>

        {/* タグ */}
        <div className="space-y-2">
          <div className="h-[90px] overflow-y-auto">
            <ContentTagArea
              tags={tags
                .filter((tag) => tag.isFavorite)
                .concat(tags.filter((tag) => !tag.isFavorite))}
            />
          </div>
          <Separator />
        </div>

        {/* メモ */}
        <div className="grow">
          <ContentNoteTextArea content={content} setLoading={setLoading} />
        </div>

        {/* 操作ボタン */}
        <div className="-my-3 flex items-center justify-between">
          <ContentDeleteDialog
            contentId={content.contentId}
            redirectUrl={currentTag ? `/tag?t=${currentTag.tagId}` : "/home"}
          >
            <Button size="icon" variant="ghost" disabled={loading}>
              <Trash2 className="size-5" />
            </Button>
          </ContentDeleteDialog>
          <ContentUpdateDialog contentId={content.contentId}>
            <Button variant="ghost" size="sm" disabled={loading}>
              編集
            </Button>
          </ContentUpdateDialog>
        </div>
      </div>
    </Card>
  );
}
