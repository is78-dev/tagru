"use client";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FC, useCallback, useEffect, useRef, useState } from "react";

const Page: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null); //focus周りの挙動を制御するために使用
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [searchResults, setSearchResults] = useState<string[]>([
    "a",
    "b",
    "c",
    "d",
    "e",
  ]);
  const [inputText, setInputText] = useState("");
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      value={selected}
      className="w-[512px] overflow-visible"
    >
      <CommandInput
        value={inputText}
        ref={inputRef}
        placeholder="猫の種類を検索"
        onValueChange={(text) => {
          setInputText(text);
          // 再編集時には選択済み項目をクリア
          if (selected) {
            setSelected(undefined);
          }
        }}
        onBlur={() => setOpen(false)}
        onFocus={() => {
          setOpen(true);
          if (selected) {
            inputRef.current?.select(); // フォーカス時に選択済み項目がある場合、全選択する
          }
        }}
      />
      <div className="relative mt-2">
        {!selected && open && (
          <CommandList className="absolute left-0 top-0 w-full rounded border bg-background shadow-md">
            <CommandEmpty className="px-4 py-2 text-muted-foreground">
              ヒットなし
            </CommandEmpty>
            {searchResults?.map((v) => (
              <CommandItem
                className="flex items-center gap-2"
                onSelect={() => {
                  setSelected(v);
                  setInputText(v);
                }}
                value={v}
                key={v}
              >
                {v}
              </CommandItem>
            ))}
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default Page;
