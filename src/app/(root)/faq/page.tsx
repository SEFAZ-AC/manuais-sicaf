import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import FaqEditor from '@/components/FaqEditor'
import { authOptions } from '@/lib/authOptions'
import { adGetFaqs, getFaqs } from '@/services/faqService'
import FaqAccordion from '@/components/FaqAccordion'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes - Manuais SICAF | SEFAZ-AC',
  description:
    'Perguntas Frequentes - Manuais SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre',
}

const Faq = async () => {
  const session = await getServerSession(authOptions)
  const data = session ? await adGetFaqs() : await getFaqs()
  if (!data && !session) notFound()
  return (
    <section className='flex flex-col items-start justify-start w-full h-full gap-6 my-3 p-3'>
      <h1 className='text-4xl font-extrabold'>Perguntas frequentes</h1>
      {session ? (
        <FaqEditor data={data} />
      ) : (
        <>
          {data ? (
            data.map(
              (
                item: {
                  id: number
                  ask: string
                  slug: string
                  answer: string
                  user: { name: string; avatar: string | null }
                  updatedAt: Date
                },
                i: number
              ) => (
                <div key={i} className='collapse collapse-plus bg-base-300'>
                  <FaqAccordion item={item} />
                </div>
              )
            )
          ) : (
            <p className='font-light'>
              Ainda estamos elaborando este conteúdo. Por favor, volte em breve.
            </p>
          )}
        </>
      )}
    </section>
  )
}

export default Faq
