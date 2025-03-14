import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  items: string[];
  onItemCreate: (query: string) => void;
  onItemSelect: (item: string) => void;
};

export default function Combobox({
  items,
  onItemCreate,
  onItemSelect,
  className,
  ...inputProps
}: Props) {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>(items);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const lowerQuery = query.toLowerCase();

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (listRef.current && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    // クエリに基づいてアイテムをランク付けし、フィルタリング
    const rankedItems = items
      .map((item) => ({
        item,
        rank:
          item.toLowerCase() === lowerQuery
            ? 3
            : item.toLowerCase().startsWith(lowerQuery)
              ? 2
              : item.toLowerCase().includes(lowerQuery)
                ? 1
                : 0,
      }))
      .filter(({ rank }) => rank > 0)
      .sort((a, b) => b.rank - a.rank)
      .map(({ item }) => item);

    setFilteredItems(rankedItems);
    setSelectedIndex(0);
  }, [query, items]);

  const hasExactMatch =
    filteredItems.length > 0 && filteredItems[0].toLowerCase() === lowerQuery;
  const options =
    hasExactMatch || query === ""
      ? filteredItems
      : [`「${query}」を新規作成`, ...filteredItems];

  // キーボード操作でリスト内を移動できるようにする
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (options.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      const selectedItem = options[selectedIndex];
      if (selectedItem === `「${query}」を新規作成`) {
        onItemCreate(query);
      } else {
        onItemSelect(selectedItem);
      }
      setQuery("");
      setFilteredItems(items);
      setSelectedIndex(0);
    }
  };

  return (
    <div className={twMerge("w-full", className)}>
      <div className="flex w-full items-center rounded-md border px-3">
        <Search className="mr-2 size-4 shrink-0 opacity-50" />
        <input
          type="text"
          className="grow py-3 text-sm outline-none disabled:cursor-not-allowed disabled:bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          {...inputProps}
        />
      </div>
      <div className="relative h-0">
        <ul
          ref={listRef}
          className={twMerge(
            "visible absolute inset-x-0 top-2 z-10 max-h-80 translate-y-0 overflow-auto rounded-md border p-2 opacity-100 transition-all duration-200",
            className,
            !isOpen && "invisible translate-y-2 opacity-0",
          )}
          onMouseDown={(e) => e.preventDefault()} // クリック時にonBlurが発火しないようにする
        >
          {options.map((item, index) => (
            <li
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={twMerge(
                "cursor-pointer rounded-md p-2",
                index === selectedIndex && "bg-accent",
              )}
              onMouseEnter={() => setSelectedIndex(index)}
              onMouseDown={() => {
                if (item === `「${query}」を新規作成`) {
                  onItemCreate(query);
                } else {
                  onItemSelect(item);
                }
                setQuery("");
                setFilteredItems(items);
                setSelectedIndex(0);
                setIsOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
