"use client"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation"; // Para redirecionar após logout
import { createClient } from "@/utils/supabase/client"; // Importa o cliente do lado do cliente

const LogOutButton = () => {
  const supabase = createClient();
  const router = useRouter(); // Usar o router para redirecionar após logout

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login"); // Redireciona para a página de login após logout
    } else {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <>
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="p-0 font-normal text-sm"
      >
        Log out
      </Button>
    </>
  );
};

export default LogOutButton;
