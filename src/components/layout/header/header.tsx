import { Button } from "@/components/ui/button";
import { Tags } from "lucide-react";
import Link from "next/link";
import UserIcon from "@/components/layout/header/user-icon";
import { isAuthenticated } from "@/services/usersService";

export default async function Header() {
  const isAuth = await isAuthenticated();

  return (
    <div className="flex items-center border-b">
      <header className="container mx-auto flex items-center px-4 py-2">
        <Button asChild size="sm" variant="ghost" className="text-lg font-bold">
          <Link href="/" prefetch={false}>
            <Tags size={24} />
            <span>Tagru</span>
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
    </div>
  );
}
