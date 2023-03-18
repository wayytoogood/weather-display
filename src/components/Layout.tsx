import { Nunito } from 'next/font/google'
import Head from 'next/head'

export const nunito = Nunito({ subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={`${nunito.className} text-slate-800 antialiased`}>
        {children}
      </div>
    </>
  )
}
