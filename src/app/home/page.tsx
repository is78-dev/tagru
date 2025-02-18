import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags } from "@/services/tagsService";
import Link from "next/link";
import CreateTagForm from "./create-tag-form";
import CreateContentForm from "./create-content-form";

export default async function Page() {
  const tagsData = await getAllTags();

  return (
    <div className="space-y-4">
      <h1 className="mb-8 text-3xl font-bold">Home</h1>
      <p>ログインユーザーのトップページです</p>
      <CreateContentForm />
      <CreateTagForm />
      <Card>
        <CardHeader>
          <CardTitle>タグ一覧</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {tagsData.map((tag, index) => (
            <Link
              href={`/tag?t=${tag.tagId}`}
              className="block"
              prefetch={false}
              key={index}
            >
              {tag.tagName}
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
