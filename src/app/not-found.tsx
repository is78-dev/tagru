import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <h1 className="text-2xl font-bold">お探しのページが見つかりません。</h1>
      <Button variant="ghost">
        <Link href="/" prefetch={false}>
          トップページへ戻る
        </Link>
      </Button>
    </div>
  );
}
