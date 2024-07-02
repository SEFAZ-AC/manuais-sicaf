import DynamicIcon from "./DynamicIcon";

const ToggleDrawerButton = () => {
  return (
    <label htmlFor="drawer" aria-label="Abrir menu" className="cursor-pointer">
      <DynamicIcon name="menu" />
    </label>
  );
};

export default ToggleDrawerButton;
