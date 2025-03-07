"use client";

import { getAllTagAction } from "@/actions/tagAction";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tag } from "@/types/format";
import {
  CreateContentFormType,
  updateContentFormSchema,
} from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  initTags: Tag[];
};

export default function CreateContentForm({ className = "", initTags }: Props) {
  const [mode, setMode] = useState<"find" | "edit">("find");
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const { toast } = useToast();

  const form = useForm<CreateContentFormType>({
    resolver: zodResolver(updateContentFormSchema),
    defaultValues: {
      srcUrl: "",
      title: "",
      tags: initTags,
      note: "",
    },
  });

  // 初回レンダリング後に全てのタグを取得
  useEffect(() => {
    (async () => {
      try {
        const allTagData = await getAllTagAction();
        setAllTags(allTagData);
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
      }
    })();
  }, []);

  const handleFormSubmit = async (data: CreateContentFormType) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={twMerge("space-y-4", className)}
      >
        <FormField
          control={form.control}
          name="srcUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="URLを入力" className="bg-card" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input
                  placeholder="タイトルを入力"
                  className="bg-card"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メモ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="メモを入力"
                  className="min-h-[150px] resize-none bg-card"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* フォーム操作ボタン */}
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              キャンセル
            </Button>
          </DialogClose>
          <Button>作成</Button>
        </div>
      </form>
    </Form>
  );
}
