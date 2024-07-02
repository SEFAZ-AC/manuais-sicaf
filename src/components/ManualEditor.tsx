"use client";

import Loading from "@/app/(root)/loading";
import dynamic from "next/dynamic";
import { useState, useCallback, memo } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EditorResourcesTools from "./EditorResourcesTools";
import { useSession } from "next-auth/react";
import {
  adDeleteArticle,
  adToggleArticleVisibility,
  adUpdateArticle,
} from "@/services/manualService";
import { createManualSlug } from "@/utils/parseSlug";
import ContentParser from "./ContentParser";
import DeleteModal from "./DeleteModal";

const ContentEditor = dynamic(() => import("./ContentEditor"), {
  ssr: false,
  loading: () => <Loading />,
});

const ManualEditor = memo(function ManualEditor({
  data,
  trees,
}: {
  data: any;
  trees: any;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [manualToUpdate, setManualToUpdate] = useState<{
    name?: string;
    slug?: string;
    content?: string;
    moduleId?: number | null;
    moduleSlug?: string | null;
    sectionId?: number | null;
    sectionSlug?: string | null;
  } | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const handleToggleVisibility = useCallback(async () => {
    try {
      const res = await adToggleArticleVisibility(data.slug);
      toast.success(`Registro ${res ? "publicado" : "ocultado"} com sucesso`);
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [data.slug, router]);
  const prepareUpdateStates = useCallback(() => {
    setManualToUpdate(data);
    if (data.sectionId) {
      const section = trees
        .flatMap((tree: any) => tree.sections)
        .find((sec: any) => sec.id === data.sectionId);
      if (section) {
        const parentModule = trees.find((tree: any) =>
          tree.sections.some((sec: any) => sec.id === data.sectionId)
        );
        if (parentModule) {
          setSelectedModule(parentModule.id.toString());
        }
        setManualToUpdate((prevState) => ({
          ...prevState,
          moduleId: section.moduleId || null,
          moduleSlug: parentModule ? parentModule.slug : null,
          sectionId: data.sectionId || null,
          sectionSlug: section.slug,
        }));
      }
    } else if (data.moduleId) {
      setSelectedModule(data.moduleId.toString());
      const moduleObj = trees.find((tree: any) => tree.id === data.moduleId);
      if (moduleObj) {
        // Verifica se moduleObj está definido
        setManualToUpdate((prevState) => ({
          ...prevState,
          moduleSlug: moduleObj.slug,
        }));
      }
    }
    setIsEditing(true);
  }, [data, trees]);
  const resetUpdateStates = useCallback(() => {
    setIsEditing(false);
    setManualToUpdate(null);
  }, []);
  const handleModuleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const moduleId = e.target.value;
      const moduleObj = trees.find(
        (tree: any) => tree.id.toString() === moduleId
      );
      setSelectedModule(moduleId);
      setManualToUpdate((prevState) => ({
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
      if (sectionId === "") {
        setManualToUpdate((prevState) => ({
          ...prevState,
          moduleId:
            moduleObj && selectedModule ? parseInt(selectedModule, 10) : null,
          moduleSlug: moduleObj ? moduleObj.slug : null,
          sectionId: null,
          sectionSlug: null,
          slug: createManualSlug(
            prevState?.name || "",
            prevState?.moduleSlug || null,
            null
          ),
        }));
      } else {
        const section = moduleObj?.sections.find(
          (sec: any) => sec.id.toString() === sectionId
        );
        setManualToUpdate((prevState) => ({
          ...prevState,
          sectionId: section ? parseInt(sectionId, 10) : null,
          sectionSlug: section ? section.slug : null,
          slug: createManualSlug(
            prevState?.name || "",
            prevState?.moduleSlug || null,
            section?.slug || null
          ),
        }));
      }
    },
    [selectedModule, trees]
  );
  const handleContentEditorChange = useCallback(async (newData: string) => {
    setManualToUpdate((prevState) => ({
      ...prevState,
      content: newData || "",
    }));
  }, []);
  const handleUpdate = useCallback(async () => {
    if (!manualToUpdate || !data) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    try {
      const res = await adUpdateArticle(
        data.slug,
        manualToUpdate.name || "",
        manualToUpdate.slug || "",
        manualToUpdate.content || "",
        session?.user?.id!,
        manualToUpdate.moduleId || null,
        manualToUpdate.sectionId || null
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
      if (data.slug !== manualToUpdate.slug) {
        router.replace(`${manualToUpdate.slug}`);
      }
      resetUpdateStates();
      toast.success("Registro atualizado com sucesso");
    } catch (error) {
      resetUpdateStates();
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [data, manualToUpdate, resetUpdateStates, router, session?.user?.id]);
  const handleDelete = useCallback(async () => {
    try {
      await adDeleteArticle(data.slug);
      router.replace("/");
      router.refresh();
      toast.success("Registro excluído com sucesso");
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [data.slug, router]);
  return (
    <>
      <EditorResourcesTools
        resourceIsActive={data.active}
        resourceIsEditing={isEditing}
        toggleVisibilityFunction={() => handleToggleVisibility()}
        editFunction={() => prepareUpdateStates()}
        deleteFunction={() => {
          if (document) {
            (
              document.getElementById("deleteModal") as HTMLFormElement
            ).showModal();
          }
        }}
        cancelFunction={resetUpdateStates}
        saveFunction={handleUpdate}
      />
      {isEditing ? (
        <div
          className={`mb-6 collapse bg-base-300 collapse-plus break-all ${
            data.active || isEditing ? "" : "opacity-30"
          }`}
        >
          <div className="border rounded-box border-primary">
            <div className="flex flex-col gap-3 p-3">
              <label className="input w-full flex items-center gap-2">
                Título
                <input
                  type="text"
                  autoFocus
                  value={manualToUpdate?.name || ""}
                  onChange={(e) =>
                    setManualToUpdate((prevState) => ({
                      ...prevState,
                      name: e.target.value || "",
                      slug: createManualSlug(
                        e.target.value || "",
                        manualToUpdate?.moduleSlug || null,
                        manualToUpdate?.sectionSlug || null
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
                      value={manualToUpdate?.sectionId || ""}
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
                  value={manualToUpdate?.slug || ""}
                  disabled
                  className="grow font-bold"
                />
              </label>
            </div>
            <ContentEditor
              data={manualToUpdate?.content || ""}
              id="manual-editing"
              setData={handleContentEditorChange}
            />
          </div>
        </div>
      ) : (
        <ContentParser data={data.content} />
      )}
      <DeleteModal
        deleteFunction={() => handleDelete()}
        cancelFunction={() => null}
      />
    </>
  );
});

export default ManualEditor;
