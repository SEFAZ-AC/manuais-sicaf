"use client";

import { usePathname } from "next/navigation";
import DynamicIcon from "./DynamicIcon";
import LinkButton from "./LinkButton";
import SignOutButton from "./SignOutButton";
import { closeDrawer } from "@/utils/closeDrawer";
import { useEffect, useState } from "react";
import { adGetNewFeedbacksCount } from "@/services/feedbackService";

const EditorModeTools = ({ mobile }: { mobile?: boolean }) => {
  const [newFeedbacksCount, setNewFeedbacksCount] = useState<number | null>(
    null
  );
  const pathname = usePathname();
  useEffect(() => {
    const fetchFeedbacks = async () => {
      const count = await adGetNewFeedbacksCount();
      setNewFeedbacksCount(count);
    };
    fetchFeedbacks();
    const interval = setInterval(() => {
      adGetNewFeedbacksCount().then(setNewFeedbacksCount);
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <ul className="flex gap-6 justify-center items-center">
      {!mobile ? (
        <li>
          <LinkButton
            color="ghost"
            tooltip="Manuais de Usuário"
            icon={<DynamicIcon name="book" />}
            to="/"
          />
          {!pathname.includes("/dashboard") ? (
            <div className="bg-primary h-4 w-4 mask mask-triangle mx-auto"></div>
          ) : (
            ""
          )}
        </li>
      ) : (
        ""
      )}
      <li onClick={closeDrawer}>
        <div className="indicator">
          {newFeedbacksCount && newFeedbacksCount > 0 ? (
            <span className="indicator-item badge badge-secondary">
              {newFeedbacksCount}
            </span>
          ) : (
            ""
          )}
          <div>
            <LinkButton
              color="ghost"
              tooltip="Atividade e Feedback"
              icon={<DynamicIcon name="activity" />}
              to="/dashboard/atividade"
            />
            {pathname.includes("/dashboard/atividade") ? (
              <div className="bg-primary h-4 w-4 mask mask-triangle mx-auto"></div>
            ) : (
              ""
            )}
          </div>
        </div>
      </li>
      <li onClick={closeDrawer}>
        <LinkButton
          color="ghost"
          tooltip="Minha Conta"
          icon={<DynamicIcon name="user" />}
          to="/dashboard/conta"
        />
        {pathname.includes("/dashboard/conta") ? (
          <div className="bg-primary h-4 w-4 mask mask-triangle mx-auto"></div>
        ) : (
          ""
        )}
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
};

export default EditorModeTools;
