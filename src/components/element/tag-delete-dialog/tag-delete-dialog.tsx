"use client";

import { deleteTagAction } from "@/actions/tagAction";
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
  tagId: string;
  redirectUrl: string;
  children: ReactNode;
};

export default function TagDeleteDialog({
  tagId,
  redirectUrl,
  children,
}: Props) {
  const router = useRouter();
  const { clientErrorHandler } = useClientError();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteTag = async (tagId: string) => {
    try {
      setLoading(true);
      await deleteTagAction(tagId);
      toast({
        variant: "default",
        title: "タグを削除しました",
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
          <DialogTitle>タグの削除</DialogTitle>
          <DialogDescription>
            タグを削除しますか？ この操作は元に戻せません。
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
            onClick={() => handleDeleteTag(tagId)}
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
