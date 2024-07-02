import Link from "next/link";
import JointSignature from "./JointSignature";

const Logo = () => {
  return (
    <Link href="/" className="w-full max-w-64 h-fit">
      <JointSignature />
    </Link>
  );
};

export default Logo;
