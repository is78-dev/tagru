"use client";

import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateContentForm from "./create-content-form";
import { Tag } from "@/types/format";
import { Button } from "@/components/ui/button";

type Props = {
  initTags: Tag[];
};

export default function CreateContentButton({ initTags }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} />
          コンテンツを追加
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-xl bg-card"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>コンテンツの追加</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80dvh]">
          <CreateContentForm initTags={initTags} className="" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
