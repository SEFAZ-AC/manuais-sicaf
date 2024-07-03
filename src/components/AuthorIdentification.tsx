import { dateFormatter } from "@/utils/dateFormatter";
import GenericAvatarImage from "./GenericAvatarImage";
import Image from "next/image";
import { getBasePath } from "@/utils/getBasePath";

const AuthorIdentification = ({
  name,
  avatar,
  date,
}: {
  name?: string;
  avatar?: string | null;
  date?: Date;
}) => {
  return (
    <>
      <div className="divider m-0 p-0"></div>
      <div className="w-full flex items-center gap-3 bg-base-100 p-5">
        <div className="avatar">
          <div className="w-14 rounded-full ring-1 ring-base-content">
            {avatar ? (
              <Image
                width={500}
                height={500}
                src={getBasePath() + avatar}
                alt="Avatar do usuário"
                unoptimized={true}
              />
            ) : (
              <GenericAvatarImage />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">{name}</p>
          <p className="italic text-[8pt]">
            Última atualização:{" "}
            <span className="font-bold">{date ? dateFormatter(date) : ""}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthorIdentification;
