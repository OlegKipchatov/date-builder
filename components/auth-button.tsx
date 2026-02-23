import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export const AuthButton = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      Привет, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button as={Link} href="/auth/login" size="sm" variant="outline">
        Войти
      </Button>
      <Button as={Link} href="/auth/sign-up" size="sm" variant="default">
        Регистрация
      </Button>
    </div>
  );
};
