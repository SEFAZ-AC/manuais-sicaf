"use client";

import DynamicIcon from "@/components/DynamicIcon";
import Link from "next/link";
import ActionButton from "@/components/ActionButton";
import { useState } from "react";
import { createFeedback } from "@/services/feedbackService";
import FeedbackSentImage from "./FeedbackSentImage";

const FeedbackForm = ({
  resource,
  resourceId,
}: {
  resource: "faq" | "article";
  resourceId: number;
}) => {
  const [thereIsFeedback, setThereIsFeedback] = useState<
    "positive" | "negative" | null
  >(null);
  const [feedback, setFeedback] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const clearFeedback = () => {
    setThereIsFeedback(null);
    setFeedback("");
    setEmail("");
  };
  const sendFeedback = async () => {
    try {
      await createFeedback(
        thereIsFeedback === "positive",
        feedback,
        email,
        resource,
        resourceId
      );
      setThereIsFeedback(null);
      setFeedback("");
      setEmail("");
      setFeedbackSent(true);
    } catch (error) {
      setThereIsFeedback(null);
      setFeedback("");
      setEmail("");
      setFeedbackSent(true);
    }
  };
  return (
    <>
      <div className="w-full my-1 divider"></div>
      <div className="w-full xl:px-12 flex flex-col xl:flex-row justify-between gap-3 text-sm">
        {feedbackSent ? (
          <div className="flex flex-col gap-3 w-full md:max-w-[80%] xl:max-w-[60%] mx-auto flex-none items-center justify-center">
            <h1 className="text-2xl font-bold text-center mb-6">
              Obrigado! Recebemos seus comentários.
            </h1>
            <FeedbackSentImage />
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full md:max-w-[80%] xl:max-w-[60%] mx-auto items-center xl:items-start flex-none">
            {thereIsFeedback ? (
              <div className="flex flex-col items-center xl:items-start gap-3 w-full">
                {thereIsFeedback === "positive" ? (
                  <>
                    <p className="text-center xl:text-start font-bold">
                      Que bom saber disso!
                    </p>
                    <p className="text-center xl:text-start">
                      Gostaria de nos contar o que lhe agradou?
                    </p>
                  </>
                ) : thereIsFeedback === "negative" ? (
                  <>
                    <p className="text-center xl:text-start">
                      Sentimos muito por isso...
                    </p>
                    <p className="text-center xl:text-start font-bold">
                      Por favor, conte-nos o que não lhe agradou:
                    </p>
                  </>
                ) : (
                  ""
                )}
                <textarea
                  className="textarea textarea-bordered w-full h-24"
                  placeholder="(Opcional)"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <p className="text-center text-xs xl:text-start mt-3">
                  Se for possível entrar em contato com você para fazermos mais
                  perguntas, informe um endereço de email / telefone
                </p>
                <input
                  type="text"
                  placeholder="(Opcional)"
                  className="input input-bordered w-full input-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex gap-3 justify-center xl:justify-end w-full p-3">
                  <ActionButton
                    color={thereIsFeedback === "positive" ? "success" : "error"}
                    text="Enviar"
                    icon={
                      <DynamicIcon
                        name={
                          thereIsFeedback === "positive"
                            ? "thumbs-up"
                            : "thumbs-down"
                        }
                      />
                    }
                    action={() => sendFeedback()}
                  />
                  <ActionButton
                    outline
                    text="Cancelar"
                    icon={<DynamicIcon name="x" />}
                    action={() => clearFeedback()}
                  />
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bold">O que você achou desse conteúdo?</h3>
                <div className="join">
                  <ActionButton
                    join
                    outline
                    icon={<DynamicIcon name="thumbs-up" />}
                    action={() => setThereIsFeedback("positive")}
                  />
                  <ActionButton
                    join
                    outline
                    icon={<DynamicIcon name="thumbs-down" />}
                    action={() => setThereIsFeedback("negative")}
                  />
                </div>
              </>
            )}
          </div>
        )}
        <div className="divider w-1/2 mx-auto h-1/2 xl:divider-horizontal"></div>
        <div className="flex flex-col gap-3 w-full items-center xl:items-end">
          <h3 className="font-bold text-end">Ainda precisa de ajuda?</h3>
          <Link
            className="link flex items-center gap-2 text-sm"
            href="https://wa.me/5568992315316"
            target="_blank"
          >
            <DynamicIcon name="phone" size="sm" />
            Falar com Suporte
          </Link>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
