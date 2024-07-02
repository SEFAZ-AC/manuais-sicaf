"use client";

import Link from "next/link";
import DynamicIcon from "./DynamicIcon";
import { closeDrawer } from "@/utils/closeDrawer";
import { usePathname } from "next/navigation";

const SidebarItem = ({
  text,
  link,
  children,
  dropdown,
  icon,
  disabled,
}: {
  text: string;
  link?: string;
  children?: React.ReactNode;
  dropdown?: boolean;
  icon?: string;
  disabled?: boolean;
}) => {
  const pathname = usePathname();
  return (
    <li className="hover:bg-base-content hover:bg-opacity-10">
      {dropdown ? (
        <div
          className={`${
            disabled ? "line-through opacity-50" : ""
          } collapse collapse-arrow join-item`}
        >
          <input type="radio" name="accordion" className="peer" />
          <div className="flex items-center gap-3 text-sm font-bold collapse-title peer-checked:bg-base-300">
            {icon && <DynamicIcon name={icon} />}
            <p>{text}</p>
          </div>
          <div className="collapse-content peer-checked:bg-base-300">
            <ul>{children}</ul>
          </div>
        </div>
      ) : (
        <Link
          href={link || ""}
          onClick={closeDrawer}
          className={`flex items-center gap-3 text-sm font-bold link collapse-title ${
            pathname === link ? "text-primary" : ""
          } ${disabled ? "line-through opacity-50" : ""}`}
        >
          {icon && <DynamicIcon name={icon} />}
          <p>{text}</p>
        </Link>
      )}
    </li>
  );
};

export default SidebarItem;
