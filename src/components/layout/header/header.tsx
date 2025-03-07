import { Button } from "@/components/ui/button";
import { Tags } from "lucide-react";
import Link from "next/link";
import UserIcon from "@/components/layout/header/user-icon";
import { isAuthenticated } from "@/services/usersService";

export default async function Header() {
  const isAuth = await isAuthenticated();

  return (
    <header className="flex w-full items-center border-b bg-card px-4 py-2">
      <Button asChild size="sm" variant="ghost" className="text-lg font-bold">
        <Link href="/" prefetch={false}>
          <Tags size={24} />
          <span>Tagru</span>
        </Link>
      </Button>
      <div className="flex-1"></div>
      <div className="px-2">
        {isAuth ? (
          <UserIcon />
        ) : (
          <Button asChild size="sm" variant="default">
            <Link href="/login" prefetch={false}>
              ログイン
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
