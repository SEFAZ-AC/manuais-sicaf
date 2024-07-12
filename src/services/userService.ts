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
      admin: true,
    },
  });
}

export async function adGetAllUsers() {
  return await db.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      avatar: true,
      admin: true,
      active: true,
      createdAt: true,
      updatedAt: true,
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
      admin: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function adCreateUser(
  username: string,
  password: string,
  name: string
) {
  const user = await db.user.findFirst({
    where: { username },
  });
  if (user) return "conflict";
  if (11 > username.length || username.length > 11) return "username";
  if (6 > password.length || password.length > 20) return "password";
  await db.user.create({
    data: {
      username,
      name,
      password: await hashPassword(password),
    },
  });
  revalidatePath("/");
  return "ok";
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
export async function adSuperUpdateUser(
  id: number,
  name: string,
  username: string,
  password: string | null
) {
  if (id === 1) return "forbidden";
  const user = await db.user.findFirst({
    where: { id: id },
    select: { password: true, username: true },
  });
  if (!user) return "not_found";
  if (11 > username.length || username.length > 11) return "username";
  if (password && (6 > password.length || password.length > 20))
    return "password";
  if (username !== user.username) {
    const checkUsername = await db.user.findFirst({
      where: { username },
      select: { id: true },
    });
    if (checkUsername) return "conflict";
  }
  await db.user.update({
    where: { id: id },
    data: {
      name,
      username,
      password: password ? await hashPassword(password) : user.password,
    },
  });
  revalidatePath("/");
  return "ok";
}

export async function adToggleUserVisibility(id: number) {
  if (id === 1) return "forbidden";
  const user = await db.user.findFirst({
    where: { id },
    select: { active: true },
  });
  if (!user) {
    revalidatePath("/");
    return;
  }
  await db.user.update({
    where: { id },
    data: { active: !user.active },
  });
  revalidatePath("/");
  return !user.active;
}

export async function adToggleUserAdmin(id: number) {
  if (id === 1) return "forbidden";
  const user = await db.user.findFirst({
    where: { id },
    select: { admin: true },
  });
  if (!user) {
    revalidatePath("/");
    return;
  }
  await db.user.update({
    where: { id },
    data: { admin: !user.admin },
  });
  revalidatePath("/");
  return !user.admin;
}
