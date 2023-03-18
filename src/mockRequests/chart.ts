import { dailyData, DataType, hourlyData } from '@/data/chart'

export const getPromise: (type: DataType) => Promise<typeof dailyData> = (
  type
) => {
  return new Promise((resolve, reject) => {
    const randomLoadingTime = Math.random() * 2 * 1000

    setTimeout(() => {
      resolve(type === 'daily' ? dailyData : hourlyData)
    }, randomLoadingTime)
  })
}
