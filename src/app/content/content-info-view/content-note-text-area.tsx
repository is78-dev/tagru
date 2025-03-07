"use client";
import { Content } from "@/types/format";
import NoteTextArea from "@/components/element/note-text-area";
import { updateContentNoteAction } from "@/actions/contentAction";
import { Dispatch } from "react";

type Props = {
  content: Content;
  setLoading: Dispatch<boolean>;
};

export default function ContentNoteTextArea({ content, setLoading }: Props) {
  const handleClickSaveButton = async (text: string) => {
    setLoading(true);
    await updateContentNoteAction(content.contentId, text);
    setLoading(false);
  };

  return (
    <NoteTextArea
      key={content.contentId}
      initText={content.note}
      handleClickSaveButton={handleClickSaveButton}
    />
  );
}
