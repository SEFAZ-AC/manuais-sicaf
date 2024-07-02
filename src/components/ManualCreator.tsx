"use client";

import Loading from "@/app/(root)/loading";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EditorResourcesTools from "./EditorResourcesTools";
import { useSession } from "next-auth/react";
import { adCreateArticle } from "@/services/manualService";
import { createManualSlug } from "@/utils/parseSlug";

const ContentEditor = dynamic(() => import("./ContentEditor"), {
  ssr: false,
  loading: () => <Loading />,
});

const ManualCreator = ({ trees }: { trees: any }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [manualToCreate, setManualToCreate] = useState<{
    name?: string;
    slug?: string;
    content?: string;
    moduleId?: number | null;
    moduleSlug?: string | null;
    sectionId?: number | null;
    sectionSlug?: string | null;
  } | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const handleModuleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const moduleId = e.target.value;
      const moduleObj = trees.find(
        (tree: any) => tree.id.toString() === moduleId
      );
      setSelectedModule(moduleId);
      setManualToCreate((prevState) => ({
        ...prevState,
        moduleId: moduleObj ? parseInt(moduleId, 10) : null,
        moduleSlug: moduleObj ? moduleObj.slug : null,
        sectionId: null,
        sectionSlug: null,
        slug: createManualSlug(
          prevState?.name || "",
          moduleObj?.slug || null,
          null
        ),
      }));
    },
    [trees]
  );
  const handleSectionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const sectionId = e.target.value;
      const moduleObj = trees.find(
        (tree: any) => tree.id.toString() === selectedModule
      );
      const section = moduleObj?.sections.find(
        (sec: any) => sec.id.toString() === sectionId
      );
      setManualToCreate((prevState) => ({
        ...prevState,
        sectionId: section ? parseInt(sectionId, 10) : null,
        sectionSlug: section ? section.slug : null,
        slug: createManualSlug(
          prevState?.name || "",
          prevState?.moduleSlug || null,
          section?.slug || null
        ),
      }));
    },
    [selectedModule, trees]
  );
  const handleContentEditorChange = useCallback(async (newData: string) => {
    setManualToCreate((prevState) => ({
      ...prevState,
      content: newData || "",
    }));
  }, []);
  const handleCreate = useCallback(async () => {
    if (!manualToCreate || !session) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    try {
      const res = await adCreateArticle(
        manualToCreate.name || "",
        manualToCreate.slug || "",
        manualToCreate.content || "",
        session?.user?.id!,
        manualToCreate.moduleId || null,
        manualToCreate.sectionId || null
      );
      if (res === "conflict") {
        toast.error("Já existe um manual com este título e filiação");
        return;
      }
      if (res === "forbidden") {
        toast.error(
          "Este termo é reservado pelo sistema. Por favor escolha outro título para o manual"
        );
        return;
      }
      router.replace(manualToCreate.slug || "/");
      toast.success("Registro criado com sucesso");
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [manualToCreate, router, session]);
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
                value={manualToCreate?.name || ""}
                onChange={(e) =>
                  setManualToCreate((prevState) => ({
                    ...prevState,
                    name: e.target.value || "",
                    slug: createManualSlug(
                      e.target.value || "",
                      manualToCreate?.moduleSlug || null,
                      manualToCreate?.sectionSlug || null
                    ),
                  }))
                }
                className="grow font-bold text-xl"
              />
            </label>
            <div className="flex flex-col xl:flex-row gap-3">
              <label className="form-control w-full xl:max-w-[50%]">
                <span className="label-text text-base">
                  Vinculado ao módulo...
                </span>
                <select
                  className="select select-bordered"
                  onChange={handleModuleChange}
                  value={selectedModule || ""}
                >
                  <option value="">- Nenhum -</option>
                  {trees.map((tree: any) => (
                    <option key={tree.id} value={tree.id}>
                      {tree.name}
                    </option>
                  ))}
                </select>
              </label>
              {selectedModule && (
                <label className="form-control w-full xl:max-w-[50%]">
                  <span className="label-text text-base">
                    Vinculado à seção...
                  </span>
                  <select
                    className="select select-bordered"
                    onChange={handleSectionChange}
                    value={manualToCreate?.sectionId || ""}
                  >
                    <option value="">- Nenhuma -</option>
                    {trees
                      .find(
                        (tree: any) => tree.id.toString() === selectedModule
                      )
                      ?.sections.map((section: any) => (
                        <option key={section.id} value={section.id}>
                          {section.name}
                        </option>
                      ))}
                  </select>
                </label>
              )}
            </div>
            <label className="input input-sm w-full flex items-center gap-2 my-2">
              URL
              <input
                type="text"
                value={manualToCreate?.slug || ""}
                disabled
                className="grow font-bold"
              />
            </label>
          </div>
          <ContentEditor
            data=""
            id="manual-creating"
            setData={handleContentEditorChange}
          />
        </div>
      </div>
    </>
  );
};

export default ManualCreator;
