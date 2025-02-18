"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTagFormSchema as formSchema } from "@/types/zod-schema";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createTagAction } from "@/actions/tagAction";
import { Card } from "@/components/ui/card";

export default function CreateTagForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { tagName: "", isFavorite: false },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await createTagAction(values);
      form.reset();
      toast({
        title: "タグの作成に成功しました",
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

  return (
    <Card className="max-w-2xl p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* タグ名 */}
          <FormField
            control={form.control}
            name="tagName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タグ名</FormLabel>
                <FormControl>
                  <Input placeholder="タグ名を入力" {...field} />
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
              <FormItem className="flex items-center justify-between gap-4 rounded-xl border p-4">
                <div
                  onClick={() => field.onChange(!field.value)}
                  className="flex-1"
                >
                  <FormLabel>お気に入り</FormLabel>
                  <FormDescription>
                    お気に入りのタグは優先的に表示されます
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
          <div className="flex justify-between">
            <Button onClick={() => {}} type="button" variant="outline">
              キャンセル
            </Button>
            <Button type="submit" disabled={loading}>
              作成
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
