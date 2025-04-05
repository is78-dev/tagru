import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownContent from "@/components/layout/header/user-icon/dropdown-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { getProfile } from "@/services/profilesService";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default async function UserIcon({ className = "" }: Props) {
  const profileData = await getProfile();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={twMerge(
            "size-8 outline outline-1 outline-border",
            className,
          )}
        >
          <AvatarImage src={profileData.avatar_url ?? ""} alt="avatar" />
          <AvatarFallback className="bg-card">
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownContent />
    </DropdownMenu>
  );
}
