import DynamicIcon from "@/components/DynamicIcon";
import JointSignature from "@/components/JointSignature";
import LoginForm from "@/components/LoginForm";
import LoginImage from "@/components/LoginImage";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-12 px-2 py-6 w-full sm:px-6 md:px-12 xl:px-32 min-h-[95vh]">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold text-primary lg:text-7xl">
          Manuais SICAF
        </h1>
        <h2 className="text-lg italic lg:text-4xl">Modo de edição</h2>
      </div>
      <div className="flex items-center justify-center w-full max-w-[1000px] lg:justify-between">
        <div className="hidden w-full max-w-[500px] lg:flex items-center justify-center">
          <LoginImage />
        </div>
        <div className="w-full max-w-[320px] flex flex-col items-center justify-center h-[500px] shadow-xl p-6 bg-base-200">
          <h2 className="text-xl font-medium text-center">
            Entre com seu login SICAF
          </h2>
          <div className="divider"></div>
          <LoginForm />
        </div>
      </div>
      <div className="h-20">
        <JointSignature />
      </div>
      <div className="absolute top-5 right-5">
        <ToggleThemeButton />
      </div>
    </main>
  );
};

export default Page;
