"use client";

import Image from "next/image";
import ActionButton from "@/components/ActionButton";
import BackButton from "@/components/BackButton";
import DynamicIcon from "@/components/DynamicIcon";
import GenericAvatarImage from "@/components/GenericAvatarImage";
import { toast } from "react-toastify";
import { adUpdateUser } from "@/services/userService";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, updateUserSchema } from "@/utils/validators";
import { useEffect, useState } from "react";
import { uploadImageByFile } from "@/services/fileService";
import { getBasePath } from "@/utils/getBasePath";

const UserEditor = ({
  user,
}: {
  user: {
    id: number;
    username: string;
    name: string;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}) => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      avatar: user.avatar || undefined,
    },
  });
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [newAvatarURL, setNewAvatarURL] = useState<string | null>(null);
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAvatar(e.target.files[0]);
    }
  };
  const handleUpdate: SubmitHandler<UpdateUserSchema> = async (data) => {
    try {
      if (newAvatar) {
        const formData = new FormData();
        formData.append("file", newAvatar);
        const res = await uploadImageByFile(formData);
        if (res.success) {
          data.avatar = res.file?.url;
        } else {
          toast.error("Não foi possível fazer upload do novo avatar");
          return;
        }
      }
      const res = await adUpdateUser(
        user.id,
        data.name,
        data.avatar || null,
        data.oldPassword || null,
        data.newPassword || null
      );
      if (res !== "ok") {
        toast.error(res);
        return;
      }
      if (res === "ok") {
        reset({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
        router.refresh();
        toast.success("Registro atualizado com sucesso");
      }
    } catch (error) {
      router.refresh();
      toast.error("Ops.. Algo deu errado");
    }
  };
  useEffect(() => {
    reset({
      name: user.name,
      avatar: user.avatar || "",
    });
  }, [user.name, reset, user.avatar]);
  useEffect(() => {
    if (newAvatar) {
      const fileURL = URL.createObjectURL(newAvatar);
      setNewAvatarURL(fileURL);
      return () => {
        URL.revokeObjectURL(fileURL);
      };
    }
  }, [newAvatar]);
  return (
    <div className="hero min-h-[70vh]">
      <div className="hero-content flex-col items-center justify-center gap-12 xl:flex-row w-full md:max-w-[70%]">
        <div className="relative min-w-[300px] w-fit">
          {user.avatar || newAvatarURL ? (
            <Image
              src={newAvatarURL || getBasePath() + user.avatar!}
              width={300}
              height={300}
              className="shadow-2xl avatar rounded-full aspect-square object-cover"
              alt="Seu avatar"
              unoptimized={true}
            />
          ) : (
            <GenericAvatarImage />
          )}
          <label className="absolute bottom-3 left-1/2 -translate-x-1/2 p-2 bg-base-100 opacity-50 rounded-full cursor-pointer shadow-lg">
            <DynamicIcon name="camera" />
            <input
              type="file"
              className="hidden"
              onChange={handleAvatarChange}
              accept="image/*"
            />
          </label>
        </div>
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col items-center xl:items-start xl:justify-start justify-center gap-4 w-full"
        >
          <label className="flex items-center gap-2 input input-disabled">
            <DynamicIcon name="user" />
            <input
              type="text"
              value={user.username}
              readOnly
              className="font-bold w-full text-center xl:text-start"
            />
          </label>
          <input
            type="text"
            autoFocus
            {...register("name")}
            className="input text-2xl font-bold w-full text-center xl:text-start"
          />
          <div className="flex w-full flex-col 2xl:flex-row items-center justify-center gap-2 xl:justify-start">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Senha atual</span>
              </div>
              <input
                type="password"
                {...register("oldPassword")}
                className="input input-sm"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Nova senha</span>
              </div>
              <input
                type="password"
                {...register("newPassword")}
                className="input input-sm"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Confirme a nova senha</span>
              </div>
              <input
                type="password"
                {...register("confirmNewPassword")}
                className="input input-sm"
              />
            </label>
          </div>
          <div className="flex items-center justify-center gap-3 xl:justify-start mt-6">
            <ActionButton
              color="primary"
              text="Salvar"
              icon={<DynamicIcon name="save" />}
              type="submit"
            />
            <BackButton color="neutral" outline />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditor;
