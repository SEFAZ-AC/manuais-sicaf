"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DynamicIcon from "./DynamicIcon";

const AdminPageTitlePortal = ({
  text,
  icon,
}: {
  text: string;
  icon: string;
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const pageTitleElement = isClient
    ? document.getElementById("pageTitle")
    : null;
  return (
    <>
      {pageTitleElement
        ? createPortal(
            <>
              <DynamicIcon name={icon} size="lg" />
              <h1>{text}</h1>
            </>,
            pageTitleElement
          )
        : ""}
    </>
  );
};

export default AdminPageTitlePortal;
