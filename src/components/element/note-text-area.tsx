"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  initText?: string;
  handleClickSaveButton: (text: string) => Promise<void>;
};

export default function NoteTextArea({
  initText = "",
  handleClickSaveButton,
}: Props) {
  const { toast } = useToast();
  const [noteText, setNoteText] = useState<string>(initText);
  const [beforeText, setBeforeText] = useState<string>(initText);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClickSave = async () => {
    try {
      setIsSubmitting(true);
      await handleClickSaveButton(noteText);
      setBeforeText(noteText);
      toast({
        title: "保存しました",
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
          description: "予期せぬエラーが発生しました",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-full">
      <Textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="メモ"
        className="h-full resize-none bg-card"
      />
      <Button
        onClick={handleClickSave}
        disabled={isSubmitting}
        className={twMerge(
          "visible absolute bottom-2 right-3 translate-y-0 opacity-100 transition-all duration-200",
          noteText === beforeText && "invisible translate-y-4 opacity-0",
        )}
      >
        {isSubmitting ? "保存中" : "変更を保存"}
      </Button>
    </div>
  );
}
