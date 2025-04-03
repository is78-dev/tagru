"use client";
import { getContentsAction } from "@/actions/contentAction";
import ContentCard from "@/components/element/content-card/content-card";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Content } from "@/types/format";
import { ReactNode } from "react";

type Props = {
  initialContents?: Content[];
  chunkSize?: number;
  currentContentId?: string;
  currentTagId?: string;
  children?: ReactNode;
};

export default function InfinityContentList({
  initialContents = [],
  chunkSize = 10,
  currentContentId,
  currentTagId,
  children,
}: Props) {
  const {
    items: contents,
    loading,
    hasMore,
    targetRef,
  } = useInfiniteScroll<Content>(initialContents, (offset) =>
    getContentsAction({
      range: { offset, limit: chunkSize },
      tagId: currentTagId,
    }),
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-4 gap-y-6">
      {children}
      {contents.map((content, index) => (
        <ContentCard
          key={index}
          content={content}
          href={
            !currentTagId
              ? `/content?c=${content.contentId}`
              : `/content?c=${content.contentId}&t=${currentTagId}`
          }
          disabled={content.contentId === currentContentId}
        />
      ))}
      {!loading && hasMore && (
        <div ref={targetRef} className="-mt-[100dvh] opacity-0"></div>
      )}
    </div>
  );
}
