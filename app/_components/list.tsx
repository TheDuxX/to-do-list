'use client'
import { PlusIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface ListItem {
  id: string;
  name: string;
  checked: boolean;
}

interface List {
  id: string;
  name: string;
  items: ListItem[];
}

const List = () => {
  const supabase = createClient();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);

        // Busca as listas e seus itens relacionados
        let { data: listsData, error } = await supabase.from("List").select(`
            id,
            name,
            ListItem (
              id,
              name,
              checked
            )
          `);

        if (error) {
          console.error("Erro ao buscar listas:", error);
          return;
        }

        // Mapeia os dados para o formato necessário
        const formattedLists = listsData.map((list: any) => ({
          id: list.id,
          name: list.name,
          items: list.ListItem,
        }));

        setLists(formattedLists);
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [supabase]);

  if (loading) {
    return <p>Carregando listas...</p>;
  }

  return (
    <div>
      {lists.length > 0 ? (
        lists.map((list) => (
          <div key={list.id} className="mb-4">
            <h2 className="font-bold text-lg">{list.name}</h2>
            <ul className="pl-4">
              {list.items.map((item) => (
                <li key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    className="mr-2"
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Nenhuma lista encontrada.</p>
      )}
    </div>
  );
};

export default List;
