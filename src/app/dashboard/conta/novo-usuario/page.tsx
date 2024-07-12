import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import UserCreator from "@/components/UserCreator";

export const metadata: Metadata = {
  title: "Criar Usuário - Manuais SICAF | SEFAZ-AC",
  description:
    "Manuais de usuário - SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre",
};

const NewManual = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  if (!session.user.admin) redirect("/dashboard/conta");
  return (
    <section className="flex flex-col items-start justify-start w-full h-full gap-6 p-3">
      <h1 className="text-4xl font-extrabold">Novo Usuário</h1>
      <UserCreator />
    </section>
  );
};

export default NewManual;
