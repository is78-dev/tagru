import { Button } from "@/components/ui/button";
import { ArrowRight, Network, NotebookPen, Tag } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <section className="flex flex-col items-center py-16 sm:py-40">
        <h1 className="mb-3 text-4xl font-extrabold">Organize with tags.</h1>
        <p className="mb-8 text-muted-foreground">
          TagruはYouTube上の動画にタグをつけて管理できるオンラインサービスです。
          <br />
          動画ごとのメモや、タグの階層化により、自分だけの動画データベースを作成できます。
        </p>
        <Button className="rounded-full p-4 px-6 text-lg" asChild>
          <Link href="/login">
            ログイン
            <ArrowRight className="size-5" />
          </Link>
        </Button>
      </section>

      <section className="flex flex-wrap justify-center gap-10">
        <div className="w-80 rounded-md border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">
            <Tag className="mr-2 inline-block size-5" />
            タグで分類
          </h2>
          <p className="text-muted-foreground">
            動画に自由なタグを付けて、
            <br />
            自分だけのルールで分類できます。
          </p>
        </div>
        <div className="w-80 rounded-md border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">
            <NotebookPen className="mr-2 inline-block size-5" />
            メモを残せる
          </h2>
          <p className="text-muted-foreground">
            動画やタグにメモを追加して、
            <br />
            内容を補足できます。
          </p>
        </div>
        <div className="w-80 rounded-md border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">
            <Network className="mr-2 inline-block size-5" />
            親子タグで階層管理
          </h2>
          <p className="text-muted-foreground">
            タグに親子関係を設定できるので、
            <br />
            タグ同士のリンクが可能です。
          </p>
        </div>
      </section>
    </div>
  );
}
