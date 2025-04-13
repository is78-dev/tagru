"use client";
import { updateTagAction } from "@/actions/tagAction";
import NoteTextArea from "@/components/element/note-text-area";
import { useCurrentTag } from "@/context/curent-tag-context";
import { useClientError } from "@/hooks/use-client-error";

type Props = {
  tagId: string;
  initialText: string;
};

export default function TagNoteArea({ tagId, initialText }: Props) {
  const { currentTag, refreshCurrentTag } = useCurrentTag();
  const { clientErrorHandler } = useClientError();

  const handleSave = async (text: string) => {
    try {
      await updateTagAction(tagId, { note: text });
      refreshCurrentTag(tagId);
    } catch (e) {
      clientErrorHandler(e);
    }
  };

  return (
    <NoteTextArea
      key={currentTag ? currentTag.note : initialText}
      initialText={currentTag ? currentTag.note : initialText}
      onSave={handleSave}
    />
  );
}
