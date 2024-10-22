"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { X } from "lucide-react";

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
    <div className="flex flex-row gap-2 w-full justify-between items-center">
      {/* Controla o estado do checkbox */}
      <div className="flex flex-row items-center  gap-2">
        <Checkbox id={item.id} checked={checked} onCheckedChange={toggleCheckbox} />
        <Label htmlFor={item.id} className={checked ? "line-through font-light" : "font-light"}>{item.name}</Label>
      </div>
      <Button variant="ghost" size="mini" className="flex items-center rounded-full p-1"><X size={10} className="text-gray-50/50"/></Button>
    </div>
  );
};

export default CheckboxItem;
