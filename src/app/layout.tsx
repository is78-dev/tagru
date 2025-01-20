import type { Metadata } from "next";
import "@/styles/globals.css";
import { inter, notoSansJP } from "@/styles/font";

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
      <body className={`${inter.variable} ${notoSansJP.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
