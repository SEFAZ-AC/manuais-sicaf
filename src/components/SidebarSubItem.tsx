"use client";

import Link from "next/link";
import DynamicIcon from "./DynamicIcon";
import { closeDrawer } from "@/utils/closeDrawer";
import { usePathname } from "next/navigation";

const SidebarSubItem = ({
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
    <li className="w-full join join-vertical hover:bg-base-content hover:bg-opacity-10">
      {dropdown ? (
        <div
          className={`${
            disabled ? "line-through opacity-50" : ""
          } collapse collapse-arrow join-item`}
        >
          <input type="radio" name="accordion-1" className="peer" />
          <div className="flex items-center gap-3 text-sm font-medium collapse-title peer-checked:bg-base-200">
            {icon && <DynamicIcon name={icon} size="sm" />}
            <p>{text}</p>
          </div>
          <div className="p-0 collapse-content peer-checked:bg-base-200 ps-2">
            <ul className="p-0 px-2">{children}</ul>
          </div>
        </div>
      ) : (
        <Link
          href={link || ""}
          onClick={closeDrawer}
          className={`flex items-center gap-3 text-sm font-medium link collapse-title ${
            pathname === link ? "text-primary" : ""
          } ${disabled ? "line-through opacity-50" : ""}`}
        >
          {icon && <DynamicIcon name={icon} size="sm" />}
          <p>{text}</p>
        </Link>
      )}
    </li>
  );
};

export default SidebarSubItem;
