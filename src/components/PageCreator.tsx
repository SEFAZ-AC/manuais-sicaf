"use client";

import Loading from "@/app/(root)/loading";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EditorResourcesTools from "./EditorResourcesTools";
import { adCreatePage } from "@/services/pageService";
import { useSession } from "next-auth/react";
import LinkButton from "./LinkButton";
import DynamicIcon from "./DynamicIcon";
import { createPageSlug } from "@/utils/parseSlug";

const ContentEditor = dynamic(() => import("./ContentEditor"), {
  ssr: false,
  loading: () => <Loading />,
});

const PageCreator = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [pageToCreate, setPageToCreate] = useState<{
    name?: string;
    slug?: string;
    icon?: string;
    content?: string;
  } | null>(null);
  const handleContentEditorChange = useCallback(async (newData: string) => {
    setPageToCreate((prevState) => ({
      ...prevState,
      content: newData || "",
    }));
  }, []);
  const handleCreate = useCallback(async () => {
    if (!pageToCreate || !session) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    try {
      const res = await adCreatePage(
        pageToCreate.name || "",
        pageToCreate.slug || "",
        pageToCreate.icon || "",
        pageToCreate.content || "",
        session?.user?.id!
      );
      if (res === "conflict") {
        toast.error(
          "Já existe uma página com este título, por favor escolha outro"
        );
        return;
      }
      if (res === "forbidden") {
        toast.error(
          "Este termo é reservado pelo sistema. Por favor escolha outro título para a página"
        );
        return;
      }
      router.replace(pageToCreate.slug || "/");
      toast.success("Registro criado com sucesso");
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [pageToCreate, router, session]);
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
                value={pageToCreate?.name || ""}
                onChange={(e) =>
                  setPageToCreate((prevState) => ({
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
                  value={pageToCreate?.slug || ""}
                  disabled
                  className="grow font-bold"
                />
              </label>
              <div className="flex gap-3 items-center w-full">
                <label className="input input-sm w-full flex items-center gap-2">
                  Ícone
                  <input
                    type="text"
                    value={pageToCreate?.icon || ""}
                    onChange={(e) =>
                      setPageToCreate((prevState) => ({
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
          <ContentEditor
            data=""
            id="page-creating"
            setData={handleContentEditorChange}
          />
        </div>
      </div>
    </>
  );
};

export default PageCreator;
