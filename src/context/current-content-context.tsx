"use client";

import { getContentAction } from "@/actions/contentAction";
import { getContentTagListAction } from "@/actions/tagAction";
import { toast } from "@/hooks/use-toast";
import { Content, Tag } from "@/types/format";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  currentContent: Content | null;
  currentContentTags: Tag[] | null;
  refreshCurrentContent: (contentId: string) => Promise<void>;
  loading: boolean;
};

const Context = createContext<ContextType>({} as ContextType);

export function CurrentContentContext({ children }: { children: ReactNode }) {
  const [currentContent, setCurrentContent] = useState<Content | null>(null);
  const [currentContentTags, setCurrentContentTags] = useState<Tag[] | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const refreshCurrentContent = async (contentId: string) => {
    try {
      setLoading(true);
      const contentData = await getContentAction(contentId);
      const contentTagsData = await getContentTagListAction(contentId);
      setCurrentContent(contentData);
      setCurrentContentTags(contentTagsData);
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
    <Context
      value={{
        currentContent,
        currentContentTags,
        refreshCurrentContent,
        loading,
      }}
    >
      {children}
    </Context>
  );
}

export const useCurrentContent = (contentId: string) => {
  const context = useContext(Context);

  useEffect(() => {
    context.refreshCurrentContent(contentId);
  }, [contentId]);

  return context;
};
