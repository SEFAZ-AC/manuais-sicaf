import { signOut } from "next-auth/react";
import DynamicIcon from "./DynamicIcon";
import { getBasePath } from "@/utils/getBasePath";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: getBasePath() })}
      className="btn btn-ghost flex items-center gap-2 cursor-pointer tooltip tooltip-bottom"
      data-tip="Sair"
    >
      <DynamicIcon name="log-out" />
    </button>
  );
};

export default SignOutButton;
