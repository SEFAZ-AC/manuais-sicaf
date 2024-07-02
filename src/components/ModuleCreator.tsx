"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EditorResourcesTools from "./EditorResourcesTools";
import { useSession } from "next-auth/react";
import { createSlug } from "@/utils/parseSlug";
import { adCreateModule } from "@/services/menuService";

const ModuleCreator = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [moduleToCreate, setModuleToCreate] = useState<{
    name?: string;
    slug?: string;
  } | null>({ name: "", slug: "" });

  const handleCreate = useCallback(async () => {
    if (!moduleToCreate || !session) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    try {
      const res = await adCreateModule(
        moduleToCreate.name || "",
        moduleToCreate.slug || ""
      );
      if (res === "conflict") {
        toast.error("Já existe um módulo com este título");
        return;
      }
      if (res === "forbidden") {
        toast.error("Por favor escolha um título para o módulo");
        return;
      }
      router.replace("/");
      toast.success("Registro criado com sucesso");
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [moduleToCreate, router, session]);
  return (
    <>
      <EditorResourcesTools
        resourceIsActive={true}
        resourceIsEditing={true}
        toggleVisibilityFunction={() => null}
        editFunction={() => null}
        deleteFunction={() => null}
        cancelFunction={() => router.back()}
        saveFunction={handleCreate}
      />
      <div className="mb-6 collapse bg-base-300 collapse-plus break-all">
        <div className="border rounded-box border-primary">
          <div className="flex flex-col gap-3 p-3">
            <label className="input w-full flex items-center gap-2">
              Título
              <input
                type="text"
                autoFocus
                value={moduleToCreate?.name || ""}
                onChange={(e) =>
                  setModuleToCreate((prevState) => ({
                    ...prevState,
                    name: e.target.value || "",
                    slug: createSlug(e.target.value || ""),
                  }))
                }
                className="grow font-bold text-xl"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModuleCreator;
