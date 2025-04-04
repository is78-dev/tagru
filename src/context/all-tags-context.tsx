"use client";

import { getTagListAction } from "@/actions/tagAction";
import { toast } from "@/hooks/use-toast";
import { Tag } from "@/types/format";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  allTags: Tag[];
  refreshAllTags: () => Promise<void>;
};

const Context = createContext<ContextType>({} as ContextType);

export function AllTagsContext({ children }: { children: ReactNode }) {
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const refreshAllTags = async () => {
    try {
      const response = await getTagListAction({});
      setAllTags(response);
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
    }
  };

  useEffect(() => {
    refreshAllTags();
  }, []);

  return <Context value={{ allTags, refreshAllTags }}>{children}</Context>;
}

export const useAllTags = () => useContext(Context);
