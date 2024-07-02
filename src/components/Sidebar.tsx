"use client";

import { useStickyBox } from "react-sticky-box";

const Sidebar = ({ children }: { children: any }) => {
  const stickyBox = useStickyBox({ offsetTop: 20, offsetBottom: 20 });
  return (
    <aside
      ref={stickyBox}
      className="overflow-y-auto min-h-[75vh] max-h-[95vh] bg-base-200 w-80 lg:block hidden"
    >
      {children}
    </aside>
  );
};

export default Sidebar;
