import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p- grid min-h-dvh place-items-center bg-muted">
      <div className="max-w-md space-y-6 rounded-xl border bg-background p-8 shadow">
        <h1 className="text-3xl font-bold">404 Page Not Found</h1>
        <p className="text-muted-foreground">
          このページはすでに削除されているか、URLが間違っている可能性があります。
        </p>
        <Button asChild variant="link" className="px-0">
          <Link href="/">トップに戻る</Link>
        </Button>
      </div>
    </main>
  );
}
