import { Content } from "@/types/format";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  content: Content;
  href: string;
  disabled?: boolean;
};

export default function ContentCard({
  content,
  href,
  disabled = false,
}: Props) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={twMerge(
        "group/card flex flex-col gap-2",
        disabled && "pointer-events-none",
      )}
    >
      {/* サムネイル */}
      <div className="aspect-video w-full overflow-hidden rounded-md outline outline-1 outline-border">
        <img
          src={content.thumbnailUrl}
          className={twMerge(
            "size-full object-cover transition-all duration-150 group-hover/card:scale-105",
            disabled && "brightness-50",
          )}
        />
      </div>
      {/* タイトル */}
      <div className="block overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium">
        {content.title}
      </div>
    </Link>
  );
}
