"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Check, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { InputClean } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import DraggableList from "./draggablelist";
import { useRouter } from "next/navigation";

interface ListItem {
  id: string;
  name: string;
  checked: boolean;
}

interface ListsProps {
  lists:
    | {
        id: string;
        name: string;
        listitem: {
          id: string;
          name: string;
          checked: boolean;
        }[];
      }[]
    | null;
}

const List = ({ lists: initialLists }: ListsProps) => {
  const supabase = createClient(); // Cliente do Supabase para criar novos itens
  const [lists, setLists] = useState(initialLists); // Estado para armazenar as listas e seus itens
  const [newItemName, setNewItemName] = useState(""); // Gerencia o nome do novo item
  const [addingItem, setAddingItem] = useState<string | null>(null); // Gerencia se estamos adicionando um item
  const router = useRouter();

  // Função para adicionar um novo item à lista no Supabase e no estado local
  const handleAddItem = async (listId: string) => {
    if (newItemName.trim() === "") {
      alert("O nome do item não pode estar vazio."); // Validação para evitar nome vazio
      return;
    }

    // Verifica se o item já existe na lista
    const currentList = lists?.find((list) => list.id === listId);
    const itemExists = currentList?.listitem.some(
      (item) => item.name.toLowerCase() === newItemName.toLowerCase()
    );

    if (itemExists) {
      alert("Este item já existe na lista."); // Validação para evitar duplicados
      return;
    }

    // Insere o novo item no banco de dados
    const { data, error } = await supabase
      .from("listitem")
      .insert([{ name: newItemName, checked: false, list_id: listId }])
      .select();

    if (error) {
      console.error("Erro ao adicionar item:", error);
      return;
    }

    // Atualiza a lista com o novo item no estado local
    if (data) {
      const updatedLists = lists?.map((list) =>
        list.id === listId
          ? { ...list, listitem: [...list.listitem, data[0]] }
          : list
      );
      setLists(updatedLists); // Atualiza o estado com a lista modificada
    }

    setNewItemName(""); // Limpa o campo de entrada
    setAddingItem(null); // Fecha o campo de adição
  };

  // Função para reordenar os itens localmente
  const handleReorderItems = (listId: string, newItems: ListItem[]) => {
    const updatedLists = lists?.map((list) =>
      list.id === listId ? { ...list, listitem: newItems } : list
    );
    setLists(updatedLists);
  };

  return (
    <>
      {lists?.map((list) => (
        <div
          key={list.id}
          className="bg-darkPurple p-3 rounded-md min-h-60 min-w-60 w-fit flex flex-col gap-2"
        >
          <div className="flex flex-row justify-between items-center ">
            <h2 className="text-md font-semibold text-nowrap truncate ">
              {list.name}
            </h2>
            <Button
              size="mini"
              className="ml-4 flex justify-center items-center bg-primary rounded-full min-w-5 min-h-5"
              onClick={() => setAddingItem(list.id)} // Mostra o campo de adição
            >
              <Plus size={14} />
            </Button>
          </div>

          {/* Renderiza os itens existentes com drag and drop */}
          <DraggableList
            listId={list.id}
            items={list.listitem}
            onReorder={handleReorderItems}
          />

          {/* Campo de input para adicionar um novo item */}
          {addingItem === list.id && (
            <div className="flex flex-row gap-2 items-center m-0 p-0">
              <Checkbox disabled />
              <InputClean
                className="text-sm font-extralight bg-background p-0 px-2 m-0 h-fit"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)} // Atualiza o nome do novo item
                placeholder="Novo item"
              />
              <Button
                className="rounded-full p-1"
                size="mini"
                onClick={() => handleAddItem(list.id)}
              >
                <Check size={10} />
              </Button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default List;
