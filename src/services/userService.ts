"use server";

import { hashPassword, isPasswordValid } from "@/utils/handlePasswordHash";
import db from "../lib/db";
import { revalidatePath } from "next/cache";

export async function authGetUser(username: string) {
  return await db.user.findFirst({
    where: { username: username, active: true },
    select: {
      id: true,
      username: true,
      password: true,
      name: true,
      avatar: true,
    },
  });
}

export async function adGetUser(id: number) {
  return await db.user.findFirst({
    where: { id: id },
    select: {
      id: true,
      username: true,
      name: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function adUpdateUser(
  id: number,
  name: string,
  avatar: string | null,
  password: string | null,
  newPassword: string | null
) {
  if (newPassword) {
    if (!password) return "Forneça a senha antiga para alterar a senha";
    const user = await db.user.findFirst({
      where: { id: id },
      select: { password: true },
    });
    if (!user) return "Usuário não encontrado";
    const isValid = await isPasswordValid(password, user.password);
    if (!isValid) return "Senha incorreta";
    await db.user.update({
      where: { id: id },
      data: {
        name,
        avatar,
        password: newPassword ? await hashPassword(newPassword) : user.password,
      },
    });
    revalidatePath("/");
    return "ok";
  } else {
    await db.user.update({
      where: { id: id },
      data: { name, avatar },
    });
    revalidatePath("/");
    return "ok";
  }
}
