"use client";

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EditorResourcesTools from "./EditorResourcesTools";
import { useSession } from "next-auth/react";
import { createSlug } from "@/utils/parseSlug";
import { adCreateSection } from "@/services/menuService";

const SectionCreator = ({ trees }: { trees: any }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [sectionToCreate, setSectionToCreate] = useState<{
    name?: string;
    slug?: string;
    moduleId?: number | null;
  } | null>({ name: "", slug: "", moduleId: null });
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const handleModuleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const moduleId = e.target.value;
      const moduleObj = trees.find(
        (tree: any) => tree.id.toString() === moduleId
      );
      setSelectedModule(moduleId);
      setSectionToCreate((prevState) => ({
        ...prevState,
        moduleId: moduleObj ? parseInt(moduleId, 10) : null,
        slug: createSlug(prevState?.name || ""),
      }));
    },
    [trees]
  );
  const handleCreate = useCallback(async () => {
    if (!sectionToCreate || !session) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    try {
      const res = await adCreateSection(
        sectionToCreate.name || "",
        sectionToCreate.slug || "",
        sectionToCreate.moduleId || null
      );
      if (res === "conflict") {
        toast.error("Já existe uma seção com este título e filiação");
        return;
      }
      if (res === "forbidden") {
        toast.error("Por favor escolha um título para a seção");
        return;
      }
      if (res === "badRequest") {
        toast.error("Por favor selecione um módulo para vincular esta seção");
        return;
      }
      router.replace("/");
      toast.success("Registro criado com sucesso");
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [sectionToCreate, router, session]);
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
                value={sectionToCreate?.name || ""}
                onChange={(e) =>
                  setSectionToCreate((prevState) => ({
                    ...prevState,
                    name: e.target.value || "",
                    slug: createSlug(e.target.value || ""),
                  }))
                }
                className="grow font-bold text-xl"
              />
            </label>
            <div className="flex flex-col xl:flex-row gap-3">
              <label className="form-control w-full xl:max-w-[50%]">
                <span className="label-text text-base">
                  Vinculada ao módulo...
                </span>
                <select
                  className="select select-bordered"
                  onChange={handleModuleChange}
                  value={selectedModule || ""}
                >
                  <option value="">- Selecione -</option>
                  {trees.map((tree: any) => (
                    <option key={tree.id} value={tree.id}>
                      {tree.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SectionCreator;
