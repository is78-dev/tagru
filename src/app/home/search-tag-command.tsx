"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Tag } from "@/types/format";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Plus, Star } from "lucide-react";

type Props = {
  tags: Tag[];
  handleSelectTag: (tag: Tag) => void;
  handleCreateTag: (tagName: string, isFavorite: boolean) => void;
};

export default function SearchTagCommand({
  tags,
  handleSelectTag,
  handleCreateTag,
}: Props) {
  const [inputText, setInputText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const favTags = useMemo<Tag[]>(
    () => tags.filter((tag) => tag.isFavorite),
    [tags],
  );
  const generalTags = useMemo<Tag[]>(
    () => tags.filter((tag) => !tag.isFavorite),
    [tags],
  );

  // フィルタに一致するタグの数
  const filteredTagsLength = tags.filter((tag) =>
    tag.tagName.toLowerCase().includes(inputText.toLocaleLowerCase()),
  ).length;

  return (
    <Command
      filter={(value, search) =>
        value.toLowerCase().includes(search.toLocaleLowerCase()) ? 1 : 0
      }
      className="overflow-visible"
    >
      <CommandInput
        className="rounded-lg border"
        placeholder="検索または作成するタグを入力"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        value={inputText}
        onValueChange={setInputText}
      />
      <div className="relative h-0">
        <CommandList
          className={twMerge(
            "absolute left-0 top-2 z-10 rounded border bg-background shadow transition duration-200",
            !open && "pointer-events-none translate-y-4 opacity-0",
          )}
        >
          {filteredTagsLength === 0 && (
            <CommandGroup heading="見つかりませんでした">
              <CommandItem
                value={inputText + "general"}
                onSelect={() => {
                  handleCreateTag(inputText, false);
                  setInputText("");
                }}
                onMouseDown={() => {
                  handleCreateTag(inputText, false);
                  setInputText("");
                }}
              >
                <Plus />
                <span>通常タグを作成して追加</span>
              </CommandItem>
              <CommandItem
                value={inputText + "favorite"}
                onSelect={() => {
                  handleCreateTag(inputText, true);
                  setInputText("");
                }}
                onMouseDown={() => {
                  handleCreateTag(inputText, true);
                  setInputText("");
                }}
              >
                <Star />
                <span>お気に入りタグを作成して追加</span>
              </CommandItem>
            </CommandGroup>
          )}
          {favTags.length > 0 && (
            <>
              <CommandGroup heading="お気に入り">
                {favTags.map((tag) => (
                  <CommandItem
                    key={tag.tagId}
                    onSelect={() => {
                      handleSelectTag(tag);
                      setInputText("");
                    }}
                    onMouseDown={() => {
                      handleSelectTag(tag);
                      setInputText("");
                    }}
                  >
                    <span>{tag.tagName}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          {generalTags.length > 0 && (
            <CommandGroup heading="通常">
              {generalTags.map((tag) => (
                <CommandItem
                  key={tag.tagId}
                  onSelect={() => {
                    handleSelectTag(tag);
                    setInputText("");
                  }}
                  onMouseDown={() => {
                    handleSelectTag(tag);
                    setInputText("");
                  }}
                >
                  <span>{tag.tagName}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </div>
    </Command>
  );
}
