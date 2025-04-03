"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useClientError } from "@/hooks/use-client-error";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  initialText: string;
  onSave: (text: string) => Promise<void>;
};

export default function NoteTextArea({ initialText, onSave }: Props) {
  const { toast } = useToast();
  const [noteText, setNoteText] = useState<string>(initialText);
  const [beforeText, setBeforeText] = useState<string>(initialText);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { clientErrorHandler } = useClientError();

  useEffect(() => {}, [initialText]);

  const handleClickSave = async () => {
    try {
      setIsSubmitting(true);
      await onSave(noteText);
      setBeforeText(noteText);
      toast({
        title: "保存しました",
      });
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative h-full">
      <Textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="メモを入力"
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
