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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContentFormSchema as formSchema } from "@/types/zod-schema";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getYoutubeVideoTitle } from "@/actions/youtubeActions";
import { extractYoutubeVideoId } from "@/utils/common/extractYoutubeVideoId";
import { Tag } from "@/types/format";
import { createTagAction, getAllTagAction } from "@/actions/tagAction";
import SearchTagCommand from "./search-tag-command";
import SelectedTagCarousel from "./selected-tag-carousel";
import { createYoutubeContentAction } from "@/actions/contentAction";

export default function CreateContentForm() {
  const { toast } = useToast();
  const [step, setStep] = useState<"find" | "edit">("find");
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreatingTag, setIsCreatingTag] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      srcUrl: "",
      title: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (step === "edit") {
      (async () => {
        try {
          const data = await getAllTagAction();
          setTags(data);
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
              description: "予期しないエラーが発生しました",
            });
          }
        }
      })();
    }
  }, [step]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.tags = selectedTags;

    try {
      setLoading(true);
      await createYoutubeContentAction(values);
      setStep("find");
      setSelectedTags([]);
      form.reset();
      toast({
        title: "コンテンツの追加に成功しました",
      });
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
          description: "予期しないエラーが発生しました",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    const url = form.getValues("srcUrl");
    if (!url) {
      form.setError("srcUrl", { type: "manual", message: "URLは必須です" });
      return;
    }

    const videoId = extractYoutubeVideoId(url);
    if (!videoId) {
      form.setError("srcUrl", {
        type: "manual",
        message: "無効なYouTube URLです",
      });
      return;
    }

    setLoading(true);

    const title = await getYoutubeVideoTitle(videoId);
    if (title) {
      form.clearErrors("srcUrl");
      form.setValue("title", title);
      setStep("edit");
    } else {
      form.setError("srcUrl", {
        type: "manual",
        message: "動画が見つかりませんでした",
      });
    }

    setLoading(false);
  };

  const backStep = () => {
    form.setValue("title", "");
    form.setValue("tags", []);
    setSelectedTags([]);
    setStep("find");
  };

  const appendTag = (tag: Tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const removeTag = (tag: Tag) => {
    setSelectedTags((prev) => prev.filter((t) => t.tagId !== tag.tagId));
  };

  const createTag = async (tagName: string, isFavorite: boolean) => {
    try {
      setIsCreatingTag(true);
      setLoading(true);
      const createdTagData = await createTagAction({ tagName, isFavorite });
      appendTag(createdTagData);
      setTags((prev) => [...prev, createdTagData]);
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
          description: "予期しないエラーが発生しました",
        });
      }
    } finally {
      setIsCreatingTag(false);
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    {...field}
                    autoComplete="off"
                    disabled={step === "edit"}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {step === "edit" && (
            <>
              {/* 動画 */}
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
                      <Input placeholder="タイトルを入力" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* タグ */}
              <FormItem>
                <FormLabel>タグ</FormLabel>
                <SelectedTagCarousel
                  tags={selectedTags}
                  handleSelectTag={removeTag}
                  isCreatingTag={isCreatingTag}
                />
                <SearchTagCommand
                  tags={tags.filter((tag) => !selectedTags.includes(tag))}
                  handleSelectTag={appendTag}
                  handleCreateTag={createTag}
                />
              </FormItem>
            </>
          )}
          {/* フォーム操作ボタン */}
          <div className="flex justify-between">
            <Button onClick={() => {}} type="button" variant="outline">
              キャンセル
            </Button>
            {step === "find" ? (
              <Button onClick={nextStep} disabled={loading} type="button">
                次へ
              </Button>
            ) : (
              <div className="space-x-4">
                <Button onClick={backStep} type="button" variant="secondary">
                  戻る
                </Button>
                <Button type="submit" disabled={loading}>
                  作成
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}
