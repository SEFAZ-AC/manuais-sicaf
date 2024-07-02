import ActivityTitle from "./ActivityTitle";
import DynamicIcon from "./DynamicIcon";
import LinkButton from "./LinkButton";

const ActivityTopbar = ({ metrics }: { metrics: any }) => {
  return (
    <div className="bg-base-300 w-full rounded-box p-3 flex flex-col gap-3">
      <ActivityTitle text="Interação" />
      <div className="border-none stats stats-vertical 2xl:stats-horizontal  shadow w-full p-1 bg-base-100">
        <div className="stat hover:bg-base-content hover:bg-opacity-10">
          <div className="stat-figure">
            <DynamicIcon name="eye" size="lg" />
          </div>
          <div className="stat-title">Visitas Totais</div>
          <div className="stat-value">{metrics.totalGeneralViews}</div>
        </div>
        <div className="border-none stats stats-vertical 2xl:stats-horizontal w-full bg-base-200 p-1">
          <div className="stat hover:bg-base-content hover:bg-opacity-10">
            <div className="stat-figure">
              <DynamicIcon name="mail" size="lg" />
            </div>
            <div className="stat-title">Feedbacks Totais</div>
            <div className="stat-value">{metrics.totalFeedbacks}</div>
          </div>
          <div className="border-none stats stats-vertical xl:stats-horizontal w-full bg-base-300">
            <div className="stat hover:bg-base-content hover:bg-opacity-10">
              <div className="stat-figure text-error">
                <DynamicIcon name="thumbs-down" size="lg" />
              </div>
              <div className="stat-title">Feedbacks Negativos</div>
              <div className="stat-value text-error">
                {metrics.negativeFeedbacks}
              </div>
              <div className="stat-desc font-bold text-error">
                {metrics.negativeFeedbacksRatio}
              </div>
            </div>
            <div className="stat hover:bg-base-content hover:bg-opacity-10">
              <div className="stat-figure text-success">
                <DynamicIcon name="thumbs-up" size="lg" />
              </div>
              <div className="stat-title">Feedbacks Positivos</div>
              <div className="stat-value text-success">
                {metrics.positiveFeedbacks}
              </div>
              <div className="stat-desc font-bold text-success">
                {metrics.positiveFeedbacksRatio}
              </div>
            </div>
            <div className="stat hover:bg-base-content hover:bg-opacity-10">
              <div className="stat-figure">
                <DynamicIcon name="inbox" size="lg" />
              </div>
              <div className="stat-title">Novos Feedbacks</div>
              <div className="stat-value">{metrics.newFeedbacks}</div>
              <div className="stat-actions flex  gap-1">
                <LinkButton
                  color={metrics.newFeedbacks > 0 ? "primary" : undefined}
                  text="Abrir"
                  size="xs"
                  to="/dashboard/atividade/feedbacks"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTopbar;
