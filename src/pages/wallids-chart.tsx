import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { CustomTooltip, renderLegend } from '@/components/chart'
import { getTotal, Data, DataType, tabData, dataTypes } from '@/data/chart'
import { getPromise } from '@/mockRequests/chart'
import { ChartTab } from '@/components/ChartTab'
import { Loading } from '@/components/Loading'

const WallidsChart = () => {
  const [displayedData, setDisplayedData] = useState<{
    isLoading: boolean
    data: Data | null
  }>({ isLoading: true, data: null })

  const [chartData, setChartData] = useState(tabData)
  const [dataType, setDataType] = useState<DataType>('daily')

  const fetchData = async () => {
    setDisplayedData({ ...displayedData, isLoading: true })

    const res = await (dataType === 'daily'
      ? getPromise('daily')
      : getPromise('hourly'))

    setDisplayedData({ isLoading: false, data: res })
  }

  useEffect(() => {
    fetchData()
  }, [dataType])

  const { isLoading, data } = displayedData

  const getOnClick = (i: number) => {
    let onClick: () => void

    switch (i) {
      case 0:
        onClick = () => setChartData(tabData)
        break
      case 1:
        onClick = () =>
          setChartData([tabData[1], tabData[0], tabData[2], tabData[3]])
        break
      case 2:
        onClick = () =>
          setChartData([tabData[2], tabData[0], tabData[1], tabData[3]])
        break
      case 3:
        onClick = () =>
          setChartData([tabData[3], tabData[0], tabData[1], tabData[2]])
        break
    }

    return onClick!
  }

  return (
    <>
      <Head>
        <title>Windy & Wallids | Chart</title>
      </Head>
      <main className='grid place-items-center min-h-screen bg-slate-200'>
        <div className='w-screen'>
          <h1 className='text-4xl font-semibold text-center mb-16'>
            Daily and Hourly Cyber Attack Graph
          </h1>
          {/* Chart */}
          <section className='w-[90%] max-w-7xl mx-auto px-3'>
            <div className='grid gap-5 bg-white py-4 px-5 rounded-lg'>
              <div className='flex justify-between items-center text-slate-600'>
                <h2 className='text-2xl font-bold'>{chartData[0].label}</h2>
                <button
                  onClick={() => {
                    setChartData(tabData)
                    setDataType('daily')
                    if (dataType === 'daily') {
                      fetchData()
                    }
                  }}
                  className='p-1'
                >
                  <FontAwesomeIcon icon={faRotateRight} className='w-7' />
                </button>
              </div>
              {isLoading || !data ? (
                <div className='h-[512px]'>
                  <Loading />
                </div>
              ) : (
                <div>
                  {/* Tabs */}
                  <div className='flex gap-4 justify-center mb-8'>
                    {tabData.map(({ dataKey, label, icon }, i) => (
                      <ChartTab
                        key={dataKey}
                        label={label}
                        icon={icon}
                        total={getTotal(data, dataKey)}
                        isActive={chartData[0].dataKey === dataKey}
                        onClick={getOnClick(i)}
                      />
                    ))}
                  </div>
                  {/* Change frequency */}
                  <div className='flex justify-between mb-4'>
                    <p className='text-slate-500 text-lg font-bold'>
                      {dataType === 'daily'
                        ? ' 1 - 12 March, 2023'
                        : '12 March, 2023'}
                    </p>
                    <div className='flex items-center gap-3'>
                      <p className='font-semibold capitalize'>{dataType}</p>
                      <div
                        role='menu'
                        className='group cursor-pointer relative p-1'
                      >
                        <FontAwesomeIcon icon={faEllipsis} className='w-6' />
                        <div className='absolute top-full right-0 grid text-sm font-semibold bg-gray-100 border border-gray-300 text-gray-600 overflow-hidden rounded-lg z-50 opacity-0 pointer-events-none transition group-hover:opacity-100 group-hover:pointer-events-auto'>
                          {dataTypes.map((type, i) => (
                            <button
                              key={type}
                              onClick={() => setDataType(type)}
                              className={`px-3 py-2 bg-gray-100 capitalize transition hover:bg-gray-200 ${
                                i !== dataTypes.length - 1 &&
                                'border-b border-gray-300'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-96'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <ComposedChart width={730} height={250} data={data}>
                        <XAxis dataKey='name' />
                        <YAxis
                          unit='M'
                          width={dataType === 'daily' ? 30 : 40}
                        />
                        <Tooltip
                          wrapperStyle={{ outline: 'none' }}
                          content={({ payload, label, active }) => (
                            <CustomTooltip
                              payload={payload}
                              label={label}
                              active={active}
                            />
                          )}
                        />
                        <Legend
                          content={renderLegend}
                          wrapperStyle={{ paddingTop: '5px' }}
                        />
                        <CartesianGrid stroke='#f5f5f5' />
                        {chartData.slice(1).map(({ dataKey, color }) => (
                          <Bar
                            key={dataKey}
                            dataKey={dataKey}
                            barSize={20}
                            fill={color}
                          />
                        ))}
                        <Line
                          type='monotone'
                          dataKey={chartData[0].dataKey}
                          stroke={chartData[0].color}
                          strokeWidth={3}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default WallidsChart
