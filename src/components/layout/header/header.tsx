import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import Link from "next/link";
import UserIcon from "./user-icon/user-icon";
import { getAuthStateService } from "@/services/usersService";

export default async function Header() {
  const isAuth = await getAuthStateService();

  return (
    <header className="relative flex w-full items-center gap-4 border-b bg-card px-2 py-1 shadow-sm">
      <Button asChild size="sm" variant="ghost" className="text-lg font-bold">
        <Link href="/" prefetch={false}>
          <Tag className="size-4 stroke-[3]" />
          <span>Tagru</span>
        </Link>
      </Button>
      <div className="flex-1">
        <div className="z-40 flex w-full justify-center"></div>
      </div>
      {isAuth && <UserIcon className="mr-2" />}
    </header>
  );
}
