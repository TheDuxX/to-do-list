import { createClient } from "@/utils/supabase/server";
import { LogOut, MenuIcon, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AvatarImage from "../../_components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../_components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "../../_components/ui/button";
import { signOutAction } from "../../actions";
import LogOutButton from "../../_components/logout-button";

const HeaderNav = async () => {
  const supabase = createClient();
  const date = new Date();
  const formatedDayWeek = format(date, `eeee`, { locale: ptBR });
  const formaterDay = format(date, `', ' dd ' de ' MMMM`, { locale: ptBR });

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  let { data: profiles } = await supabase
    .from("profiles")
    .select(`full_name, username, avatar_url`)
    .eq("id", data.user?.id)
    .single();

  return (
    <div className="h-[70px] w-full shadow-md flex items-center p-4 justify-between">
      <div className="flex flex-row gap-2 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AvatarImage url={profiles?.avatar_url} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mx-1">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link href="./account">
                <p>Perfil</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <LogOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="font-light text-sm">
          <h2>Olá, {profiles?.username}</h2>
          <small className="capitalize">{formatedDayWeek}</small>
          <small>{formaterDay}</small>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
