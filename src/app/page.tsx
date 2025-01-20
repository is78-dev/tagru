import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="grid min-h-dvh place-items-center p-4">
      <div className="max-w-md space-y-6 rounded-xl border p-8 shadow">
        <h1 className="text-3xl font-bold">Tagru</h1>
        <p className="text-muted-foreground">
          Tagruは動画などweb上のお気に入りのコンテンツをタグ付けして管理するサービスです。
        </p>
        <Button asChild variant="link" className="px-0">
          <Link href="/login">ログインページへ</Link>
        </Button>
      </div>
    </main>
  );
}
