"use client";
import { Content } from "@/types/format";
import NoteTextArea from "@/components/element/note-text-area";
import { updateContentNoteAction } from "@/actions/contentAction";
import { Dispatch } from "react";
import { useCurrentContent } from "@/context/current-content-context";

type Props = {
  content: Content;
  setLoading: Dispatch<boolean>;
};

export default function ContentNoteTextArea({ content, setLoading }: Props) {
  const { refreshCurrentContent } = useCurrentContent(content.contentId);
  const handleSave = async (text: string) => {
    setLoading(true);
    await updateContentNoteAction(content.contentId, text);
    refreshCurrentContent(content.contentId);
    setLoading(false);
  };

  return <NoteTextArea initText={content.note} onSave={handleSave} />;
}
