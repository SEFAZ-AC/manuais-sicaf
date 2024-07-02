"use client";

import Loading from "@/app/(root)/loading";
import dynamic from "next/dynamic";
import { useState, useCallback, memo, Fragment } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import DeleteModal from "./DeleteModal";
import EditorResourcesTools from "./EditorResourcesTools";
import {
  adDeletePage,
  adTogglePageVisibility,
  adUpdateHome,
  adUpdatePage,
} from "@/services/pageService";
import ContentParser from "./ContentParser";
import { useSession } from "next-auth/react";
import LinkButton from "./LinkButton";
import DynamicIcon from "./DynamicIcon";
import { createPageSlug } from "@/utils/parseSlug";

const ContentEditor = dynamic(() => import("./ContentEditor"), {
  ssr: false,
  loading: () => <Loading />,
});

const PageEditor = memo(function PageEditor({ data }: { data: any }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pageToUpdate, setPageToUpdate] = useState<{
    name?: string;
    slug?: string;
    icon?: string;
    content?: string;
  } | null>(null);
  const handleToggleVisibility = useCallback(async () => {
    try {
      const res = await adTogglePageVisibility(data.slug);
      res === "forbidden"
        ? toast.error("Você não pode ocultar esta página")
        : toast.success(
            `Registro ${res ? "publicado" : "ocultado"} com sucesso`
          );
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [data.slug, router]);
  const prepareUpdateStates = useCallback(() => {
    setPageToUpdate(data);
    setIsEditing(true);
  }, [data]);
  const resetUpdateStates = useCallback(() => {
    setIsEditing(false);
    setPageToUpdate(null);
  }, []);
  const handleContentEditorChange = useCallback(async (newData: string) => {
    setPageToUpdate((prevState) => ({
      ...prevState,
      content: newData || "",
    }));
  }, []);
  const handleUpdate = useCallback(async () => {
    if (!pageToUpdate || !data) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    try {
      if (data.slug === "/") {
        await adUpdateHome(
          pageToUpdate.content || "",
          session?.user?.id || data.userId
        );
      } else {
        const res = await adUpdatePage(
          data.slug,
          pageToUpdate.name || "",
          pageToUpdate.slug || "",
          pageToUpdate.icon || "",
          pageToUpdate.content || "",
          session?.user?.id || data.userId
        );
        if (res === "conflict") {
          toast.error(
            "Já existe uma página com este título. Por favor escolha outro"
          );
          return;
        }
        if (res === "forbidden") {
          toast.error(
            "Este termo é reservado pelo sistema. Por favor escolha outro título para a página"
          );
          return;
        }
      }
      if (data.slug !== pageToUpdate.slug) {
        router.replace(`${pageToUpdate.slug}`);
      }
      resetUpdateStates();
      toast.success("Registro atualizado com sucesso");
    } catch (error) {
      resetUpdateStates();
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [data, pageToUpdate, resetUpdateStates, router, session?.user?.id]);
  const handleDelete = useCallback(async () => {
    try {
      const res = await adDeletePage(data.slug);
      if (res === "forbidden") {
        toast.error("Você não pode excluir esta página");
      } else {
        router.replace("/");
        router.refresh();
        toast.success("Registro excluído com sucesso");
      }
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
            {data.slug !== "/" ? (
              <div className="flex flex-col gap-3 p-3">
                <label className="input w-full flex items-center gap-2">
                  Título
                  <input
                    type="text"
                    autoFocus
                    value={pageToUpdate?.name || ""}
                    onChange={(e) =>
                      setPageToUpdate((prevState) => ({
                        ...prevState,
                        name: e.target.value || "",
                        slug: createPageSlug(e.target.value || ""),
                      }))
                    }
                    className="grow font-bold text-xl"
                  />
                </label>
                <div className="flex flex-col xl:flex-row gap-3">
                  <label className="input input-sm w-full flex items-center gap-2">
                    URL
                    <input
                      type="text"
                      value={pageToUpdate?.slug || ""}
                      disabled
                      className="grow font-bold"
                    />
                  </label>
                  <div className="flex gap-3 items-center w-full">
                    <label className="input input-sm w-full flex items-center gap-2">
                      Ícone
                      <input
                        type="text"
                        value={pageToUpdate?.icon || ""}
                        onChange={(e) =>
                          setPageToUpdate((prevState) => ({
                            ...prevState,
                            icon: e.target.value || "",
                          }))
                        }
                        className="grow font-bold"
                      />
                    </label>
                    <LinkButton
                      to="https://feathericons.com/"
                      icon={<DynamicIcon name="external-link" />}
                      size="xs"
                      openInNewTab
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <ContentEditor
              data={data.content}
              id={`page-${data.id}`}
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

export default PageEditor;
