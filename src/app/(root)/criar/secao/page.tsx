import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import SectionCreator from "@/components/SectionCreator";
import { adGetTrees } from "@/services/manualService";

export const metadata: Metadata = {
  title: "Criar Seção - Manuais SICAF | SEFAZ-AC",
  description:
    "Manuais de usuário - SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre",
};

const NewSection = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const trees = await adGetTrees();
  return (
    <section className="flex flex-col items-start justify-start w-full h-full gap-6 p-3">
      <h1 className="text-4xl font-extrabold">Nova Seção</h1>
      <SectionCreator trees={trees} />
    </section>
  );
};

export default NewSection;
