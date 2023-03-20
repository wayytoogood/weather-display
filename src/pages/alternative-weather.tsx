import Head from 'next/head'
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { cities } from '@/data/cities'
import { Loading } from '@/components/Loading'
import { WeatherData } from '@/types'

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
})

const WindyWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null)

  const fetchData = async () => {
    const baseUrl =
      'https://api.openweathermap.org/data/2.5/weather?units=metric&lat='

    const urls = cities.map(
      ({ lat, lon }) =>
        `${baseUrl}${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY2}`
    )

    const weathers = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url)
        return response.json()
      })
    )

    setWeatherData(weathers)

    // console.log('weathers', weathers)
  }

  useEffect(() => {
    fetchData()
    // Fetch data here and set it to the data state
  }, [])

  return (
    <>
      <Head>
        <title>Windy & Wallids | Weather</title>
      </Head>
      {!weatherData ? (
        <div className='w-screen h-screen'>
          <Loading />
        </div>
      ) : (
        <Map data={weatherData} />
      )}
    </>
  )
}

export default WindyWeather
