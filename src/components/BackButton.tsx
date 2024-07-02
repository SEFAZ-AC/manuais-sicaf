"use client";

import { useRouter } from "next/navigation";
import DynamicIcon from "./DynamicIcon";

const BackButton = ({
  color,
  size,
  outline,
  glass,
  uppercase,
}: {
  color?:
    | "primary"
    | "secondary"
    | "neutral"
    | "ghost"
    | "success"
    | "warning"
    | "error";
  size?: "xs" | "sm" | "lg";
  outline?: boolean;
  glass?: boolean;
  uppercase?: boolean;
}) => {
  const router = useRouter();
  return (
    <button
      className={`btn ${(() => {
        switch (color) {
          case "primary":
            return "btn-primary text-base-300";
          case "secondary":
            return "btn-secondary text-neutral";
          case "neutral":
            return "btn-neutral";
          case "ghost":
            return "btn-ghost";
          case "success":
            return "btn-success";
          case "warning":
            return "btn-warning";
          case "error":
            return "btn-error";
          default:
            return "";
        }
      })()} ${(() => {
        switch (size) {
          case "xs":
            return "btn-xs lg:btn-sm";
          case "sm":
            return "btn-sm lg:btn-md";
          case "lg":
            return "btn-lg";
          default:
            return "";
        }
      })()} ${outline && "btn-outline"} 
      ${glass && "glass"}
      ${uppercase && "uppercase"}`}
      onClick={() => router.back()}
    >
      <span>
        <DynamicIcon name="arrow-left" />
      </span>
      <span> Voltar</span>
    </button>
  );
};

export default BackButton;
