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
import { useToast } from "@/hooks/use-toast";
import { createTagFormSchema, CreateTagFormType } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAllTags } from "@/context/all-tags-context";
import { Switch } from "@/components/ui/switch";

type Props = {
  onFormClose: () => void;
};

export default function TagCreateForm({ onFormClose }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { allTags } = useAllTags();
  const { toast } = useToast();
  const form = useForm<CreateTagFormType>({
    resolver: zodResolver(createTagFormSchema),
    defaultValues: {
      tagName: "",
      isFavorite: false,
    },
  });

  // フォーム送信
  const handleSubmitForm = async (data: CreateTagFormType) => {
    // タグ名が重複している場合はエラー
    if (!allTags.every((tag) => tag.tagName !== data.tagName)) {
      form.setError("tagName", {
        type: "manual",
        message: "タグ名が重複しています",
      });
      return;
    }

    try {
      setLoading(true);
      await createTagAction(data);
      window.location.reload();
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
        {/* フォーム操作ボタン */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            className="bg-card"
            onClick={onFormClose}
          >
            キャンセル
          </Button>
          <Button>作成</Button>
        </div>
      </form>
    </Form>
  );
}
