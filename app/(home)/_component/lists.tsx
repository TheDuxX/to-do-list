import List from "@/app/_components/list";
import { createClient } from "@/utils/supabase/server";

const LastestLists = async () => {
  const supabase = createClient();

  let { data: lists, error } = await supabase
    .from("list")
    .select("id, name, listitem(id, name, checked)");

  if (error) {
    console.error("Erro ao buscar listas:", error);
    return <p>Erro ao carregar as listas.</p>;
  }

  const handleListClick = () => {
    try {
      console.log()
    } catch {}
  }

  return (
    <div className="w-full h-full p-2">
      <h2 className="font-semibold text-lg">Listas</h2>
      {lists?.slice(0, 1).map((list) => (
        <div className="flex flex-row overflow-auto gap-2 rounded-md">
          <List key={list.id} lists={lists}/>
        </div>
      ))}
    </div>
  );
};

export default LastestLists;
