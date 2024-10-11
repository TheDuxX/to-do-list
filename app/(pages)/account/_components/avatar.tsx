"use client";
import React, { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { PenIcon, PlusIcon, Trash2, X } from "lucide-react";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const deleteImage = async () => {
    try {
      if (url) {
        // Deleta a imagem do bucket de avatars
        const { error: deleteError } = await supabase.storage
          .from("avatars")
          .remove([url]); // Passa o caminho da imagem que você está armazenando no campo avatar_url

        if (deleteError) {
          throw deleteError;
        }

        // Atualiza o campo avatar_url no perfil do usuário para null ou string vazia
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ avatar_url: null }) // Atualiza o campo avatar_url no banco de dados
          .eq("id", uid); // Certifique-se de que o uid é o ID correto do usuário

        if (updateError) {
          throw updateError;
        }

        setAvatarUrl(null); // Atualiza o estado para remover a URL do avatar
        alert("Avatar removido com sucesso!");
      }
    } catch (error) {
      console.log("Erro ao deletar a imagem:", error);
      alert("Erro ao deletar a imagem!");
    }
  };

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleClickUploadImagesButton = () => {
    imageInputRef.current?.click();
  };

  return (
    <div>
      {avatarUrl ? (
        <div className="relative">
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="avatar image rounded-full object-cover"
            style={{ height: size, width: size }}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={deleteImage}
            className="absolute bottom-2 right-2 rounded-full p-0 w-6 h-6 flex items-center justify-center"
          >
            <Trash2 size={15} />
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleClickUploadImagesButton}
            className="absolute bottom-2 left-2 rounded-full p-0 w-6 h-6 flex items-center justify-center"
          >
            <PenIcon size={15} />
          </Button>
        </div>
      ) : (
        <div
          className="avatar no-image flex items-center justify-center border rounded-full"
          style={{ height: size, width: size }}
          onClick={handleClickUploadImagesButton}
        >
          <PlusIcon />
        </div>
      )}
      <div style={{ width: size }}>
        <Input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          ref={imageInputRef}
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
