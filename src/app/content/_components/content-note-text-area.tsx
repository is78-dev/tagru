"use client";
import NoteTextArea from "@/components/element/note-text-area";
import { updateContentNoteAction } from "@/actions/contentAction";
import { useCurrentContent } from "@/context/current-content-context";

type Props = {
  contentId: string;
  initialText: string;
};

export default function ContentNoteTextArea({ contentId, initialText }: Props) {
  const { refreshCurrentContent } = useCurrentContent();

  const handleSave = async (text: string) => {
    await updateContentNoteAction(contentId, text);
    refreshCurrentContent(contentId);
  };

  return <NoteTextArea initialText={initialText} onSave={handleSave} />;
}
