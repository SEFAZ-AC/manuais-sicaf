"use server";

import { revalidatePath } from "next/cache";
import db from "../lib/db";

export async function getHome() {
  await db.page.update({
    where: { slug: "/" },
    data: {
      views: { increment: 1 },
    },
  });
  return await db.page.findFirst({
    where: { slug: "/" },
    select: {
      name: true,
      slug: true,
      icon: true,
      content: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });
}

export async function getPage(slug: string) {
  await db.page.update({
    where: { slug },
    data: {
      views: { increment: 1 },
    },
  });
  return await db.page.findFirst({
    where: { active: true, slug: slug },
    select: {
      name: true,
      slug: true,
      icon: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });
}

export async function adGetHome() {
  return await db.page.findFirst({
    where: { slug: "/" },
    select: {
      name: true,
      slug: true,
      icon: true,
      content: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });
}

export async function adGetPage(slug: string) {
  return await db.page.findFirst({
    where: { slug: slug },
    select: {
      name: true,
      slug: true,
      icon: true,
      content: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });
}

export async function adCreatePage(
  name: string,
  slug: string,
  icon: string,
  content: string,
  userId: number
) {
  if (
    slug === "/" ||
    slug === "/faq" ||
    slug === "/dashboard" ||
    slug === "/manual"
  )
    return "forbidden";
  const slugExists = await db.page.findFirst({ where: { slug } });
  if (slugExists) return "conflict";
  await db.page.create({
    data: {
      name,
      slug,
      icon,
      content,
      userId,
    },
  });
  revalidatePath("/");
  return;
}

export async function adTogglePageVisibility(slug: string) {
  if (slug === "/") return "forbidden";
  const page = await db.page.findFirst({
    where: { slug },
    select: { active: true },
  });
  if (!page) {
    revalidatePath("/");
    return;
  }
  await db.page.update({ where: { slug }, data: { active: !page.active } });
  revalidatePath("/");
  return !page.active;
}

export async function adUpdateHome(newContent: string, userId: number) {
  await db.page.update({
    where: { slug: "/" },
    data: {
      content: newContent,
      userId,
    },
  });
  revalidatePath("/");
  return;
}

export async function adUpdatePage(
  slug: string,
  newName: string,
  newSlug: string,
  newIcon: string,
  newContent: string,
  userId: number
) {
  if (
    newSlug === "/" ||
    newSlug === "/faq" ||
    newSlug === "/dashboard" ||
    newSlug === "/manual"
  )
    return "forbidden";
  const slugExists = await db.page.findFirst({ where: { slug: newSlug } });
  if (slugExists && slug !== newSlug) return "conflict";
  await db.page.update({
    where: { slug },
    data: {
      name: newName,
      slug: newSlug,
      icon: newIcon,
      content: newContent,
      userId,
    },
  });
  revalidatePath("/");
  return;
}

export async function adDeletePage(slug: string) {
  if (slug === "/") return "forbidden";
  await db.page.delete({
    where: { slug },
  });
  revalidatePath("/");
  return;
}
