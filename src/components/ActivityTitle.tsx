import DynamicIcon from "./DynamicIcon";

const ActivityTitle = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-3 text-secondary">
      <DynamicIcon name="star" />
      <h1 className="font-bold text-lg text-base-content">{text}</h1>
    </div>
  );
};

export default ActivityTitle;
