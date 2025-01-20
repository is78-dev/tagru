"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const LogoutButton = () => {
  return (
    <Button
      variant="link"
      className="px-0"
      onClick={() => {
        window.location.href = "/api/auth/logout";
      }}
    >
      ログアウト
    </Button>
  );
};

export default LogoutButton;
