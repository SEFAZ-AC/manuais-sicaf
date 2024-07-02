import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import ContentParser from '@/components/ContentParser'
import PageEditor from '@/components/PageEditor'
import { authOptions } from '@/lib/authOptions'
import { adGetHome, getHome } from '@/services/pageService'
import { Suspense } from 'react'
import Loading from './loading'

export const metadata: Metadata = {
  title: 'Manuais de usuário - SICAF | SEFAZ-AC',
  description:
    'Manuais de usuário - SICAF | Diretoria da Contabilidade Geral do Estado | Secretaria de Estado da Fazenda | Estado do Acre',
}

const HomePage = async () => {
  const session = await getServerSession(authOptions)
  const data = session ? await adGetHome() : await getHome()
  return (
    <section className='flex flex-col items-start justify-start w-full h-full p-3'>
      {session ? (
        <Suspense fallback={<Loading />}>
          <PageEditor data={data} />
        </Suspense>
      ) : (
        <ContentParser data={data?.content} />
      )}
    </section>
  )
}

export default HomePage
