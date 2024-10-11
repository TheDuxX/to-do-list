import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HeaderNav from "./_component/header";
import { ThemeSwitcher } from "../_components/theme-switcher";

export default async function Index() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <HeaderNav />
    </>
  );
}
