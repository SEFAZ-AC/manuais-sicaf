"use client";

import { useCallback, useState } from "react";
import ActionButton from "./ActionButton";
import DynamicIcon from "./DynamicIcon";
import { useRouter } from "next/navigation";
import {
  adToggleUserAdmin,
  adToggleUserVisibility,
  adSuperUpdateUser,
} from "@/services/userService";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const UserEditorTools = ({
  user,
}: {
  user: {
    id: number;
    username: string;
    name: string;
    active: boolean | null;
    admin: boolean | null;
  };
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userToUpdate, setUserToUpdate] = useState<{
    id?: number;
    username?: string;
    password?: string | null;
    name?: string;
  } | null>(null);
  const handleUpdate = useCallback(async () => {
    if (!userToUpdate || !session) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    if (!userToUpdate.id || !userToUpdate.name || !userToUpdate.username) {
      toast.error("Não é possível atualizar um usuário sem nome e CPF");
      return;
    }
    try {
      const res = await adSuperUpdateUser(
        userToUpdate.id,
        userToUpdate.name,
        userToUpdate.username,
        userToUpdate.password || null
      );
      if (res === "forbidden") {
        toast.error("Não é possível modificar este usuário");
        return;
      }
      if (res === "not_found") {
        toast.error("Nenhum usuário encontrado com este cpf");
        return;
      }
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
      router.refresh();
      router.replace("/dashboard/conta");
      toast.success("Usuário atualizado com sucesso");
    } catch (error) {
      toast.error("Ops.. Algo deu errado");
    }
    setUserToUpdate(null);
  }, [userToUpdate, router, session]);
  const handleToggleVisibility = useCallback(async (id: number) => {
    try {
      const res = await adToggleUserVisibility(id);
      if (res === "forbidden") {
        toast.error("Não é possível bloquear este usuário");
        return;
      }
      toast.success(`Usuário agora está ${res ? "desbloqueado" : "bloqueado"}`);
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, []);
  const handleToggleAdmin = useCallback(async (id: number) => {
    try {
      const res = await adToggleUserAdmin(id);
      if (res === "forbidden") {
        toast.error("Não é possível revogar privilégios para este usuário");
        return;
      }
      toast.success(`Usuário agora ${res ? "é um admin" : "não é um admin"}`);
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, []);
  return (
    <div className="flex gap-3 w-full justify-end items-center">
      {user.active ? (
        <ActionButton
          color="success"
          outline
          size="xs"
          icon={<DynamicIcon name="user-check" />}
          action={() => handleToggleVisibility(user.id)}
          tooltip="Bloquear"
        />
      ) : (
        <ActionButton
          color="error"
          outline
          size="xs"
          icon={<DynamicIcon name="user-x" />}
          action={() => handleToggleVisibility(user.id)}
          tooltip="Desbloquear"
        />
      )}
      {user.admin ? (
        <ActionButton
          color="success"
          outline
          size="xs"
          icon={<DynamicIcon name="shield" />}
          action={() => handleToggleAdmin(user.id)}
          tooltip="Revogar privilégio"
        />
      ) : (
        <ActionButton
          color="ghost"
          outline
          size="xs"
          icon={<DynamicIcon name="shield-off" />}
          action={() => handleToggleAdmin(user.id)}
          tooltip="Conceder privilégio"
        />
      )}
      <ActionButton
        color="warning"
        outline
        size="xs"
        icon={<DynamicIcon name="edit" />}
        action={() => {
          setUserToUpdate({
            id: user.id,
            username: user.username,
            name: user.name,
            password: null,
          });
          if (document) {
            (
              document.getElementById(`editModal-${user.id}`) as HTMLFormElement
            ).showModal();
          }
        }}
        tooltip="Editar"
      />
      <dialog
        id={`editModal-${user.id}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box !w-fit !max-w-full">
          <h1 className="text-2xl font-extrabold">
            Editando usuário #{user.id}
          </h1>
          <div className="mb-6 bg-base-300 collapse-plus beak-all">
            <div className="border rounded-box border-primary">
              <div className="flex flex-col gap-3 p-3">
                <label className="input w-full flex items-center gap-2">
                  Nome
                  <input
                    type="text"
                    value={userToUpdate?.name || ""}
                    onChange={(e) =>
                      setUserToUpdate((prevState) => ({
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
                      value={userToUpdate?.username || ""}
                      onChange={(e) =>
                        setUserToUpdate((prevState) => ({
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
                      value={userToUpdate?.password || ""}
                      onChange={(e) =>
                        setUserToUpdate((prevState) => ({
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
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <ActionButton
                text="Salvar"
                icon={<DynamicIcon name="save" />}
                color="primary"
                type="submit"
                action={() => handleUpdate()}
              />
              <ActionButton
                text="Cancelar"
                icon={<DynamicIcon name="x" />}
                type="submit"
                action={() => setUserToUpdate(null)}
              />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserEditorTools;
