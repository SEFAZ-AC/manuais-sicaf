import DrawerOverlay from "@/components/DrawerOverlay";
import DynamicIcon from "@/components/DynamicIcon";
import Sidebar from "@/components/Sidebar";
import SidebarContent from "@/components/SidebarContent";
import SidebarMobile from "@/components/SidebarMobile";
import TopBar from "@/components/TopBar";
import { Suspense } from "react";
import Loading from "./loading";
import AdminSidebarContent from "@/components/AdminSidebarContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const MainLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-6 w-full h-full min-h-[95vh]">
      <TopBar />
      <div className="flex items-center w-full h-1 px-2 sm:px-4 md:px-12 xl:px-32 bg-gradient-to-r from-primary to-secondary">
        <div className="flex items-center gap-3 px-4 font-bold lg:text-xl bg-base-100">
          <DynamicIcon name="book" size="lg" />
          <h1>Manuais de Usuário - SICAF</h1>
        </div>
      </div>
      <main className="mt-6 h-full min-h-[80vh] flex gap-4 p-0 lg:pt-6 lg:px-6 mx-2 sm:mx-6 md:mx-12 xl:mx-32">
        <Sidebar>
          <Suspense fallback={<Loading />}>
            {session ? <AdminSidebarContent /> : <SidebarContent />}
          </Suspense>
        </Sidebar>
        <div className="drawer drawer-end">
          <input id="drawer" type="checkbox" className="drawer-toggle" />
          <Suspense fallback={<Loading />}>
            <div className="p-3 drawer-content bg-base-200">{children}</div>
          </Suspense>
          <div className="drawer-side z-[9999]">
            <DrawerOverlay />
            <SidebarMobile />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
