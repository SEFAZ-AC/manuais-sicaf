import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Suspense } from "react";
import Loading from "../../loading";
import { redirect } from "next/navigation";
import PageCreator from "@/components/PageCreator";

export const metadata: Metadata = {
  title: "Criar Página - Manuais SICAF | SEFAZ-AC",
  description:
    "Manuais de usuário - SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre",
};

const NewPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  return (
    <section className="flex flex-col items-start justify-start w-full h-full gap-6 p-3">
      <h1 className="text-4xl font-extrabold">Nova página</h1>
      <Suspense fallback={<Loading />}>
        <PageCreator />
      </Suspense>
    </section>
  );
};

export default NewPage;
