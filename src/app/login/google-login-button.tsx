"use client";
import { loginWithGoogle } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export function GoogleLoginButton() {
  return (
    <Button
      variant="outline"
      className="w-full gap-[10px] rounded-full px-4 font-bold"
      onClick={loginWithGoogle}
    >
      <FcGoogle size={20} />
      <span className="mt-[1px]">Googleでログイン</span>
    </Button>
  );
}
