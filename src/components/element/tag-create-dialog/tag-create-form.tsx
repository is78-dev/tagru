"use client";

import { createTagAction } from "@/actions/tagAction";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createTagFormSchema, CreateTagFormType } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAllTags } from "@/context/all-tags-context";
import { Switch } from "@/components/ui/switch";
import { useClientError } from "@/hooks/use-client-error";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  onClose: () => void;
};

export default function TagCreateForm({ onClose }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { allTags, refreshAllTags } = useAllTags();
  const { clientErrorHandler } = useClientError();
  const form = useForm<CreateTagFormType>({
    resolver: zodResolver(createTagFormSchema),
    defaultValues: {
      tagName: "",
      isFavorite: false,
      note: "",
    },
  });

  // フォーム送信
  const handleSubmitForm = async (data: CreateTagFormType) => {
    // タグ名が重複している場合はエラー
    if (!allTags.every((tag) => tag.tagName !== data.tagName)) {
      form.setError("tagName", {
        type: "manual",
        message: "同名のタグが既に存在します",
      });
      return;
    }

    try {
      setLoading(true);
      await createTagAction(data);
      toast({
        variant: "default",
        title: "タグを作成しました",
      });
      refreshAllTags();
      onClose();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      form.clearErrors("tagName");
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-6"
      >
        {/* タグ名 */}
        <FormField
          control={form.control}
          name="tagName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タグ名</FormLabel>
              <FormControl>
                <Input
                  placeholder="タグ名を入力"
                  className="bg-card"
                  {...field}
                  autoComplete="off"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* お気に入り */}
        <FormField
          control={form.control}
          name="isFavorite"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-2 rounded-xl">
              <div
                onClick={() => field.onChange(!field.value)}
                className="flex grow flex-col gap-2"
              >
                <FormLabel>お気に入り</FormLabel>
                <FormDescription>
                  お気に入りのタグはハイライトされます
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="block"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* メモ */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メモ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="メモを入力"
                  className="h-[150px] resize-none bg-card"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* フォーム操作ボタン */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            className="bg-card"
            onClick={onClose}
          >
            キャンセル
          </Button>
          <Button>作成</Button>
        </div>
      </form>
    </Form>
  );
}
