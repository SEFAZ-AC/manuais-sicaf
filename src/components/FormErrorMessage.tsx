import DynamicIcon from "./DynamicIcon";

const FormErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-2 p-2 text-xs text-error bg-error bg-opacity-10">
      <DynamicIcon name="alert-triangle" size="sm" />
      <p>{message}</p>
    </div>
  );
};

export default FormErrorMessage;
