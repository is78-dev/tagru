"use client";

import { getContentAction } from "@/actions/contentAction";
import { getContentTagListAction } from "@/actions/tagAction";
import { useClientError } from "@/hooks/use-client-error";
import { Content, Tag } from "@/types/format";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// TODO: コンテキストを分割して部分的な更新を可能にする
type ContextType = {
  currentContent: Content | null;
  currentContentTags: Tag[] | null;
  resetCurrentContent: () => void;
  refreshCurrentContent: (contentId: string) => Promise<void>;
  loading: boolean;
};

const Context = createContext<ContextType>({} as ContextType);

export function CurrentContentContext({
  contentId,
  children,
}: {
  contentId: string;
  children: ReactNode;
}) {
  const [currentContent, setCurrentContent] = useState<Content | null>(null);
  const [currentContentTags, setCurrentContentTags] = useState<Tag[] | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { clientErrorHandler } = useClientError();

  const resetCurrentContent = () => {
    setCurrentContent(null);
    setCurrentContentTags(null);
  };

  const refreshCurrentContent = async (contentId: string) => {
    try {
      setLoading(true);
      const contentDataPromise = getContentAction(contentId);
      const contentTagsDataPromise = getContentTagListAction(contentId);
      const [contentData, contentTagsData] = await Promise.all([
        contentDataPromise,
        contentTagsDataPromise,
      ]);
      setCurrentContent(contentData);
      setCurrentContentTags(contentTagsData);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetCurrentContent();
    refreshCurrentContent(contentId);
  }, [contentId]);

  return (
    <Context
      value={{
        currentContent,
        currentContentTags,
        resetCurrentContent,
        refreshCurrentContent,
        loading,
      }}
    >
      {children}
    </Context>
  );
}

export const useCurrentContent = () => useContext(Context);
