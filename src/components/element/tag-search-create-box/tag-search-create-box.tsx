import { Tag } from "@/types/format";
import { Plus, Search, Star } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  tags: Tag[];
  onSelect: (item: Tag) => void;
  onCreate: (tagName: string, isFavorite: boolean) => void;
  className?: string;
  placeholder?: string;
};

export default function TagSearchCreateBox({
  tags,
  onSelect,
  onCreate,
  className = "",
  placeholder = "",
}: Props) {
  const [query, setQuery] = useState("");
  const lowerQuery = useMemo(() => query.toLowerCase(), [query]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const filteredTags = useMemo(
    () =>
      tags
        .map((tag) => ({
          tag,
          rank:
            tag.tagName.toLowerCase() === lowerQuery
              ? 3
              : tag.tagName.toLowerCase().startsWith(lowerQuery)
                ? 2
                : tag.tagName.toLowerCase().includes(lowerQuery)
                  ? 1
                  : 0,
        }))
        .filter(({ rank }) => rank > 0)
        .sort((a, b) => b.rank - a.rank)
        .map(({ tag }) => tag),
    [lowerQuery, tags],
  );
  const itemRefs = useRef<HTMLLIElement[]>([]);

  const hasExactMatch = useMemo(
    () =>
      filteredTags.length > 0 &&
      filteredTags[0].tagName.toLowerCase() === lowerQuery,
    [filteredTags, lowerQuery],
  );
  const options = useMemo(
    () =>
      hasExactMatch || query === ""
        ? filteredTags
        : [
            "通常タグを作成して追加",
            "お気に入りタグを作成して追加",
            ...filteredTags,
          ],
    [hasExactMatch, query, filteredTags],
  );

  useEffect(() => {
    // 選択中のアイテムにスクロールする
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({
        block: "nearest",
        behavior: "instant",
      });
    }
  }, [selectedIndex]);

  // 選択肢が選択されたときの処理
  const handleSelectItem = (item: Tag | string) => {
    if (typeof item === "string") {
      if (item === "通常タグを作成して追加") {
        onCreate(query, false);
      } else {
        onCreate(query, true);
      }
    } else {
      onSelect(item);
    }
    setQuery("");
  };

  // キーボード操作でリスト内を移動できるようにする
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const optionLength = options.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % optionLength);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + optionLength) % optionLength);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selectedItem = options[selectedIndex];
      handleSelectItem(selectedItem);
    }
  };

  return (
    <div className="w-full max-w-xl">
      {/* 入力欄 */}
      <div
        className={twMerge(
          "flex w-full items-center rounded-md border bg-card px-3",
          className,
        )}
      >
        <Search className="mr-2 size-4 shrink-0 opacity-50" />
        <input
          type="text"
          className="grow py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          placeholder={placeholder}
        />
      </div>
      {/* 選択候補 */}
      <div className="relative z-40 h-0 max-w-xl">
        {options.length > 0 && (
          <div
            className={twMerge(
              "visible absolute inset-x-0 top-2 z-10 translate-y-0 rounded-md border bg-card p-2 opacity-100 shadow-md transition-all duration-200",
              !isOpen && "invisible translate-y-2 opacity-0",
            )}
            onMouseDown={(e) => e.preventDefault()} // クリック時にonBlurが発火しないようにする
          >
            <ul className="max-h-36 overflow-auto">
              {options.map((option, index) => (
                <li
                  key={index}
                  ref={(node) => {
                    if (node) {
                      itemRefs.current[index] = node;
                    }
                  }}
                  className={twMerge(
                    "cursor-pointer rounded-md p-2 text-sm",
                    index === selectedIndex && "bg-accent",
                  )}
                  onMouseDown={() => setSelectedIndex(index)}
                  onClick={() => handleSelectItem(option)}
                >
                  {typeof option === "string" ? (
                    option === "通常タグを作成して追加" ? (
                      <div className="flex items-center gap-2">
                        <Plus className="size-4 text-muted-foreground" />
                        <span>{option}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Star className="size-4 text-muted-foreground" />
                        <span>{option}</span>
                      </div>
                    )
                  ) : option.isFavorite ? (
                    <div className="flex items-center justify-between gap-2">
                      <span>{option.tagName}</span>
                      <Star className="size-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <div>{option.tagName}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
