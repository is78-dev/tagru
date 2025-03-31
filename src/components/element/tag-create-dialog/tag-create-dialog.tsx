"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import TagCreateForm from "./tag-create-form";

type Props = {
  children: ReactNode;
};

export default function TagCreateDialog({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="block max-w-xl bg-card">
        <DialogHeader className="pb-4">
          <DialogTitle>タグの作成</DialogTitle>
        </DialogHeader>
        <TagCreateForm onFormClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
