"use client";

import { deleteContentAction } from "@/actions/contentAction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useClientError } from "@/hooks/use-client-error";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

type Props = {
  contentId: string;
  redirectUrl: string;
  children: ReactNode;
};

export default function ContentDeleteDialog({
  contentId,
  redirectUrl,
  children,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { clientErrorHandler } = useClientError();

  const handleDelete = async (contentId: string) => {
    try {
      setLoading(true);
      await deleteContentAction(contentId);
      toast({
        variant: "default",
        title: "コンテンツを削除しました",
      });
      router.push(redirectUrl);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl bg-card">
        <DialogHeader>
          <DialogTitle>コンテンツの削除</DialogTitle>
          <DialogDescription>
            コンテンツを削除しますか？ この操作は元に戻せません。
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              disabled={loading}
              className="bg-card"
            >
              キャンセル
            </Button>
          </DialogClose>
          <Button
            onClick={() => handleDelete(contentId)}
            variant="destructive"
            type="button"
            disabled={loading}
          >
            削除
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
