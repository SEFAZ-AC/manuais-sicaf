"use server";

import { revalidatePath } from "next/cache";
import db from "../lib/db";

export async function getModulesTree() {
  return await db.module.findMany({
    where: { active: true },
    select: {
      name: true,
      articles: {
        where: { active: true },
        select: {
          name: true,
          slug: true,
        },
        orderBy: {
          name: "asc",
        },
      },
      sections: {
        where: { active: true },
        select: {
          name: true,
          articles: {
            where: { active: true },
            select: {
              slug: true,
              name: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getSingleArticles() {
  return await db.article.findMany({
    where: { active: true, AND: [{ module: null }, { section: null }] },
    select: {
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getPages() {
  return await db.page.findMany({
    where: { active: true, slug: { not: "/" } },
    select: {
      name: true,
      slug: true,
      icon: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function adGetModulesTree() {
  return await db.module.findMany({
    select: {
      name: true,
      active: true,
      articles: {
        select: {
          name: true,
          slug: true,
          active: true,
        },
        orderBy: {
          name: "asc",
        },
      },
      sections: {
        select: {
          name: true,
          active: true,
          articles: {
            select: {
              slug: true,
              name: true,
              active: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function adGetSingleArticles() {
  return await db.article.findMany({
    where: {
      AND: [{ module: null }, { section: null }],
    },
    select: {
      name: true,
      slug: true,
      active: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function adGetPages() {
  return await db.page.findMany({
    where: { slug: { not: "/" } },
    select: {
      name: true,
      slug: true,
      icon: true,
      active: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function adCreateModule(name: string, slug: string) {
  if (!name || name === "") return "forbidden";
  const slugExists = await db.module.findFirst({ where: { slug } });
  if (slugExists) return "conflict";
  await db.module.create({
    data: {
      name,
      slug,
    },
  });
  revalidatePath("/");
  return;
}

export async function adCreateSection(
  name: string,
  slug: string,
  moduleId: number | null
) {
  if (!name || name === "") return "forbidden";
  if (!moduleId) return "badRequest";
  const slugExists = await db.section.findFirst({ where: { slug, moduleId } });
  if (slugExists) return "conflict";
  await db.section.create({
    data: {
      name,
      slug,
      moduleId,
    },
  });
  revalidatePath("/");
  return;
}
