import JointSignature from "@/components/JointSignature";
import BasicActions from "@/components/BasicActions";
import NotFoundErrorImage from "@/components/NotFoundErrorImage";
import ErrorText from "@/components/ErrorText";
import ToggleThemeButton from "@/components/ToggleThemeButton";

const NotFound = () => {
  return (
    <main className="grid items-center flex-1 gap-1 lg:grid-cols-2 px-2 w-full py-6 sm:px-6 md:px-12 xl:px-32 min-h-[95vh]">
      <div className="flex flex-col items-center flex-1 gap-12 text-center lg:items-start">
        <ErrorText text="Parece que este local não existe :(" />
        <BasicActions />
        <div className="h-16">
          <JointSignature />
        </div>
      </div>
      <NotFoundErrorImage />
      <div className="absolute top-5 right-5">
        <ToggleThemeButton />
      </div>
    </main>
  );
};

export default NotFound;
