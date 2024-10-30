import List from "@/app/_components/list";
import { createClient } from "@/utils/supabase/server";

const ListPage = async () => {
  const supabase = createClient();

  let { data: lists, error } = await supabase
    .from("list")
    .select("id, name, listitem(id, name, checked)");

  if (error) {
    console.error("Erro ao buscar listas:", error);
    return <p>Erro ao carregar as listas.</p>;
  }

  return (
    <>
      <List key={lists} lists={lists}/>
    </>
  );
};

export default ListPage;
