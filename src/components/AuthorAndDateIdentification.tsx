import { dateFormatter } from "@/utils/dateFormatter";
import GenericAvatarImage from "./GenericAvatarImage";
import Image from "next/image";
import { getBasePath } from "@/utils/getBasePath";
import DynamicIcon from "./DynamicIcon";

const AuthorAndDateIdentification = ({
  name,
  avatar,
  date,
}: {
  name?: string;
  avatar?: string | null;
  date?: Date;
}) => {
  return (
    <div className="text-gray-500 flex flex-col xl:flex-row gap-4 w-full items-start xl:items-center justify-between">
      <div className="text-xs flex items-center w-fit gap-1">
        <DynamicIcon name="clock" size="xs" />
        <p className="italic">
          Última atualização:{" "}
          <span className="font-bold">{date ? dateFormatter(date) : ""}</span>
        </p>
      </div>
      <div className="flex gap-3 items-center w-fit">
        <div className="avatar">
          <div className="w-8 rounded-full ring-1 ring-base-content">
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
        <div className="text-sm w-fit gap-2">
          <p className="font-bold">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorAndDateIdentification;
