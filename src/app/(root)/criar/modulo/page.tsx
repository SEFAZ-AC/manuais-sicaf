import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import ModuleCreator from "@/components/ModuleCreator";

export const metadata: Metadata = {
  title: "Criar Módulo - Manuais SICAF | SEFAZ-AC",
  description:
    "Manuais de usuário - SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre",
};

const NewModule = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  return (
    <section className="flex flex-col items-start justify-start w-full h-full gap-6 p-3">
      <h1 className="text-4xl font-extrabold">Novo Módulo</h1>
      <ModuleCreator />
    </section>
  );
};

export default NewModule;
