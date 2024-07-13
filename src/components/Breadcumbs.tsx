import React from "react";
import DynamicIcon from "@/components/DynamicIcon";

const Breadcrumbs = ({
  item,
}: {
  item: {
    name: string;
    updatedAt: Date;
    section: {
      name: string;
      module: {
        name: string;
      } | null;
    } | null;
    module: {
      name: string;
    } | null;
  };
}) => {
  const crumbs = [];
  if (item.section && item.section.module) {
    crumbs.push({
      name: item.section.module.name,
      icon: "folder",
    });
  }
  if (item.module) {
    crumbs.push({
      name: item.module.name,
      icon: "folder",
    });
  }
  if (item.section) {
    crumbs.push({
      name: item.section.name,
      icon: "folder",
    });
  }
  crumbs.push({
    name: item.name,
    icon: "file-text",
  });
  return (
    <div className="hidden text-gray-500 text-sm breadcrumbs overflow-hidden 2xl:flex flex-col w-full">
      <ul>
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1">
            <DynamicIcon name={crumb.icon} size="xs" />
            {crumb.name}
          </li>
        ))}
      </ul>
      <div className="divider m-0 p-0"></div>
    </div>
  );
};

export default Breadcrumbs;
