'use server'

import { revalidatePath } from 'next/cache'
import db from '../lib/db'

export async function getFaqs() {
  return await db.faq.findMany({
    where: { active: true },
    select: {
      id: true,
      ask: true,
      slug: true,
      answer: true,
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
      updatedAt: true,
    },
    orderBy: {
      views: 'desc',
    },
  })
}

export async function incrementFaqViews(id: number) {
  return await db.faq.update({
    where: { id },
    data: {
      views: { increment: 1 },
    },
  })
}

export async function adGetFaqs() {
  return await db.faq.findMany({
    select: {
      id: true,
      active: true,
      ask: true,
      slug: true,
      answer: true,
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
      updatedAt: true,
    },
    orderBy: {
      views: 'desc',
    },
  })
}

export async function adCreateFaq(
  newAsk: string,
  newSlug: string,
  newAnswer: string,
  userId: number
) {
  await db.faq.create({
    data: { userId, ask: newAsk, slug: newSlug, answer: newAnswer },
  })
  revalidatePath('/')
  return
}

export async function adToggleFaqVisibility(id: number) {
  const faq = await db.faq.findFirst({
    where: { id },
    select: { active: true },
  })
  if (!faq) {
    revalidatePath('/')
    return
  }
  await db.faq.update({ where: { id }, data: { active: !faq.active } })
  revalidatePath('/')
  return !faq.active
}

export async function adUpdateFaq(
  id: number,
  newAsk: string,
  newSlug: string,
  newAnswer: string,
  userId: number
) {
  await db.faq.update({
    where: { id },
    data: { userId, ask: newAsk, slug: newSlug, answer: newAnswer },
  })
  revalidatePath('/')
  return
}

export async function adDeleteFaq(id: number) {
  await db.faq.delete({
    where: { id },
  })
  revalidatePath('/')
  return
}
