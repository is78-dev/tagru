import { deleteContentAction } from "@/actions/contentAction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  contentId: string;
  redirectUrl: string;
};

export default function DeleteContentDialog({ contentId, redirectUrl }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickDeleteButton = async (contentId: string) => {
    try {
      setLoading(true);
      await deleteContentAction(contentId);
      toast({
        variant: "default",
        title: "コンテンツを削除しました",
      });
      router.push(redirectUrl);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "エラー",
          description: error.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "エラー",
          description: "予期せぬエラーが発生しました",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive" className="bg-card">
          コンテンツを削除
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card sm:max-w-[425px]">
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
            onClick={() => handleClickDeleteButton(contentId)}
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
