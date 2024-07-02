import AuthProvider from '@/components/AuthProvider'
import '../assets/styles/index.scss'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ToastContainer'
import { GoogleAnalytics } from '@next/third-parties/google'

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AuthProvider>
      <html lang='pt-br'>
        <body className='min-h-[100vh] relative text-base-content container mx-auto h-full w-full max-w-[1920px] bg-base-100 flex gap-6 flex-col items-center justify-center shadow-2xl shadow-neutral'>
          <ToastProvider>{children}</ToastProvider>
          <Footer />
          <GoogleAnalytics gaId='G-95TZ0KWTMQ' />
        </body>
      </html>
    </AuthProvider>
  )
}

export default RootLayout
