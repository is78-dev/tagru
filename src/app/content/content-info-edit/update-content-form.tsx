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
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Content, Tag } from "@/types/format";
import { createTagAction, getAllTagAction } from "@/actions/tagAction";
import { updateContentAction } from "@/actions/contentAction";
import SearchTagCommand from "@/app/home/search-tag-command";
import { Textarea } from "@/components/ui/textarea";
import DeleteContentDialog from "./delete-content-dialog";
import SelectedTagList from "@/app/home/selected-tag-list";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

type Props = {
  initContent: Content;
  initTags: Tag[];
  currentTag: Tag;
  closeDialog: () => void;
};

export default function UpdateContentForm({
  initContent,
  initTags,
  currentTag,
  closeDialog,
}: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreatingTag, setIsCreatingTag] = useState<boolean>(false);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initTags);
  const selectedTagIds = selectedTags.map((tag) => tag.tagId);

  const form = useForm<UpdateContentFormType>({
    resolver: zodResolver(updateContentFormSchema),
    defaultValues: {
      srcUrl: initContent.srcUrl,
      title: initContent.title,
      tags: initTags,
      note: initContent.note,
    },
  });

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

  const handleSubmitForm = async (values: UpdateContentFormType) => {
    values.tags = selectedTags;
    setLoading(true);
    try {
      await updateContentAction(initContent.contentId, values);
      toast({
        title: "コンテンツを更新しました",
      });
      closeDialog();
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
      setLoading(false);
    }
  };

  const appendSelectedTag = (tag: Tag) => {
    if (!selectedTagIds.includes(tag.tagId)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const createTag = async (tagName: string, isFavorite: boolean) => {
    setIsCreatingTag(true);
    setLoading(true);
    try {
      const createdTagData = await createTagAction({ tagName, isFavorite });
      appendSelectedTag(createdTagData);
      setAllTags((prev) => [...prev, createdTagData]);
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
        className="absolute inset-0 flex size-full flex-col gap-5"
      >
        <div className="-mx-2 grow overflow-y-auto">
          <div className="mx-2 flex h-full flex-col gap-5">
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
              <div>
                <SelectedTagList
                  tags={selectedTags}
                  handleSelectTag={(tag) =>
                    setSelectedTags((prev) =>
                      prev.filter((t) => t.tagId !== tag.tagId),
                    )
                  }
                  isCreatingTag={isCreatingTag}
                />
                <SearchTagCommand
                  tags={allTags.filter(
                    (tag) => !selectedTagIds.includes(tag.tagId),
                  )}
                  handleSelectTag={appendSelectedTag}
                  handleCreateTag={createTag}
                  placeholder="追加または作成するタグを入力"
                />
              </div>
            </FormItem>
            {/* メモ */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="flex grow flex-col pb-1">
                  <FormLabel>メモ</FormLabel>
                  <FormControl>
                    <Textarea
                      className="grow resize-none bg-card"
                      placeholder="メモを入力"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* URL */}
            <FormField
              control={form.control}
              name="srcUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-card"
                      placeholder="URLを入力"
                      {...field}
                      autoComplete="off"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* コンテンツ削除ボタン */}
            <DeleteContentDialog
              contentId={initContent.contentId}
              redirectUrl={`/tag?t=${currentTag.tagId}`}
            />
          </div>
        </div>
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
          <Button type="submit" disabled={loading}>
            保存
          </Button>
        </div>
      </form>
    </Form>
  );
}
