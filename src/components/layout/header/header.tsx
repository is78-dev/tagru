import { Button } from "@/components/ui/button";
import { Tags } from "lucide-react";
import Link from "next/link";
import UserIcon from "@/components/layout/header/user-icon";
import { isAuthenticated } from "@/services/usersService";

export default async function Header() {
  const isAuth = await isAuthenticated();

  return (
    <header className="flex h-14 items-center border-b px-4">
      <Button asChild size="sm" variant="ghost" className="text-lg font-bold">
        <Link href="/">
          <Tags size={16} />
          Tagru
        </Link>
      </Button>
      <div className="flex-1"></div>
      {isAuth ? (
        <UserIcon />
      ) : (
        <Button asChild size="sm" variant="secondary">
          <Link href="/login">ログイン</Link>
        </Button>
      )}
    </header>
  );
}
