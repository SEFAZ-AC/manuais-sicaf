"use client";

import logoVerticalGreen from "../assets/images/conjunto-verde-vertical.png";
import logoVerticalWhite from "../assets/images/conjunto-branco-vertical.png";
import logoHorizontalGreen from "../assets/images/conjunto-verde-horizontal.png";
import logoHorizontalWhite from "../assets/images/conjunto-branco-horizontal.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBasePath } from "@/utils/getBasePath";

const JointSignature = ({
  vertical,
  dark,
  light,
}: {
  vertical?: boolean;
  dark?: boolean;
  light?: boolean;
}) => {
  const [theme, setTheme] = useState("");
  const basePath = getBasePath();
  const imageSrc = vertical
    ? (dark || theme === "dark") && !light
      ? logoVerticalWhite
      : logoVerticalGreen
    : (dark || theme === "dark") && !light
    ? logoHorizontalWhite
    : logoHorizontalGreen;
  useEffect(() => {
    const currentTheme =
      window.localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(currentTheme);
    const listenStorageChange = () => {
      if (localStorage.getItem("theme") === "light") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    };

    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, []);
  return (
    <>
      {theme || dark || light ? (
        <Image
          priority
          src={imageSrc.src}
          width={2000}
          height={2000}
          alt="Assinatura da Sefaz com o brasão do Estado do Acre e o slogan de governo."
          className="object-contain w-full h-full"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default JointSignature;
