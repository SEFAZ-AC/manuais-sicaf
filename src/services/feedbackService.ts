"use server";

import { revalidatePath } from "next/cache";
import db from "../lib/db";

export async function adGetNewFeedbacksCount() {
  return await db.feedback.count({
    where: { new: true },
  });
}

export async function adGetAllFeedbacks() {
  return await db.feedback.findMany({
    select: {
      id: true,
      isPositive: true,
      feedback: true,
      email: true,
      new: true,
      createdAt: true,
      article: {
        select: {
          slug: true,
        },
      },
      faq: {
        select: {
          slug: true,
        },
      },
    },
    orderBy: [{ new: "desc" }, { createdAt: "desc" }],
  });
}

export async function createFeedback(
  isPositive: boolean,
  feedback: string,
  email: string,
  resourceType: "article" | "faq",
  resourceId: number | null
) {
  await db.feedback.create({
    data: {
      isPositive,
      feedback,
      email,
      articleId: resourceType === "article" ? resourceId : null,
      faqId: resourceType === "faq" ? resourceId : null,
    },
  });
  return;
}

export async function adMarkFeedbackAsRead(id: number) {
  await db.feedback.update({
    where: { id },
    data: { new: false },
  });
  revalidatePath("/");
  return;
}

export async function adMarkAllFeedbackAsRead() {
  await db.feedback.updateMany({
    where: { new: true },
    data: { new: false },
  });
  revalidatePath("/");
  return;
}

export async function adDeleteFeedback(id: number) {
  await db.feedback.delete({
    where: { id },
  });
  revalidatePath("/");
  return;
}

export async function getFeedbackMetrics() {
  const totalArticles = await db.article.count();
  const totalPages = await db.page.count();
  const totalFaqs = await db.faq.count();
  const totalResources = totalArticles + totalPages + totalFaqs;
  const totalFeedbacks = await db.feedback.count();
  const positiveFeedbacks = await db.feedback.count({
    where: { isPositive: true },
  });
  const negativeFeedbacks = await db.feedback.count({
    where: { isPositive: false },
  });
  const newFeedbacks = await db.feedback.count({
    where: { new: true },
  });
  const totalViewsArticles = await db.article.aggregate({
    _sum: {
      views: true,
    },
  });
  const totalViewsPages = await db.page.aggregate({
    _sum: {
      views: true,
    },
  });
  const totalViewsFaqs = await db.faq.aggregate({
    _sum: {
      views: true,
    },
  });
  const articles = await db.article
    .findMany({
      select: {
        name: true,
        views: true,
      },
      orderBy: {
        views: "desc",
      },
      take: 5,
    })
    .then((articles) =>
      articles.map((article) => ({ ...article, type: "Manual" }))
    );
  const pages = await db.page
    .findMany({
      select: {
        name: true,
        views: true,
      },
      orderBy: {
        views: "desc",
      },
      take: 5,
    })
    .then((pages) => pages.map((page) => ({ ...page, type: "Página" })));
  const faqs = await db.faq
    .findMany({
      select: {
        ask: true,
        views: true,
      },
      orderBy: {
        views: "desc",
      },
      take: 5,
    })
    .then((faqs) =>
      faqs.map((faq) => ({
        name: faq.ask,
        views: faq.views,
        type: "FAQ",
      }))
    );
  const combinedList = [...articles, ...pages, ...faqs];
  const mostViewedResources = combinedList.sort(
    (a, b) => (b.views || 0) - (a.views || 0)
  );
  const positiveFeedbacksRatio =
    totalFeedbacks > 0 ? (positiveFeedbacks / totalFeedbacks) * 100 : 0;
  const negativeFeedbacksRatio =
    totalFeedbacks > 0 ? (negativeFeedbacks / totalFeedbacks) * 100 : 0;
  const totalGeneralViews =
    (totalViewsArticles._sum.views ?? 0) +
    (totalViewsPages._sum.views ?? 0) +
    (totalViewsFaqs._sum.views ?? 0);
  const usersProduction = await db.user.findMany({
    select: {
      id: true,
      name: true,
      articles: {
        select: {
          id: true,
        },
      },
      faqs: {
        select: {
          id: true,
        },
      },
      pages: {
        select: {
          id: true,
        },
      },
    },
  });
  const usersProductionFormatted = usersProduction.map((user) => ({
    userId: user.id,
    name: user.name,
    articlesCount: user.articles.length,
    faqsCount: user.faqs.length,
    pagesCount: user.pages.length,
  }));
  const usersProductionSorted = usersProductionFormatted.sort((a, b) => {
    const totalA = a.articlesCount + a.faqsCount + a.pagesCount;
    const totalB = b.articlesCount + b.faqsCount + b.pagesCount;
    return totalB - totalA;
  });
  return {
    totalGeneralViews,
    mostViewedResources,
    totalFeedbacks,
    positiveFeedbacks,
    negativeFeedbacks,
    newFeedbacks,
    positiveFeedbacksRatio: `${positiveFeedbacksRatio.toFixed(2)}%`,
    negativeFeedbacksRatio: `${negativeFeedbacksRatio.toFixed(2)}%`,
    totalResources,
    userProduction: usersProductionSorted,
  };
}
