"use client";

import { useEffect } from "react";
import BasicActions from "@/components/BasicActions";
import GenericErrorImage from "@/components/GenericErrorImage";
import ErrorText from "@/components/ErrorText";

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-12 p-3 text-center lg:gap-8">
      <ErrorText
        mini
        text="Algo deu errado. Por favor, verifique sua solicitação."
      />
      <BasicActions />
      <div className="w-full max-w-[400px] lg:max-w-[600px]">
        <GenericErrorImage />
      </div>
    </div>
  );
};

export default Error;
