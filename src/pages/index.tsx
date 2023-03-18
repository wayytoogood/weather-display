import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Windy & Wallids | Homepage</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='grid place-items-center min-h-screen bg-slate-100'>
        <div>
          <h1 className='bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-6xl font-semibold mb-28'>
            Wellcome to the App
          </h1>
          <div className='flex justify-center gap-6'>
            <Link
              href='/wallids-chart'
              className='block px-6 py-3 bg-emerald-500  text-slate-100 rounded-lg shadow-lg transition-all duration-300 hover:translate-y-1 hover:shadow-sm'
            >
              Go to Wallids Charts
            </Link>
            <Link
              href='/windy-weather'
              className='block px-6 py-3 bg-teal-500 text-slate-100 rounded-lg shadow-lg transition-all duration-300 hover:translate-y-1 hover:shadow-sm'
            >
              Go to Windy Weather
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
