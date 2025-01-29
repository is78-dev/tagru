import { GoogleLoginButton } from "@/app/login/google-login-button";

export default function Page() {
  return (
    <main className="grid min-h-dvh place-items-center bg-muted p-4">
      <div className="max-w-md space-y-6 rounded-xl border bg-background p-8 shadow">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          新規登録、ログインのどちらも以下から行うことができます。
        </p>
        <GoogleLoginButton />
      </div>
    </main>
  );
}
