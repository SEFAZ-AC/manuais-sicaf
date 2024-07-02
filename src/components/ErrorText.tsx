const ErrorText = ({ text, mini }: { text: string; mini?: boolean }) => {
  return (
    <>
      <h1
        className={`font-bold  lg:text-left ${
          mini ? "text-5xl lg:text-6xl" : "text-6xl lg:text-8xl"
        }`}
      >
        Ops...
      </h1>
      <p className="lg:max-w-[100%] px-3 lg:text-left">{text}</p>
    </>
  );
};

export default ErrorText;
