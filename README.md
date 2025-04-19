# Tagru

**Tagru** は、Youtube上の動画にタグをつけて管理できるオンラインサービスです。動画ごとのメモや、タグの階層化により、自分だけの動画データベースを作成できます。

## 特徴

- **タグで分類**： 動画に自由なタグを付けて、自分だけのルールで分類できます。
- **メモを残せる**： 動画やタグにメモを追加して、内容を補足できます。
- **親子タグで階層管理**： タグに親子関係を設定できるので、タグ同士のリンクが可能です。

## 機能

- **アカウント作成**： Googleアカウントを使用して簡単にログインできます。
- **動画登録**： 動画URLを入力することで動画を登録できます。タイトルの編集やタグ・メモの追加も可能です。
- **タグ作成**： タグ名を入力してタグを作成できます。お気に入り登録や親子タグ・メモの追加も可能です。
- **動画閲覧**： 登録した動画をTagru上で閲覧できます。また、同じタグを持つ動画を一覧で確認できます。

## 技術スタックと採用理由

[![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcn/ui&logoColor=white)](https://ui.shadcn.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

- **React**： 複雑なUIを容易に生成するため。
- **Next.js**： FCP, LCPの高速化やDBへの安全なアクセス、Middlewareによるリクエスト段階でのアクセス制御を実現するため。
- **TailwindCSS**： HTMLとCSSをコロケーションすることで、認知負荷を軽減し開発スピードを向上させるため。
- **shadcn/ui**： カスタマイズ性の高い汎用的なコンポーネントが便利なため。デザインシステムがコードとして表現されているため。
- **Supabase**： RDBや認証機能を容易に搭載できるため。スキーマからTypeScriptの型を自動生成することで型ガード付きのデータ取得が可能なため。

## 技術的なポイント

- **動画リストの無限スクロール**： 動画コンテンツが大量にある場合のロード時間増加を抑えるため、Intersection Observer APIとserver actionを用いてオンデマンドなデータ取得を行うように実装しました。
- **動画情報の編集をスムーズに反映**： React Contextを用いた状態管理により、編集内容がページの再読み込みなしに反映されるように実装しました。これにより、再生中の動画を止めることがなくなり、ユーザー体験が向上します。
- **責務を分離するレイヤー構造**： 複雑化しやすいデータ取得処理についてレイヤーごとに責務を定め、依存方向を決めることで、バグの予防や保守性の向上を目指しました。
  - `/src/repositories`： DBへのデータアクセス関数を設置。
  - `/src/services`： repositoriesで取得したデータを受け取り、用途に応じた型変換やエラー生成を行う関数を設置。server componentやserver actionから呼ばれる。
