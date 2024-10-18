import { createClient } from "@/utils/supabase/server";
import AccountForm from "./_components/account-form";
import Navbar from "@/app/_components/header";

const Account = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <AccountForm user={user} />
    </>
  );
};

export default Account;
