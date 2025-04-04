import { GoogleLoginButton } from "@/app/login/google-login-button";

export default function Page() {
  return (
    <div className="mx-auto max-w-xl py-20">
      <h1 className="mb-3 text-4xl font-extrabold">Login</h1>
      <p className="mb-8 text-muted-foreground">
        新規登録、ログインのどちらも以下から行うことができます。
      </p>
      <GoogleLoginButton />
    </div>
  );
}
