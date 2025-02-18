import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownContent from "@/components/layout/header/dropdown-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { getProfile } from "@/services/profilesService";

export default async function UserIcon() {
  const profileData = await getProfile();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarImage src={profileData.avatar_url ?? ""} alt="avatar" />
          <AvatarFallback className="border bg-background shadow">
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownContent />
    </DropdownMenu>
  );
}
