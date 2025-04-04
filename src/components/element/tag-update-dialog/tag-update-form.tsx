"use client";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAllTags } from "@/context/all-tags-context";
import { useClientError } from "@/hooks/use-client-error";
import { Tag } from "@/types/format";
import { updateTagFormSchema, UpdateTagFormType } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import TagCarousel from "../tag-carousel/tag-carousel";
import TagSearchCreateBox from "../tag-search-create-box/tag-search-create-box";
import { createTagAction, updateRelativeTagAction } from "@/actions/tagAction";
import { toast } from "@/hooks/use-toast";
import { useCurrentTag } from "@/context/curent-tag-context";

type Props = {
  currentTag: Tag;
  currentParentTags: Tag[];
  currentChildTags: Tag[];
  onClose: () => void;
};

export default function TagUpdateForm({
  currentTag,
  currentParentTags,
  currentChildTags,
  onClose,
}: Props) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [creatingParentTag, setCreatingParentTag] = useState<boolean>(false);
  const [creatingChildTag, setCreatingChildTag] = useState<boolean>(false);
  const [selectedParentTags, setSelectedParentTags] =
    useState<Tag[]>(currentParentTags);
  const [selectedChildTags, setSelectedChildTags] =
    useState<Tag[]>(currentChildTags);
  const selectedParentTagIds = useMemo(
    () => selectedParentTags.map((tag) => tag.tagId),
    [selectedParentTags],
  );
  const { refreshCurrentTag } = useCurrentTag();
  const { allTags, refreshAllTags } = useAllTags();
  const { clientErrorHandler } = useClientError();
  const form = useForm<UpdateTagFormType>({
    resolver: zodResolver(updateTagFormSchema),
    defaultValues: {
      tagName: currentTag.tagName,
      isFavorite: currentTag.isFavorite,
      note: currentTag.note,
      parentTagIds: [],
      childTagIds: [],
    },
  });
  const selectedChildTagIds = useMemo(
    () => selectedChildTags.map((tag) => tag.tagId),
    [selectedChildTags],
  );

  // フォーム送信
  const handleSubmit = async (data: UpdateTagFormType) => {
    try {
      setSubmitting(true);
      data.parentTagIds = selectedParentTagIds;
      data.childTagIds = selectedChildTagIds;
      await updateRelativeTagAction(currentTag.tagId, data);
      toast({
        title: "タグデータを更新しました",
      });
      onClose();
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      refreshCurrentTag(currentTag.tagId);
      refreshAllTags();
      setSubmitting(false);
    }
  };

  // タグ作成
  const handleCreateTag = async (
    tagName: string,
    isFavorite: boolean,
    isParent: boolean,
  ) => {
    try {
      if (isParent) {
        setCreatingParentTag(true);
      } else {
        setCreatingChildTag(true);
      }
      const createdTag = await createTagAction({
        tagName,
        isFavorite,
        note: "",
      });
      setSelectedParentTags((prev) => [createdTag, ...prev]);
      refreshAllTags();
      toast({ title: "タグを作成して追加しました" });
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      if (isParent) {
        setCreatingParentTag(false);
      } else {
        setCreatingChildTag(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="-mx-2 flex max-h-[80dvh] flex-col gap-4"
      >
        <div className="overflow-y-auto">
          <div className="flex flex-col gap-6 p-2">
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
                      autoComplete="off"
                      {...field}
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
                <FormItem className="flex items-center justify-between gap-2">
                  <div
                    onClick={() => field.onChange(!field.value)}
                    className="grow space-y-1"
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
            {/* 親タグ */}
            <FormItem>
              <FormLabel>親タグ</FormLabel>
              <TagCarousel
                tags={selectedParentTags}
                onSelect={(tag) =>
                  setSelectedParentTags((prev) =>
                    prev.filter((t) => t.tagId !== tag.tagId),
                  )
                }
                loading={creatingParentTag}
              />
              <TagSearchCreateBox
                tags={allTags.filter(
                  (tag) =>
                    !selectedParentTagIds.includes(tag.tagId) &&
                    tag.tagId !== currentTag.tagId,
                )}
                onSelect={(tag) =>
                  setSelectedParentTags((prev) => [tag, ...prev])
                }
                onCreate={(tagName, isFavorite) =>
                  handleCreateTag(tagName, isFavorite, true)
                }
                placeholder="追加または作成するタグ名を入力"
                className="rounded-lg"
              />
            </FormItem>
            {/* 子タグ */}
            <FormItem>
              <FormLabel>子タグ</FormLabel>
              <TagCarousel
                tags={selectedChildTags}
                onSelect={(tag) =>
                  setSelectedChildTags((prev) =>
                    prev.filter((t) => t.tagId !== tag.tagId),
                  )
                }
                loading={creatingChildTag}
              />
              <TagSearchCreateBox
                tags={allTags.filter(
                  (tag) =>
                    !selectedChildTagIds.includes(tag.tagId) &&
                    tag.tagId !== currentTag.tagId,
                )}
                onSelect={(tag) =>
                  setSelectedChildTags((prev) => [tag, ...prev])
                }
                onCreate={(tagName, isFavorite) =>
                  handleCreateTag(tagName, isFavorite, false)
                }
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
            disabled={submitting || creatingParentTag || creatingChildTag}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            disabled={submitting || creatingParentTag || creatingChildTag}
          >
            保存
          </Button>
        </div>
      </form>
    </Form>
  );
}
