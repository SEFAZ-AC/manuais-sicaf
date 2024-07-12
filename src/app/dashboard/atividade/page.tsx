import ActivityPanel from "@/components/ActivityPanel";
import AdminPageTitlePortal from "@/components/AdminPageTitlePortal";
import { authOptions } from "@/lib/authOptions";
import { getFeedbackMetrics } from "@/services/feedbackService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ActivityPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const metrics = await getFeedbackMetrics();
  return (
    <div className="flex flex-col items-center justify-start flex-1 w-full h-full min-h-[95vh]">
      <ActivityPanel isAdmin={session.user.admin} metrics={metrics} />
      <AdminPageTitlePortal text="Atividade e Feedback" icon="activity" />
    </div>
  );
};

export default ActivityPage;
