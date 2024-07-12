import AdminPageTitlePortal from "@/components/AdminPageTitlePortal";
import UserPanel from "@/components/UserPanel";
import { authOptions } from "@/lib/authOptions";
import { adGetUser } from "@/services/userService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UserPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const user = await adGetUser(session.user.id);
  if (!user) redirect("/");
  return (
    <div className="flex flex-col items-center justify-start flex-1 w-full h-full min-h-[95vh]">
      <UserPanel user={user} />
      <AdminPageTitlePortal
        text={session.user.admin ? "Contas de usuário" : "Minha conta"}
        icon={session.user.admin ? "users" : "user"}
      />
    </div>
  );
};

export default UserPage;
