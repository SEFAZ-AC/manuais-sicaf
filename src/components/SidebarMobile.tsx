import { authOptions } from "@/lib/authOptions";
import SidebarContent from "./SidebarContent";
import { getServerSession } from "next-auth";
import AdminSidebarContent from "./AdminSidebarContent";
import EditorModeTools from "./EditorModeTools";
import { Suspense } from "react";
import Loading from "@/app/(root)/loading";

const SidebarMobile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-full p-4 w-80 bg-base-200">
      <Suspense fallback={<Loading />}>
        {session ? (
          <div className="flex flex-col gap-12">
            <EditorModeTools mobile admin={session.user.admin} />
            <AdminSidebarContent />
          </div>
        ) : (
          <SidebarContent />
        )}
      </Suspense>
    </div>
  );
};

export default SidebarMobile;
