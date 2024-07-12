"use client";

import { useRouter } from "next/navigation";
import EditorResourcesTools from "./EditorResourcesTools";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { adCreateUser } from "@/services/userService";

const UserCreator = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userToCreate, setUserToCreate] = useState<{
    username?: string;
    password?: string;
    name?: string;
  } | null>(null);
  const handleCreate = useCallback(async () => {
    if (!userToCreate || !session) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    try {
      const res = await adCreateUser(
        userToCreate.username || "",
        userToCreate.password || "",
        userToCreate.name || ""
      );
      if (res === "conflict") {
        toast.error("Já existe um usuário com este cpf");
        return;
      }
      if (res === "password") {
        toast.error(
          "A senha do novo usuário deve ter entre 6 e 20 caracteres."
        );
        return;
      }
      if (res === "username") {
        toast.error("O CPF deve possuir 11 dígitos");
        return;
      }
      router.replace("/dashboard/conta");
      toast.success("Usuário criado com sucesso");
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [userToCreate, router, session]);
  return (
    <>
      <EditorResourcesTools
        resourceIsActive={true}
        resourceIsEditing={true}
        toggleVisibilityFunction={() => null}
        editFunction={() => null}
        deleteFunction={() => null}
        cancelFunction={() => router.back()}
        saveFunction={() => handleCreate()}
      />
      <div className="mb-6 collapse bg-base-300 collapse-plus break-all">
        <div className="border rounded-box border-primary">
          <div className="flex flex-col gap-3 p-3">
            <label className="input w-full flex items-center gap-2">
              Nome
              <input
                type="text"
                value={userToCreate?.name || ""}
                onChange={(e) =>
                  setUserToCreate((prevState) => ({
                    ...prevState,
                    name: e.target.value || "",
                  }))
                }
                className="grow font-bold"
              />
            </label>
            <div className="flex flex-col xl:flex-row gap-3">
              <label className="input w-full flex items-center gap-2">
                CPF
                <input
                  type="number"
                  value={userToCreate?.username || ""}
                  onChange={(e) =>
                    setUserToCreate((prevState) => ({
                      ...prevState,
                      username: e.target.value || "",
                    }))
                  }
                  className="grow font-bold"
                />
              </label>
              <label className="input w-full flex items-center gap-2">
                Senha
                <input
                  type="text"
                  value={userToCreate?.password || ""}
                  onChange={(e) =>
                    setUserToCreate((prevState) => ({
                      ...prevState,
                      password: e.target.value || "",
                    }))
                  }
                  className="grow font-bold"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCreator;
