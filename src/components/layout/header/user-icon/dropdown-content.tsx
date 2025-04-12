"use client";
import { logoutAction } from "@/actions/authAction";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";

export default function DropdownContent() {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>アカウント</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem disabled>
          <Settings />
          <span>設定</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logoutAction}>
          <LogOut />
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
