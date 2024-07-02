"use client";

import Link from "next/link";
import DynamicIcon from "./DynamicIcon";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const SignInLink = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  if (pathname === "/auth/signin" || session) return "";
  return (
    <Link
      href={`/auth/signin?callbackUrl=${pathname}`}
      className="absolute flex items-center gap-2 text-[8pt] right-1/2 translate-x-1/2 md:right-1 md:translate-x-0 bottom-1 link opacity-5 hover:opacity-50"
    >
      <DynamicIcon name="log-in" size="sm" />
      Modo de edição
    </Link>
  );
};

export default SignInLink;
