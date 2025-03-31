import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter, notoSansJP } from "@/styles/font";
import Header from "@/components/layout/header/header";
import { Toaster } from "@/components/ui/toaster";
import { AllTagsContext } from "@/context/all-tags-context";
import { CurrentContentContext } from "@/context/current-content-context";

export const metadata: Metadata = {
  title: "Tagru",
  description:
    "Tagruは動画などweb上のお気に入りのコンテンツをタグ付けして管理するサービスです。",
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
          <CurrentContentContext>
            <div className="flex h-dvh flex-col">
              <Header />
              <main className="grow overflow-auto px-4 md:px-10 2xl:px-20">
                {children}
              </main>
              <Toaster />
            </div>
          </CurrentContentContext>
        </AllTagsContext>
      </body>
    </html>
  );
}
