"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateContentFormSchema,
  UpdateContentFormType,
} from "@/types/zod-schema";
import { toast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";
import { Content, Tag } from "@/types/format";
import { createTagAction } from "@/actions/tagAction";
import { updateContentAction } from "@/actions/contentAction";
import { Textarea } from "@/components/ui/textarea";
import { useAllTags } from "@/context/all-tags-context";
import TagCarousel from "../tag-carousel/tag-carousel";
import TagSearchCreateBox from "../tag-search-create-box/tag-search-create-box";
import { useClientError } from "@/hooks/use-client-error";
import { useCurrentContent } from "@/context/current-content-context";

type Props = {
  content: Content;
  tags: Tag[];
  onClose: () => void;
};

export default function ContentUpdateForm({ content, tags, onClose }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreatingTag, setIsCreatingTag] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const selectedTagIds = useMemo(
    () => selectedTags.map((tag) => tag.tagId),
    [selectedTags],
  );
  const { allTags, refreshAllTags } = useAllTags();
  const { refreshCurrentContent } = useCurrentContent();
  const form = useForm<UpdateContentFormType>({
    resolver: zodResolver(updateContentFormSchema),
    defaultValues: {
      srcUrl: content.srcUrl,
      title: content.title,
      tags: [],
      note: content.note,
    },
  });
  const { clientErrorHandler } = useClientError();

  // フォーム送信
  const handleSubmitForm = async (values: UpdateContentFormType) => {
    try {
      setLoading(true);
      values.tags = selectedTags;
      await updateContentAction(content.contentId, values);
      toast({
        title: "コンテンツを更新しました",
      });
      if (values.srcUrl !== content.srcUrl) {
        window.location.reload();
      }
      onClose();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      refreshCurrentContent(content.contentId);
      setLoading(false);
    }
  };

  // タグ作成
  const handleCreateTag = async (tagName: string, isFavorite: boolean) => {
    try {
      setIsCreatingTag(true);
      setLoading(true);
      const createdTag = await createTagAction({
        tagName,
        isFavorite,
        note: "",
      });
      setSelectedTags((prev) => [createdTag, ...prev]);
      refreshAllTags();
      toast({ title: "タグを作成して追加しました" });
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
      setIsCreatingTag(false);
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="-mx-2 flex max-h-[80dvh] flex-col gap-4"
      >
        {/* フォームコンテンツ */}
        <div className="overflow-y-auto">
          <div className="m-2 flex flex-col gap-6">
            {/* URL */}
            <FormField
              control={form.control}
              name="srcUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="URLを入力"
                      className="bg-card"
                      {...field}
                      autoComplete="off"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* タイトル */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-card"
                      placeholder="タイトルを入力"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* タグ */}
            <FormItem>
              <FormLabel>タグ</FormLabel>
              <TagCarousel
                tags={selectedTags}
                onSelect={(tag) =>
                  setSelectedTags((prev) =>
                    prev.filter((t) => t.tagId !== tag.tagId),
                  )
                }
                loading={isCreatingTag}
              />
              <TagSearchCreateBox
                tags={allTags.filter(
                  (tag) => !selectedTagIds.includes(tag.tagId),
                )}
                onSelect={(tag) => setSelectedTags((prev) => [tag, ...prev])}
                onCreate={handleCreateTag}
                placeholder="追加または作成するタグ名を入力"
                className="rounded-lg"
              />
            </FormItem>
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
          </div>
        </div>
        {/* フォーム操作ボタン */}
        <div className="mx-2 flex justify-between">
          <Button
            variant="outline"
            type="button"
            className="bg-card"
            onClick={onClose}
            disabled={loading}
          >
            キャンセル
          </Button>

          <Button type="submit" disabled={loading}>
            保存
          </Button>
        </div>
      </form>
    </Form>
  );
}
