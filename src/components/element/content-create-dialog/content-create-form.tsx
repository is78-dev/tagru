"use client";

import { createTagAction } from "@/actions/tagAction";
import { getYoutubeVideoTitleAction } from "@/actions/youtubeActions";
import { Button } from "@/components/ui/button";
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
import { extractYoutubeVideoId } from "@/utils/common/extractYoutubeVideoId";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createYoutubeContentAction } from "@/actions/contentAction";
import { useAllTags } from "@/context/all-tags-context";
import TagCarousel from "../tag-carousel/tag-carousel";
import TagSearchCreateBox from "../tag-search-create-box/tag-search-create-box";

type Props = {
  initialTags: Tag[];
  onFormClose: () => void;
};

export default function ContentCreateForm({ initialTags, onFormClose }: Props) {
  const [mode, setMode] = useState<"found" | "edit">("found");
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreatingTag, setIsCreatingTag] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialTags);
  const selectedTagIds = useMemo(
    () => selectedTags.map((tag) => tag.tagId),
    [selectedTags],
  );
  const { allTags, refreshAllTags } = useAllTags();
  const { toast } = useToast();
  const form = useForm<CreateContentFormType>({
    resolver: zodResolver(updateContentFormSchema),
    defaultValues: {
      srcUrl: "",
      title: "",
      tags: [],
      note: "",
    },
  });

  // 次へボタンをクリック
  const handleClickNextButton = async () => {
    const url = form.getValues("srcUrl");
    if (!url) {
      // urlが空文字列の場合
      form.setError("srcUrl", { type: "manual", message: "URLは必須です" });
      return;
    }

    const videoId = extractYoutubeVideoId(url);
    if (!videoId) {
      // videoIdの抽出に失敗した場合
      form.setError("srcUrl", {
        type: "manual",
        message: "無効なYouTube URLです",
      });
      return;
    }

    setLoading(true);
    const title = await getYoutubeVideoTitleAction(videoId);
    if (!title) {
      // タイトルの取得に失敗した場合
      form.setError("srcUrl", {
        type: "manual",
        message: "動画が見つかりませんでした",
      });
      setLoading(false);
      return;
    }

    form.clearErrors("srcUrl");
    form.setValue("title", title);
    setMode("edit");
    setLoading(false);
  };

  // 戻るボタンをクリック
  const handleClickBackButton = () => {
    const srcUrl = form.getValues("srcUrl");
    form.reset();
    form.setValue("srcUrl", srcUrl);
    setSelectedTags(initialTags);
    setMode("found");
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

  // フォーム送信
  const handleSubmitForm = async (data: CreateContentFormType) => {
    try {
      setLoading(true);
      data.tags = selectedTags;
      await createYoutubeContentAction(data);
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="-mx-2 flex max-h-[80dvh] flex-col gap-4"
      >
        {/* フォームコンテンツ */}
        <div className="overflow-y-auto">
          <div className="m-2 flex flex-col gap-6">
            {/* コンテンツURL */}
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
                      disabled={mode === "edit" || loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === "edit" && (
              <>
                {/* 確認用動画埋め込み */}
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${extractYoutubeVideoId(form.getValues("srcUrl"))}?rel=0`}
                  className="aspect-video w-full rounded-md outline outline-1 outline-border"
                  allowFullScreen
                ></iframe>
                {/* タイトル */}
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
                    onSelect={(tag) =>
                      setSelectedTags((prev) => [tag, ...prev])
                    }
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
              </>
            )}
          </div>
        </div>
        {/* フォーム操作ボタン */}
        <div className="mx-2 flex justify-between">
          <Button
            variant="outline"
            type="button"
            className="bg-card"
            onClick={onFormClose}
            disabled={loading}
          >
            キャンセル
          </Button>
          {mode === "found" ? (
            <Button
              type="button"
              onClick={handleClickNextButton}
              disabled={loading}
            >
              次へ
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClickBackButton}
                disabled={loading}
              >
                戻る
              </Button>
              <Button disabled={loading}>作成</Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
