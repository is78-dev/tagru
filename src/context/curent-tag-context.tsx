"use client";

import { getRelativeTagAction } from "@/actions/tagAction";
import { useClientError } from "@/hooks/use-client-error";
import { Tag } from "@/types/format";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  currentTag: Tag | null;
  currentParentTags: Tag[] | null;
  currentChildTags: Tag[] | null;
  resetCurrentTag: () => void;
  refreshCurrentTag: (tagId: string) => Promise<void>;
  loading: boolean;
};

const Context = createContext<ContextType>({} as ContextType);

export function CurrentTagContext({
  tagId,
  children,
}: {
  tagId: string;
  children: ReactNode;
}) {
  const [currentTag, setCurrentTag] = useState<Tag | null>(null);
  const [currentParentTags, setCurrentParentTags] = useState<Tag[] | null>(
    null,
  );
  const [currentChildTags, setCurrentChildTags] = useState<Tag[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { clientErrorHandler } = useClientError();

  const resetCurrentTag = () => {
    setCurrentTag(null);
    setCurrentParentTags(null);
    setCurrentChildTags(null);
  };

  const refreshCurrentTag = async (tagId: string) => {
    if (loading) return;
    try {
      setLoading(true);
      const { tag, parentTags, childTags } = await getRelativeTagAction(tagId);
      setCurrentTag(tag);
      setCurrentParentTags(parentTags);
      setCurrentChildTags(childTags);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetCurrentTag();
    refreshCurrentTag(tagId);
  }, [tagId]);

  return (
    <Context
      value={{
        currentTag,
        currentParentTags,
        currentChildTags,
        resetCurrentTag,
        refreshCurrentTag,
        loading,
      }}
    >
      {children}
    </Context>
  );
}

export const useCurrentTag = () => useContext(Context);
