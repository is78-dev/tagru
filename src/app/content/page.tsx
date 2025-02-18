import { getContentByContentId } from "@/services/contentsService";
import { notFound } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { c: contentId } = await searchParams;

  if (typeof contentId !== "string") notFound();

  const contentData = await getContentByContentId(contentId);

  return (
    <div className="flex justify-between gap-4 border py-4">
      <div className="flex-1">
        <div className="overflow-hidden rounded">
          <iframe
            src={contentData.content_url + "?rel=0"}
            className="aspect-video w-full"
            allowFullScreen
          ></iframe>
        </div>
        <h1 className="mb-8 text-xl font-bold">{contentData.title}</h1>
        <div className="h-20 bg-green-200">tags & note</div>
      </div>
      <div className="w-full max-w-md bg-muted"></div>
    </div>
  );
}
