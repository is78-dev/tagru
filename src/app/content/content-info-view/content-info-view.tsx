"use client";

import { Separator } from "@/components/ui/separator";
import { Content, Tag } from "@/types/format";
import ContentTagArea from "./content-tag-area";
import ContentNoteTextArea from "./content-note-text-area";
import { Dispatch } from "react";

type Props = {
  currentContent: Content;
  currentContentTagList: Tag[];
  setLoading: Dispatch<boolean>;
};

export default function ContentInfoView({
  currentContent,
  currentContentTagList,
  setLoading,
}: Props) {
  return (
    <>
      {/* タイトル */}
      <div>
        <h1 className="line-clamp-2 shrink-0 px-2 text-sm font-bold">
          {currentContent.title}
        </h1>
        <Separator className="mt-1" />
      </div>
      {/* タグ */}
      <ContentTagArea tagList={currentContentTagList} />
      {/* メモ */}
      <div className="min-h-[40%] grow">
        <ContentNoteTextArea content={currentContent} setLoading={setLoading} />
      </div>
    </>
  );
}
