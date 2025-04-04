"use client";
import { Tag } from "@/types/format";
import TagNoteArea from "./tag-note-area";
import TagListArea from "@/components/element/tag-list-area/tag-list-area";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentTag } from "@/context/curent-tag-context";
import TagDeleteDialog from "@/components/element/tag-delete-dialog/tag-delete-dialog";
import TagUpdateDialog from "@/components/element/tag-update-dialog/tag-update-dialog";

type Props = {
  initialTag: Tag;
  initialParentTags: Tag[];
  initialChildTags: Tag[];
};

export default function TagHeader({
  initialTag,
  initialParentTags,
  initialChildTags,
}: Props) {
  const { currentTag, currentParentTags, currentChildTags } = useCurrentTag();

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* タグ名とメモ */}
      <div className="flex grow flex-col space-y-2">
        <div className="mb-2 flex items-center gap-2">
          {(currentTag ? currentTag.isFavorite : initialTag.isFavorite) && (
            <Star className="size-5" />
          )}
          <h1 className="line-clamp-1 text-xl font-bold">
            {currentTag ? currentTag.tagName : initialTag.tagName}
          </h1>
        </div>
        <div className="h-[150px] grow md:h-auto">
          <TagNoteArea
            key={initialTag.tagId}
            tagId={initialTag.tagId}
            initialText={initialTag.note}
          />
        </div>
      </div>
      {/* タグ補足情報 */}
      <div className="mt-1 w-full space-y-2 md:w-[40%]">
        {/* 親タグ */}
        <div className="border-b pb-1">
          <div className="mb-1 text-xs font-semibold">親タグ</div>
          <div className="h-[60px] overflow-y-auto">
            <TagListArea
              tags={currentParentTags ? currentParentTags : initialParentTags}
            />
          </div>
        </div>
        {/* 子タグ */}
        <div className="border-b pb-1">
          <div className="mb-1 text-xs font-semibold">子タグ</div>
          <div className="h-[60px] overflow-y-auto">
            <TagListArea
              tags={currentChildTags ? currentChildTags : initialChildTags}
            />
          </div>
        </div>
        {/* ボタン */}
        <div className="flex items-center justify-between">
          {/* 削除ボタン */}
          <TagDeleteDialog tagId={initialTag.tagId} redirectUrl={"/home"}>
            <Button variant="ghost" size="icon">
              <Trash2 className="size-5" />
            </Button>
          </TagDeleteDialog>
          {/* 編集ボタン */}
          <TagUpdateDialog tagId={initialTag.tagId}>
            <Button variant="ghost" size="sm">
              編集
            </Button>
          </TagUpdateDialog>
        </div>
      </div>
    </div>
  );
}
