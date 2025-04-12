import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownContent from "@/components/layout/header/user-icon/dropdown-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { getProfileService } from "@/services/profilesService";

type Props = {
  className?: string;
};

export default async function UserIcon({ className = "" }: Props) {
  const profile = await getProfileService();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={twMerge(
            "size-8 outline outline-1 outline-border",
            className,
          )}
        >
          <AvatarImage src={profile.avatarUrl ?? ""} alt="avatar" />
          <AvatarFallback className="bg-card">
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownContent />
    </DropdownMenu>
  );
}
