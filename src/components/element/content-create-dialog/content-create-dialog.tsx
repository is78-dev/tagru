"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContentCreateForm from "./content-create-form";
import { Tag } from "@/types/format";
import { ReactNode, useState } from "react";

type Props = {
  initialTags?: Tag[];
  children: ReactNode;
};

export default function ContentCreateDialog({
  initialTags = [],
  children,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="block max-w-xl bg-card">
        <DialogHeader className="pb-4">
          <DialogTitle>コンテンツの追加</DialogTitle>
        </DialogHeader>
        <ContentCreateForm
          initialTags={initialTags}
          onFormClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
