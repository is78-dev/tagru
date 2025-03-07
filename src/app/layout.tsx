import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter, notoSansJP } from "@/styles/font";
import Header from "@/components/layout/header/header";
import { Toaster } from "@/components/ui/toaster";

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
        className={`${inter.variable} ${notoSansJP.variable} flex min-h-dvh flex-col antialiased`}
      >
        <Header />
        <main className="relative grow p-4">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
