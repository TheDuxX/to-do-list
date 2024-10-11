import { createClient } from "@/utils/supabase/server";
import AccountForm from "./_components/account-form";
import Navbar from "@/app/_components/header";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar />
      <AccountForm user={user} />
    </>
  );
}
