"use client";

import { getAllTagAction } from "@/actions/tagAction";
import { getYoutubeVideoTitleAction } from "@/actions/youtubeActions";
import SearchTagCommand from "@/app/home/search-tag-command";
import SelectedTagList from "@/app/home/selected-tag-list";
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
import { extractYoutubeVideoId } from "@/utils/common/extractYoutubeVideoId";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  initTags: Tag[];
};

export default function CreateContentForm({ initTags }: Props) {
  const [mode, setMode] = useState<"found" | "edit">("found");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    initTags.map((tag) => tag.tagId),
  );
  const [allTags, setAllTags] = useState<Tag[]>([]);
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

  // 次へボタンをクリックしたときに実行される関数
  const handleClickNextButton = async () => {
    console.log("aaaa");
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

  // 戻るボタンをクリックしたときに実行される関数
  const handleClickPrevButton = () => {
    const srcUrl = form.getValues("srcUrl");
    form.reset();
    form.setValue("srcUrl", srcUrl);
    setSelectedTagIds(initTags.map((tag) => tag.tagId));
    setMode("found");
  };

  // フォームが送信されたときに実行される関数
  const handleSubmitForm = async (data: CreateContentFormType) => {
    // 送信データに選択中のタグを代入
    data.tags = allTags.filter((tag) => selectedTagIds.includes(tag.tagId));
    console.log(data);
  };

  // タグの作成時に実行される関数
  const handleCreateTag = async () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="-mx-2 flex max-h-[80dvh] flex-col gap-4"
      >
        {/* フォームコンテンツ */}
        <div className="overflow-y-auto">
          <div className="m-2 flex flex-col gap-4">
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
                  className="aspect-video w-full rounded-md"
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
                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem className="space-y-1">
                      <FormLabel>タグ</FormLabel>
                      <SelectedTagList
                        tags={allTags.filter((tag) =>
                          selectedTagIds.includes(tag.tagId),
                        )}
                        handleSelectTag={(tag) =>
                          setSelectedTagIds((prev) =>
                            prev.filter((tid) => tid !== tag.tagId),
                          )
                        }
                        isCreatingTag={loading}
                      />
                      <SearchTagCommand
                        tags={allTags.filter(
                          (tag) => !selectedTagIds.includes(tag.tagId),
                        )}
                        handleSelectTag={(tag) =>
                          setSelectedTagIds((prev) => [...prev, tag.tagId])
                        }
                        handleCreateTag={handleCreateTag}
                        placeholder="追加または作成するタグを入力"
                      />
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
              </>
            )}
          </div>
        </div>
        {/* フォーム操作ボタン */}
        <div className="mx-2 flex justify-between">
          <DialogClose asChild>
            <Button variant="outline" type="button" className="bg-card">
              キャンセル
            </Button>
          </DialogClose>
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
                onClick={handleClickPrevButton}
              >
                戻る
              </Button>
              <Button>作成</Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
