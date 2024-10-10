import { createClient } from "@/utils/supabase/server";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AvatarImage from "./avatar";

const HeaderNav = async () => {
  const supabase = createClient();

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
    <div className="h-[70px] w-full border-b-[0.1rem] border-gray-800 flex items-center p-4 justify-between">
      <div className="flex flex-row gap-2 items-center justify-center">
        <AvatarImage url={profiles?.avatar_url} />
        <h2>Olá, {profiles?.username}</h2>
      </div>
      <MenuIcon />
    </div>
  );
};

export default HeaderNav;
