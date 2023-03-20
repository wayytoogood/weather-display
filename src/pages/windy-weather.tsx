import Head from 'next/head'
import { useEffect, useState } from 'react'
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl'
import { interpolateViridis } from 'd3-scale-chromatic'

import 'mapbox-gl/dist/mapbox-gl.css'
import { cities } from '@/data/cities'
import { Loading } from '@/components/Loading'
import Script from 'next/script'
import { WeatherData } from '@/types'
import { districts } from '@/data/districts'

const WindyWeather = () => {
  const [viewport, setViewport] = useState({
    latitude: 39.0697999379325,
    longitude: 35.58845227490206,
    zoom: 6,
  })

  const [isEnoughZoomIn, setIsEnoughZoomIn] = useState(false)

  // console.log('isEnoughZoomIn', isEnoughZoomIn)

  const [cityWeatherData, setCityWeatherData] = useState<WeatherData[] | null>(
    null
  )
  const [districtWeatherData, setDistrictWeatherData] = useState<
    WeatherData[] | null
  >(null)

  const fetchCityData = async () => {
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

    setCityWeatherData(weathers)
  }

  const fetchDistrictData = async () => {
    const baseUrl =
      'https://api.openweathermap.org/data/2.5/weather?units=metric&lat='

    const urls = districts.map(
      ({ lat, lon }) =>
        `${baseUrl}${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY2}`
    )

    const weathers = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url)
        return response.json()
      })
    )

    setDistrictWeatherData(weathers)
  }

  useEffect(() => {
    fetchCityData()
  }, [])

  useEffect(() => {
    if (!districtWeatherData) {
      fetchDistrictData()
    }
  }, [isEnoughZoomIn])

  // console.log(cityWeatherData)

  return (
    <>
      <Head>
        <title>Windy & Wallids | Weather</title>
      </Head>
      {cityWeatherData ? (
        <ReactMapGL
          {...viewport}
          style={{ width: '100vw', height: '100vh' }}
          onZoom={(e) => {
            const zoom = e.viewState.zoom

            if (zoom >= 8.5) {
              setIsEnoughZoomIn(true)
            }

            if (zoom < 8.5) {
              setIsEnoughZoomIn(false)
            }
          }}
          onMove={(e) => setViewport(e.viewState)}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          // mapStyle='mapbox://styles/mapbox/dark-v9'
          mapStyle='mapbox://styles/mapbox/light-v11'
        >
          {!isEnoughZoomIn &&
            cityWeatherData.map((item, i) => {
              const {
                coord: { lat, lon },
                main: { temp },
              } = item
              return (
                <Marker
                  style={{ marginTop: 26 }}
                  key={i}
                  longitude={lon}
                  latitude={lat}
                  anchor='bottom'
                >
                  <div
                    style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}
                    className='text-gray-800 font-bold text-sm'
                  >
                    {Math.round(temp)}°
                  </div>
                </Marker>
              )
            })}
          {isEnoughZoomIn &&
            districtWeatherData &&
            districtWeatherData.map((item, i) => {
              const {
                coord: { lat, lon },
                main: { temp },
              } = item
              return (
                <Marker
                  style={{ marginTop: 26 }}
                  key={i}
                  longitude={lon}
                  latitude={lat}
                  anchor='bottom'
                >
                  <div
                    style={{ fontFamily: '"Segoe UI", Arial, sans-serif' }}
                    className='text-gray-800 font-bold text-sm'
                  >
                    {Math.round(temp)}°
                  </div>
                </Marker>
              )
            })}
        </ReactMapGL>
      ) : (
        <div className='w-screen h-screen'>
          <Loading />
        </div>
      )}
    </>
  )
}

export default WindyWeather
