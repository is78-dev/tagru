import { Button } from "@/components/ui/button";
import { Tags } from "lucide-react";
import Link from "next/link";
import UserIcon from "./user-icon/user-icon";
import { isAuthenticated } from "@/services/usersService";

export default async function Header() {
  const isAuth = await isAuthenticated();

  return (
    <header className="relative flex w-full items-center gap-4 border-b bg-card px-2 py-1 shadow-sm">
      <Button asChild size="sm" variant="ghost" className="text-lg font-bold">
        <Link href="/" prefetch={false}>
          <Tags size={24} />
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
