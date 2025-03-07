"use client";
import { Card } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";
import { Content, Tag } from "@/types/format";
import { useState } from "react";
import ContentInfoView from "./content-info-view/content-info-view";
import ContentInfoEdit from "./content-info-edit/content-info-edit";

type Props = {
  currentContent: Content;
  currentContentTagList: Tag[];
  currentTag: Tag;
  className?: string;
};

export default function ContentInfo({
  currentContent,
  currentContentTagList,
  currentTag,
  className = "",
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Card className={twMerge("p-6", className)}>
      <div className="flex h-full flex-col gap-4">
        <ContentInfoView
          currentContent={currentContent}
          currentContentTagList={currentContentTagList}
          setLoading={setLoading}
        />
        <ContentInfoEdit
          currentContent={currentContent}
          currentTag={currentTag}
          editDisalbed={loading}
        />
      </div>
    </Card>
  );
}
