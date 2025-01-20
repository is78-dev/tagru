"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  return (
    <Button
      variant="outline"
      className="w-full gap-[10px] rounded-full px-4 font-bold [&_svg]:size-fit"
      onClick={() => {
        window.location.href = "/api/auth/login";
      }}
    >
      <FcGoogle size={20} />
      <span className="mt-[1px]">Googleでログイン</span>
    </Button>
  );
};

export default GoogleLoginButton;
