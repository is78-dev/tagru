"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  const handleBackToHome = () => router.push("/");
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <h1 className="text-2xl font-bold">エラーが発生しました。</h1>
      <p className="text-muted-foreground">{error.message}</p>
      <Button variant="ghost" onClick={handleBackToHome}>
        トップページへ戻る
      </Button>
    </div>
  );
}
