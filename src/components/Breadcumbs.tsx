import React from "react";
import DynamicIcon from "@/components/DynamicIcon";

const Breadcrumbs = ({
  item,
}: {
  item: {
    name: string;
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
    <div className="text-xs breadcrumbs flex-none overflow-hidden">
      <ul>
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1">
            <DynamicIcon name={crumb.icon} size="xs" />
            {crumb.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
