"use client";

import { LoginSchema, loginSchema } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import ActionButton from "@/components/ActionButton";
import DynamicIcon from "@/components/DynamicIcon";
import LinkButton from "@/components/LinkButton";
import FormErrorMessage from "./FormErrorMessage";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previousUrl = searchParams.get("callbackUrl");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });
  const [error, setError] = useState("");
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const { username, password } = data;
    await signIn("credentials", {
      redirect: false,
      username,
      password,
    })
      .then((res) => {
        if (res && res.ok) {
          router.push(previousUrl || "/");
          router.refresh();
          toast.success("Login bem sucedido.");
        } else {
          if (res && res.error === "CredentialsSignin") {
            setError("Credenciais inválidas.");
          } else {
            setError("Erro desconhecido. Tente novamente em alguns minutos.");
          }
          toast.error("Login malsucedido.");
        }
      })
      .catch((error) => {
        setError("Erro desconhecido. Tente novamente em alguns minutos.");
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <label
        className={`flex items-center gap-2 mb-2 input input-bordered ${
          errors.username ? "input-error" : ""
        }`}
      >
        <DynamicIcon name="user" />
        <input type="number" placeholder="CPF" {...register("username")} />
      </label>
      <label
        className={`flex items-center gap-2 mb-6 input input-bordered ${
          errors.password ? "input-error" : ""
        }`}
      >
        <DynamicIcon name="key" />
        <input type="password" placeholder="Senha" {...register("password")} />
      </label>
      <div className="flex flex-col gap-3">
        {error ? <FormErrorMessage message={error} /> : ""}
        {errors.username?.message ? (
          <FormErrorMessage message={errors.username.message} />
        ) : (
          ""
        )}
        {errors.password?.message ? (
          <FormErrorMessage message={errors.password.message} />
        ) : (
          ""
        )}
      </div>
      <div className="divider"></div>
      <div className="flex flex-col w-full gap-3">
        <ActionButton
          text="Login"
          icon={<DynamicIcon name="log-in" />}
          type="submit"
          color="primary"
        />
        <LinkButton
          text="Voltar"
          icon={<DynamicIcon name="home" />}
          color="neutral"
          to="/"
        />
      </div>
    </form>
  );
};

export default LoginForm;
