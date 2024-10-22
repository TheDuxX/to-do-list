"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import CheckboxItem from "./checkbox-item";

interface ListItem {
  id: string;
  name: string;
  checked: boolean;
}

interface ListsProps {
  lists:
    | {
        id: any;
        name: any;
        listitem: {
          id: any;
          name: any;
          checked: any;
        }[];
      }[]
    | null;
}

const List = ({ lists }: ListsProps) => {
  return (
    <>
      {lists?.map((list) => (
        <div
          key={list.id}
          className="bg-darkPurple p-3 rounded-md min-h-60 min-w-60 w-fit flex flex-col gap-2"
        >
          <div className="flex flex-row justify-between items-start ">
            <h2 className="text-md font-semibold">{list.name}</h2>
            <div className="flex justify-center items-center bg-primary rounded-full min-w-5 min-h-5">
              <Plus size={14} className="" />
            </div>
          </div>
          {list?.listitem.map((item) => (
            <CheckboxItem key={item.id} item={item} />
          ))}
        </div>
      ))}
    </>
  );
};

export default List;
