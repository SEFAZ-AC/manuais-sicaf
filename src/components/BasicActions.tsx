import BackButton from "./BackButton";
import LinkButton from "./LinkButton";
import DynamicIcon from "./DynamicIcon";

const BasicActions = () => {
  return (
    <div className="flex flex-col w-48 gap-3 sm:w-fit sm:gap-6 sm:flex-row">
      <BackButton color="neutral" outline size="sm" />
      <LinkButton
        to="/"
        text="Home"
        icon={<DynamicIcon name="home" />}
        color="primary"
        size="sm"
      />
    </div>
  );
};

export default BasicActions;
