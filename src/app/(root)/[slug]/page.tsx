import { notFound } from 'next/navigation'
import Loading from '../loading'
import ContentParser from '@/components/ContentParser'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import PageEditor from '@/components/PageEditor'
import { authOptions } from '@/lib/authOptions'
import { adGetPage, getPage } from '@/services/pageService'
import AuthorIdentification from '@/components/AuthorIdentification'

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] }
}) {
  const session = await getServerSession(authOptions)
  const data = session
    ? await adGetPage(`/${params.slug}`)
    : await getPage(`/${params.slug}`)
  if (!data) {
    return {
      title: 'Manuais SICAF | SEFAZ-AC',
      description:
        'Manuais de usuário - SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre',
    }
  }
  return {
    title: `${data.name} - Manuais SICAF | SEFAZ-AC`,
    description: `${data.name}  - Manuais SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre`,
  }
}

const Page = async ({ params }: { params: { slug?: string[] } }) => {
  const session = await getServerSession(authOptions)
  const data = session
    ? await adGetPage(`/${params.slug}`)
    : await getPage(`/${params.slug}`)
  if (!data) notFound()
  return (
    <section className='flex flex-col items-start justify-start w-full h-full gap-6 p-3'>
      {session ? (
        <Suspense fallback={<Loading />}>
          <PageEditor data={data} />
        </Suspense>
      ) : (
        <>
          <ContentParser data={data?.content} />
          <AuthorIdentification
            name={data?.user.name}
            avatar={data?.user.avatar}
            date={data?.updatedAt}
          />
        </>
      )}
    </section>
  )
}

export default Page
