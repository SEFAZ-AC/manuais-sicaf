"use server";

import { revalidatePath } from "next/cache";
import db from "../lib/db";

export async function adGetTrees() {
  return await db.module.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      sections: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });
}

export async function getArticle(slug: string) {
  await db.article.update({
    where: { slug },
    data: {
      views: { increment: 1 },
    },
  });
  return await db.article.findFirst({
    where: {
      active: true,
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
      section: {
        select: {
          name: true,
          module: {
            select: {
              name: true,
            },
          },
        },
      },
      module: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function adGetArticle(slug: string) {
  return await db.article.findFirst({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      active: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
      sectionId: true,
      section: {
        select: {
          name: true,
          moduleId: true,
          module: {
            select: {
              name: true,
            },
          },
        },
      },
      moduleId: true,
      module: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function adCreateArticle(
  name: string,
  slug: string,
  content: string,
  userId: number,
  moduleId: number | null,
  sectionId: number | null
) {
  if (!name || name === "") return "forbidden";
  const slugExists = await db.article.findFirst({ where: { slug } });
  if (slugExists) return "conflict";
  await db.article.create({
    data: {
      name,
      slug,
      content,
      userId,
      moduleId: !sectionId ? moduleId : null,
      sectionId,
    },
  });
  revalidatePath("/");
  return;
}

export async function adToggleArticleVisibility(slug: string) {
  const article = await db.article.findFirst({
    where: { slug },
    select: { active: true },
  });
  if (!article) {
    revalidatePath("/");
    return;
  }
  await db.article.update({
    where: { slug },
    data: { active: !article.active },
  });
  revalidatePath("/");
  return !article.active;
}

export async function adUpdateArticle(
  slug: string,
  newName: string,
  newSlug: string,
  newContent: string,
  userId: number,
  newModuleId: number | null,
  newSectionId: number | null
) {
  if (!newName || newName === "") return "forbidden";
  const slugExists = await db.article.findFirst({ where: { slug: newSlug } });
  if (slugExists && slug !== newSlug) return "conflict";
  await db.article.update({
    where: { slug },
    data: {
      name: newName,
      slug: newSlug,
      content: newContent,
      userId,
      moduleId: !newSectionId ? newModuleId : null,
      sectionId: newSectionId,
    },
  });
  revalidatePath("/");
  return;
}

export async function adDeleteArticle(slug: string) {
  await db.article.delete({
    where: { slug },
  });
  revalidatePath("/");
  return;
}
