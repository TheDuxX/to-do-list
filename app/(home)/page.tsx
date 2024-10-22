import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HeaderNav from "./_component/header";
import SelectDate from "../_components/date-picker";
import TodaySchedule from "../_components/today-schedule";
import LastestLists from "./_component/lists";

export default async function Index() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <HeaderNav />
      <SelectDate />
      <TodaySchedule />
      <LastestLists />
    </>
  );
}
