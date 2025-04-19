"use client";
import { Card } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";
import { Tag } from "@/types/format";
import ContentNoteTextArea from "./content-note-text-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ContentDeleteDialog from "@/components/element/content-delete-dialog/content-delete-dialog";
import ContentUpdateDialog from "@/components/element/content-update-dialog/content-update-dialog";
import TagListArea from "@/components/element/tag-list-area/tag-list-area";
import { useCurrentContent } from "@/context/current-content-context";

type Props = {
  contentId: string;
  currentTag: Tag | undefined;
  className?: string;
};

export default function ContentInfo({
  className = "",
  currentTag,
  contentId,
}: Props) {
  const { currentContent, currentContentTags, refreshCurrentContent, loading } =
    useCurrentContent();

  if (loading) {
    return (
      <Card className={twMerge("animate-pulse bg-muted", className)}></Card>
    );
  }

  if (!currentContent || !currentContentTags) {
    return (
      <Card
        className={twMerge(
          "flex flex-col items-center justify-center gap-5",
          className,
        )}
      >
        <p className="text-sm">データの取得に失敗しました</p>
        <div className="flex items-center justify-between">
          <Button onClick={() => refreshCurrentContent(contentId)}>
            再試行
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={twMerge("p-5", className)}>
      <div className="flex h-full flex-col gap-5">
        {/* タイトル */}
        <div className="space-y-2">
          <div className="text-md line-clamp-2 font-semibold">
            {currentContent ? currentContent.title : ""}
          </div>
          <Separator />
        </div>

        {/* タグ */}
        <div className="space-y-2">
          <div className="h-[90px] overflow-y-auto">
            <TagListArea
              tags={currentContentTags
                .filter((tag) => tag.isFavorite)
                .concat(currentContentTags.filter((tag) => !tag.isFavorite))}
            />
          </div>
          <Separator />
        </div>

        {/* メモ */}
        <div className="grow">
          <ContentNoteTextArea
            contentId={contentId}
            initialText={currentContent.note}
          />
        </div>

        {/* 操作ボタン */}
        <div className="-my-3 flex items-center justify-between">
          <ContentDeleteDialog
            contentId={currentContent.contentId}
            redirectUrl={currentTag ? `/tag?t=${currentTag.tagId}` : "/home"}
          >
            <Button size="icon" variant="ghost" disabled={loading}>
              <Trash2 className="size-5" />
            </Button>
          </ContentDeleteDialog>
          <ContentUpdateDialog contentId={currentContent.contentId}>
            <Button variant="ghost" size="sm" disabled={loading}>
              編集
            </Button>
          </ContentUpdateDialog>
        </div>
      </div>
    </Card>
  );
}
