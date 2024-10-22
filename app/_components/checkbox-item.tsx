"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

interface CheckboxProps {
  item: {
    id: string;
    name: string;
    checked: boolean;
  };
}

// Componente separado para lidar com cada checkbox e seu estado
const CheckboxItem = ({ item }: CheckboxProps) => {
  const supabase = createClient();
  // Estado local para controlar o estado do checkbox
  const [checked, setChecked] = useState(item.checked);

  // Função para alternar o estado do checkbox e atualizar o banco de dados
  const toggleCheckbox = async () => {
    const newCheckedState = !checked; // Inverte o estado do checkbox
    setChecked(newCheckedState); // Atualiza o estado local

    // Atualiza o estado do checkbox no banco de dados Supabase
    const { error } = await supabase
      .from("listitem")
      .update({ checked: newCheckedState })
      .eq("id", item.id);

    if (error) {
      console.error("Erro ao atualizar o item:", error);
      // Caso haja erro, reverte o estado local
      setChecked(!newCheckedState);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      {/* Controla o estado do checkbox */}
      <Checkbox checked={checked} onCheckedChange={toggleCheckbox} />
      <p className={checked ? "line-through" : ""}>{item.name}</p>
    </div>
  );
};

export default CheckboxItem;
