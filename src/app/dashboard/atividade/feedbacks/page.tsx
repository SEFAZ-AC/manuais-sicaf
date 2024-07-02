import FeedbackPanel from "@/components/FeedbackPanel";
import { authOptions } from "@/lib/authOptions";
import { adGetAllFeedbacks } from "@/services/feedbackService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const FeedbacksPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const data = await adGetAllFeedbacks();
  return (
    <div className="flex flex-col items-center justify-start flex-1 w-full h-full min-h-[95vh]">
      <FeedbackPanel feedbacks={data} />
    </div>
  );
};

export default FeedbacksPage;
