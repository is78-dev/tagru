import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter, notoSansJP } from "@/styles/font";
import Header from "@/components/layout/header/header";
import { Toaster } from "@/components/ui/toaster";
import { AllTagsContext } from "@/context/all-tags-context";

export const metadata: Metadata = {
  title: "Tagru",
  description:
    "TagruはYouTube上の動画にタグをつけて管理できるオンラインサービスです。動画ごとのメモや、タグの階層化により、自分だけの動画データベースを作成できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${notoSansJP.variable} overflow-hidden antialiased`}
      >
        <AllTagsContext>
          <div className="flex h-dvh flex-col">
            <Header />
            <main className="grow overflow-auto px-4 py-6 md:px-10 2xl:px-20">
              {children}
            </main>
            <Toaster />
          </div>
        </AllTagsContext>
      </body>
    </html>
  );
}
