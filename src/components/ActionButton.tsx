"use client";

const ActionButton = ({
  text,
  tooltip,
  icon,
  type,
  color,
  size,
  outline,
  glass,
  uppercase,
  join,
  disabled,
  action,
}: {
  text?: string;
  tooltip?: string;
  icon?: React.ReactElement;
  type?: "submit" | "button" | "reset";
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
  join?: boolean;
  disabled?: boolean;
  action?: () => void;
}) => {
  return (
    <button
      className={`btn flex items-center z-50 ${(() => {
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
      })()} ${outline ? "btn-outline" : ""} 
      ${glass ? "glass" : ""} 
      ${uppercase ? "uppercase" : ""}
      ${tooltip ? "tooltip tooltip-bottom" : ""}
      ${join ? "join-item" : ""}`}
      onClick={() => {
        action ? action() : null;
      }}
      type={type || "button"}
      disabled={disabled}
      data-tip={tooltip || ""}
    >
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default ActionButton;
