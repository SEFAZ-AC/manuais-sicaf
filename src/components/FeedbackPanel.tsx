"use client";

import {
  // adDeleteFeedback,
  adMarkAllFeedbackAsRead,
  adMarkFeedbackAsRead,
} from "@/services/feedbackService";
import ActionButton from "./ActionButton";
import DynamicIcon from "./DynamicIcon";
import { toast } from "react-toastify";
import LinkButton from "./LinkButton";
import ActivityTitle from "./ActivityTitle";
import { dateFormatter } from "@/utils/dateFormatter";

const FeedbackPanel = ({ feedbacks }: { feedbacks: any }) => {
  const handleMarkFeedbackAsRead = async (id: number) => {
    try {
      await adMarkFeedbackAsRead(id);
      toast.success("Registro marcado como lido");
    } catch (error) {
      toast.error("Ops.. Algo deu errado");
    }
  };
  const handleMarkAllFeedbackAsRead = async () => {
    try {
      await adMarkAllFeedbackAsRead();
      toast.success("Todos os registros marcados como lidos");
    } catch (error) {
      toast.error("Ops.. Algo deu errado");
    }
  };
  // const handleDeleteFeedback = async (id: number) => {
  //   try {
  //     await adDeleteFeedback(id);
  //     toast.success("Registro excluído com sucesso");
  //   } catch (error) {
  //     toast.error("Ops.. Algo deu errado");
  //   }
  // };
  return (
    <div className="bg-base-100 rounded-box p-3 flex flex-col gap-3 h-full w-full z-50">
      <ActivityTitle text="Feedbacks" />
      <div className="w-fit flex items-center gap-3 mb-6">
        <LinkButton
          outline
          text="Fechar"
          icon={<DynamicIcon name="x" />}
          to="/dashboard/atividade"
        />
        {feedbacks.some((feedback: any) => feedback.new) && (
          <ActionButton
            color="success"
            outline
            text="Marcar todos como lidos"
            icon={<DynamicIcon name="check" />}
            action={() => handleMarkAllFeedbackAsRead()}
          />
        )}
      </div>
      {feedbacks && feedbacks.length > 0
        ? feedbacks.map((feedback: any, i: number) => (
            <div
              key={i}
              role="alert"
              className={`relative rounded-none alert shadow-lg border border-gray-300 ${
                feedback.isPositive
                  ? "bg-success bg-opacity-5 text-success"
                  : "bg-error bg-opacity-5 text-error"
              } ${feedback.new ? "opacity-100" : "opacity-70"}`}
            >
              <DynamicIcon
                name={feedback.isPositive ? "thumbs-up" : "thumbs-down"}
              />
              <div className="text-base-content w-full">
                <div className="flex items-center gap-3 justify-between px-2">
                  <p className="text-xs">
                    {feedback.article
                      ? feedback.article.slug
                      : feedback.faq
                      ? "/faq#" + feedback.faq.slug
                      : ""}
                  </p>
                  <p className="text-xs italic">
                    {dateFormatter(feedback.createdAt)}
                  </p>
                </div>
                <div className="divider my-1 p-0"></div>
                <h3 className={feedback.new ? "font-bold" : ""}>
                  {feedback.email || "(sem identificação)"}
                </h3>
                <div className="text-xs">
                  {feedback.feedback || "(sem mensagem)"}
                </div>
              </div>
              {feedback.new && (
                <ActionButton
                  color="success"
                  outline
                  size="xs"
                  icon={<DynamicIcon name="check" />}
                  action={() => handleMarkFeedbackAsRead(feedback.id)}
                  tooltip="Marcar como lido"
                />
              )}
              {/* <ActionButton
                color="error"
                outline
                size="xs"
                icon={<DynamicIcon name="trash" />}
                action={() => handleDeleteFeedback(feedback.id)}
                tooltip="Excluir"
              /> */}
              {feedback.new ? (
                <div className="absolute -top-2.5 -left-2.5 text-secondary scale-150">
                  <DynamicIcon name="loader" size="lg" />
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        : ""}
    </div>
  );
};

export default FeedbackPanel;
