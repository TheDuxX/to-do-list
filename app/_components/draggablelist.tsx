"use client"
import React, { useState } from "react";
import CheckboxItem from "./checkbox-item";

interface ListItem {
  id: string;
  name: string;
  checked: boolean;
}

interface DraggableListProps {
  listId: string;
  items: ListItem[];
  onReorder: (listId: string, newItems: ListItem[]) => void;
}

const DraggableList = ({ listId, items, onReorder }: DraggableListProps) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // Função que é chamada quando um item começa a ser arrastado
  const handleDragStart = (id: string) => {
    setDraggedItemId(id);
  };

  // Função que é chamada quando um item é arrastado sobre outro
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Função chamada quando o item é solto em outro lugar
  const handleDrop = (targetId: string) => {
    if (!draggedItemId || draggedItemId === targetId) return;

    // Reorganiza os itens de acordo com o arrasto e drop
    const newItems = [...items];
    const draggedIndex = newItems.findIndex((item) => item.id === draggedItemId);
    const targetIndex = newItems.findIndex((item) => item.id === targetId);

    // Troca os itens de lugar
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    // Atualiza os itens reordenados
    onReorder(listId, newItems);
    setDraggedItemId(null); // Reseta o estado do item arrastado
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(item.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(item.id)}
          className="rounded-md cursor-move"
        >
          <CheckboxItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default DraggableList;
