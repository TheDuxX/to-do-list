"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AvatarImageProps {
  url: string | null; // Corrigir a tipagem para aceitar uma string ou null
}

const AvatarImage = ({ url }: AvatarImageProps) => {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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

    if (url) {
      downloadImage(url); // Passa o nome do arquivo armazenado
    }
  }, [url, supabase]);

  return avatarUrl ? (
    <Link href="./account">
      <Image
        src={avatarUrl}
        alt="Avatar"
        width={50} // Defina o tamanho desejado
        height={50} // Defina o tamanho desejado
        className="rounded-full"
      />
    </Link>
  ) : (
    <div className="avatar-placeholder" style={{ width: 150, height: 150 }} />
  );
};

export default AvatarImage;
