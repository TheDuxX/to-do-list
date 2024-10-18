"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import Avatar from "./avatar";
import { signOutAction } from "@/app/actions";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Erro ao carregar dados do usuário!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Perfil atualizado");
    } catch (error) {
      alert("Erro ao atualizar dados!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex gap-1 flex-col items-center justify-center mt-4">
      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url: any) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, avatar_url: url });
        }}
      />
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <Label htmlFor="fullName">Nome Completo</Label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="username">Usuário</Label>
        <Input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-row gap-2 justify-center mt-2">
        <Button
          className="button primary block min-w-[50%]"
          onClick={() => updateProfile({ fullname, username, avatar_url })}
          disabled={loading}
        >
          {loading ? "Carregando ..." : "Salvar"}
        </Button>
        <form action={signOutAction} method="post" className="w-full">
          <Button
            className="button block min-w-[50%]"
            type="submit"
            variant="outline"
          >
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
