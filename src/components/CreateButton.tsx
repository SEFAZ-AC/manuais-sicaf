"use client";

import { closeDrawer } from "@/utils/closeDrawer";
import DynamicIcon from "./DynamicIcon";
import LinkButton from "./LinkButton";

const CreateButton = ({
  to,
  text,
  size,
}: {
  to: string;
  text: string;
  size?: "xs" | "sm" | "lg";
}) => {
  return (
    <li onClick={closeDrawer} className="flex-1 h-full w-full">
      <LinkButton
        to={to}
        icon={<DynamicIcon name="plus" size="lg" />}
        text={text}
        color="primary"
        outline
        size={size}
      />
    </li>
  );
};

export default CreateButton;
