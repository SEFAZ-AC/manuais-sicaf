"use client";

import Loading from "@/app/(root)/loading";
import dynamic from "next/dynamic";
import ActionButton from "./ActionButton";
import DynamicIcon from "./DynamicIcon";
import {
  adCreateFaq,
  adDeleteFaq,
  adToggleFaqVisibility,
  adUpdateFaq,
} from "@/services/faqService";
import { useState, useCallback, memo, Fragment } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import DeleteModal from "./DeleteModal";
import EditorResourcesTools from "./EditorResourcesTools";
import FaqAccordion from "./FaqAccordion";
import { useSession } from "next-auth/react";
import { createSlug } from "@/utils/parseSlug";

const ContentEditor = dynamic(() => import("./ContentEditor"), {
  ssr: false,
  loading: () => <Loading />,
});

const FaqEditor = memo(function FaqEditor({ data }: { data: any }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [creatingNewItem, setCreatingNewItem] = useState<boolean>(false);
  const [newAskToCreate, setNewAskToCreate] = useState<string>("");
  const [newAnswerToCreate, setNewAnswerToCreate] = useState<string>("");
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [itemToUpdate, setItemToUpdate] = useState<{
    ask: string;
    answer: string;
    id: number;
    active: boolean;
  } | null>(null);
  const [askToUpdate, setAskToUpdate] = useState<string>("");
  const [answerToUpdate, setAnswerToUpdate] = useState<string>("");
  const resetCreatingStates = useCallback(() => {
    setCreatingNewItem(false);
    setNewAskToCreate("");
    setNewAnswerToCreate("");
  }, []);
  const handleCreateItem = useCallback(async () => {
    if (
      !creatingNewItem ||
      newAskToCreate?.trim().length === 0 ||
      newAnswerToCreate?.trim().length === 0
    ) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    try {
      await adCreateFaq(
        newAskToCreate,
        createSlug(newAskToCreate),
        newAnswerToCreate,
        session?.user?.id!
      );
      resetCreatingStates();
      toast.success("Registro criado com sucesso");
    } catch (error) {
      resetCreatingStates();
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [
    creatingNewItem,
    newAnswerToCreate,
    newAskToCreate,
    resetCreatingStates,
    router,
    session?.user?.id,
  ]);
  const handleToggleItemVisibility = useCallback(
    async (id: number) => {
      try {
        const res = await adToggleFaqVisibility(id);
        toast.success(`Registro ${res ? "publicado" : "ocultado"} com sucesso`);
      } catch (error) {
        router.refresh();
        toast.error("Ops.. Algo deu errado");
      }
    },
    [router]
  );
  const prepareUpdateStates = useCallback(
    (item: {
      ask: string;
      answer: string;
      user: { name: string; avatar: string | null };
      updatedAt: Date;
      id: number;
      active: boolean;
    }) => {
      resetCreatingStates();
      setItemToUpdate(item);
      setAskToUpdate(item.ask);
      setAnswerToUpdate(item.answer);
    },
    [resetCreatingStates]
  );
  const resetUpdateStates = useCallback(() => {
    setItemToUpdate(null);
    setAskToUpdate("");
    setAnswerToUpdate("");
  }, []);
  const handleUpdateItem = useCallback(async () => {
    if (!itemToUpdate || !askToUpdate || !answerToUpdate) {
      toast.error("Ops.. Algo deu errado");
      return;
    }
    try {
      await adUpdateFaq(
        itemToUpdate.id,
        askToUpdate,
        createSlug(askToUpdate),
        answerToUpdate,
        session?.user?.id!
      );
      resetUpdateStates();
      toast.success("Registro atualizado com sucesso");
    } catch (error) {
      resetUpdateStates();
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [
    itemToUpdate,
    askToUpdate,
    answerToUpdate,
    session?.user?.id,
    resetUpdateStates,
    router,
  ]);
  const handleDeleteItem = useCallback(async () => {
    if (!itemToDelete) return;
    try {
      await adDeleteFaq(itemToDelete);
      setItemToDelete(null);
      toast.success("Registro excluído com sucesso");
    } catch (error) {
      setItemToDelete(null);
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  }, [itemToDelete, router]);
  return (
    <>
      <div
        className={`flex flex-col gap-6 w-full ${
          creatingNewItem ? "items-start" : ""
        }`}
      >
        {creatingNewItem ? (
          <Fragment key="creatingNewFaq">
            <EditorResourcesTools
              resourceIsActive={false}
              resourceIsEditing={true}
              toggleVisibilityFunction={() => null}
              editFunction={() => null}
              deleteFunction={() => null}
              cancelFunction={() => resetCreatingStates()}
              saveFunction={handleCreateItem}
            />
            <div className="border rounded-box bg-base-300 border-primary w-full break-all">
              <div className="p-3 flex flex-col gap-3">
                <label className="input w-full flex items-center gap-2">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Digite a pergunta"
                    value={newAskToCreate}
                    onChange={(e) => setNewAskToCreate(e.target.value)}
                    className="grow font-bold text-xl"
                  />
                </label>
                <div className="flex flex-col xl:flex-row gap-3">
                  <label className="input input-sm w-full flex items-center gap-2">
                    URL
                    <input
                      type="text"
                      value={
                        newAskToCreate
                          ? `${process.env.NEXT_PUBLIC_URL}/faq#${createSlug(
                              newAskToCreate
                            )}`
                          : ""
                      }
                      disabled
                      className="grow font-bold"
                    />
                  </label>
                </div>
                <ContentEditor
                  data=""
                  id="faq-new"
                  setData={setNewAnswerToCreate}
                />
              </div>
            </div>
          </Fragment>
        ) : (
          <ActionButton
            icon={<DynamicIcon name="plus" size="lg" />}
            text="Criar FAQ"
            color="primary"
            outline
            action={() => {
              resetUpdateStates();
              setCreatingNewItem(true);
            }}
          />
        )}
      </div>
      {data.map(
        (item: {
          ask: string;
          slug: string;
          answer: string;
          user: { name: string; avatar: string | null };
          updatedAt: Date;
          id: number;
          active: boolean;
          _count: number;
        }) => (
          <Fragment key={item.id}>
            <EditorResourcesTools
              resourceIsActive={item.active}
              resourceIsEditing={itemToUpdate?.id === item.id}
              toggleVisibilityFunction={() =>
                handleToggleItemVisibility(item.id)
              }
              editFunction={() => prepareUpdateStates(item)}
              deleteFunction={() => {
                setItemToDelete(item.id);
                if (document) {
                  (
                    document.getElementById("deleteModal") as HTMLFormElement
                  ).showModal();
                }
              }}
              cancelFunction={resetUpdateStates}
              saveFunction={handleUpdateItem}
            />
            <div
              className={`-mt-5 mb-6 collapse bg-base-300 collapse-plus break-all ${
                item.active || itemToUpdate?.id === item.id ? "" : "opacity-30"
              }`}
            >
              {itemToUpdate?.id === item.id ? (
                <div className="border rounded-box border-primary">
                  <div className="p-3 flex flex-col gap-3">
                    <label className="input w-full flex items-center gap-2">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Digite a pergunta"
                        value={askToUpdate}
                        onChange={(e) => setAskToUpdate(e.target.value)}
                        className="grow font-bold text-xl"
                      />
                    </label>
                    <div className="flex flex-col xl:flex-row gap-3">
                      <label className="input input-sm w-full flex items-center gap-2">
                        URL
                        <input
                          type="text"
                          value={
                            askToUpdate
                              ? `${
                                  process.env.NEXT_PUBLIC_URL
                                }/faq#${createSlug(askToUpdate)}`
                              : ""
                          }
                          disabled
                          className="grow font-bold"
                        />
                      </label>
                    </div>
                    <ContentEditor
                      data={item.answer}
                      id={`faq-${item.id}`}
                      setData={setAnswerToUpdate}
                    />
                  </div>
                </div>
              ) : (
                <FaqAccordion item={item} admin />
              )}
            </div>
          </Fragment>
        )
      )}
      <DeleteModal
        deleteFunction={handleDeleteItem}
        cancelFunction={() => setItemToDelete(null)}
      />
    </>
  );
});

export default FaqEditor;
