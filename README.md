# Tagru

**Tagru** は、Youtube上の動画にタグをつけて管理できるオンラインサービスです。動画ごとのメモや、タグの階層化により、自分だけの動画データベースを作成できます。

## 機能

- **アカウント作成**： Googleアカウントを使用して簡単にログインできます。
- **動画登録**： 動画URLを入力することで動画を登録できます。タイトルの編集やタグ・メモの追加も可能です。
- **タグ作成**： タグ名を入力してタグを作成できます。お気に入り登録や親子タグ・メモの追加も可能です。
- **動画閲覧**： 登録した動画をTagru上で閲覧できます。また同じタグを持つ動画を一覧で確認できます。

## 技術スタックとその採用理由

[![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcn/ui&logoColor=white)](https://ui.shadcn.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

- **React**： 複雑なUIを容易に生成する
- **Next.js**： FCP, LCPの高速化やDBへの安全なアクセス、Middlewareによるリクエスト段階でのアクセス制御を実現する
- **TailwindCSS**： HTMLとCSSをコロケーションすることで、認知負荷を軽減し開発スピードの向上させる
- **shadcn/ui**： カスタマイズの容易な汎用コンポーネントの利用、デザインシステムをコードとして表現する
- **Supabase**： DBを容易に利用、スキーマからTypeScriptの型を自動生成し、型ガード付きのデータ取得を行う
