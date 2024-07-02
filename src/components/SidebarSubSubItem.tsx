"use client";

import Link from "next/link";
import DynamicIcon from "./DynamicIcon";
import { closeDrawer } from "@/utils/closeDrawer";
import { usePathname } from "next/navigation";

const SidebarSubSubItem = ({
  text,
  link,
  icon,
  disabled,
}: {
  text: string;
  link: string;
  icon?: string;
  disabled?: boolean;
}) => {
  const pathname = usePathname();
  return (
    <li className="hover:bg-base-content hover:bg-opacity-10">
      <Link
        href={link}
        onClick={closeDrawer}
        className={`flex items-center text-xs gap-3 p-0 px-2 py-1.5 link ${
          pathname === link ? "text-primary" : ""
        } ${disabled ? "line-through opacity-50" : ""}`}
      >
        {icon && <DynamicIcon name={icon} size="xs" />}
        <p>{text}</p>
      </Link>
    </li>
  );
};

export default SidebarSubSubItem;
