"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-muted p-4">
      <div className="max-w-md space-y-6 rounded-xl border bg-background p-8 shadow">
        <h1 className="text-3xl font-bold">Error</h1>
        <p className="text-sm text-destructive">{error.message}</p>
        <p className="text-muted-foreground">
          エラーが発生しました。もう一度お試しください。
        </p>
        <Button asChild variant="link" className="px-0">
          <Link href="/">トップに戻る</Link>
        </Button>
      </div>
    </main>
  );
}
