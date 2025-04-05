import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import ContentUpdateFormFetcher from "./content-update-form-fetcher";

type Props = {
  contentId: string;
  children: ReactNode;
};

export default function ContentUpdateDialog({ contentId, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="block max-w-xl bg-card">
        <DialogHeader className="pb-4">
          <DialogTitle>コンテンツの編集</DialogTitle>
        </DialogHeader>
        <ContentUpdateFormFetcher contentId={contentId} />
      </DialogContent>
    </Dialog>
  );
}
