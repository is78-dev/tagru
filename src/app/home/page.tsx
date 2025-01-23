import React from "react";
import LogoutButton from "./logoutButton";

const Page = () => {
  return (
    <main className="grid min-h-dvh place-items-center bg-muted p-4">
      <div className="max-w-md space-y-6 rounded-xl border bg-background p-8 shadow">
        <h1 className="text-3xl font-bold">Home</h1>
        <p className="text-muted-foreground">
          ログインユーザーのトップページです。
        </p>
        <LogoutButton />
      </div>
    </main>
  );
};

export default Page;
