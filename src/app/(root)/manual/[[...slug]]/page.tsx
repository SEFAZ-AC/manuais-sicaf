import ContentParser from "@/components/ContentParser";
import { createSlugFromSearchParams } from "@/utils/parseSlug";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../../loading";
import Breadcrumbs from "@/components/Breadcumbs";
import { authOptions } from "@/lib/authOptions";
import { adGetArticle, adGetTrees, getArticle } from "@/services/manualService";
import ManualEditor from "@/components/ManualEditor";
import FeedbackForm from "@/components/FeedbackForm";
import AuthorAndDateIdentification from "@/components/AuthorAndDateIdentification";

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}) {
  const session = await getServerSession(authOptions);
  const data = session
    ? await adGetArticle(createSlugFromSearchParams(params.slug))
    : await getArticle(createSlugFromSearchParams(params.slug));
  if (!data) {
    return {
      title: "Manuais SICAF | SEFAZ-AC",
      description:
        "Manuais de usuário - SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre",
    };
  }
  return {
    title: `${data.name} - Manuais SICAF | SEFAZ-AC`,
    description: `${data.name}  - Manuais SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre`,
  };
}

const Manual = async ({ params }: { params: { slug?: string[] } }) => {
  const session = await getServerSession(authOptions);
  const data = session
    ? await adGetArticle(createSlugFromSearchParams(params.slug))
    : await getArticle(createSlugFromSearchParams(params.slug));
  if (!data) notFound();
  const trees = await adGetTrees();
  return (
    <section className="flex flex-col items-start justify-start w-full h-full px-3">
      <Breadcrumbs item={data} />
      <AuthorAndDateIdentification
        avatar={data.user.avatar}
        name={data.user.name}
        date={data.updatedAt}
      />
      {session ? (
        <Suspense fallback={<Loading />}>
          <ManualEditor data={data} trees={trees} />
        </Suspense>
      ) : (
        <>
          <ContentParser data={data.content} />
          <FeedbackForm resource="article" resourceId={data.id} />
        </>
      )}
    </section>
  );
};

export default Manual;
