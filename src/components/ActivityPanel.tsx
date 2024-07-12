import ActivityMostViewed from "./ActivityMostViewed";
import ActivityTopbar from "./ActivityTopbar";
import ActivityUsers from "./ActivityUsers";

const ActivityPanel = ({
  metrics,
  isAdmin,
}: {
  metrics: any;
  isAdmin: boolean;
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-3 relative">
      <ActivityTopbar metrics={metrics} />
      <div className="flex flex-col 2xl:flex-row gap-3">
        <div className="w-full h-[400px] xl:h-[600px]">
          <ActivityMostViewed metrics={metrics} />
        </div>
        {isAdmin ? (
          <div className="w-full h-[400px] xl:h-[600px]">
            <ActivityUsers metrics={metrics} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ActivityPanel;
