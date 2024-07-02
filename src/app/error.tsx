"use client";

import JointSignature from "@/components/JointSignature";
import { useEffect } from "react";
import BasicActions from "@/components/BasicActions";
import GenericErrorImage from "@/components/GenericErrorImage";
import ErrorText from "@/components/ErrorText";
import ToggleThemeButton from "@/components/ToggleThemeButton";

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="grid items-center flex-1 gap-12 w-full lg:grid-cols-2 px-2 py-6 sm:px-6 md:px-12 xl:px-32 min-h-[95vh]">
      <div className="flex flex-col items-center gap-12 text-center lg:items-start">
        <ErrorText text="Não conseguimos atender sua solicitação agora. Por favor, tente novamente em alguns minutos." />
        <BasicActions />
        <div className="h-16">
          <JointSignature />
        </div>
      </div>
      <GenericErrorImage />
      <div className="absolute top-5 right-5">
        <ToggleThemeButton />
      </div>
    </main>
  );
};

export default Error;
