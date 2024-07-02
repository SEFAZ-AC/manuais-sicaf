import JointSignature from "@/components/JointSignature";

const Loading = () => {
  return (
    <main className="flex flex-col items-center justify-center flex-1 w-full h-full p-3">
      <div className="flex flex-col items-center justify-center flex-1 gap-3">
        <span className="z-50 loading loading-ring loading-lg text-primary"></span>
        <p className="flex items-end font-bold">
          Carregando<span className="loading loading-dots loading-xs"></span>
        </p>
      </div>
    </main>
  );
};

export default Loading;
