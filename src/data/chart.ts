import { faBan, faBug } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type Data = typeof dailyData
export type DataType = 'daily' | 'hourly'
export type DataKey = 'total' | 'sql' | 'xss' | 'auth'

export const dataTypes: DataType[] = ['daily', 'hourly']
export const dataKeys: DataKey[] = ['total', 'sql', 'xss', 'auth']

const makeRandoms = (multiplier: number) => {
  return Array.from({ length: 4 }).map((_) => Math.random() * multiplier)
}

const makeData = (length: number, multiplier: number) => {
  return Array.from({ length }, (_, i) => i + 1).map((v) => {
    const [randomOne, randomTwo, randomThree, randomFour] =
      makeRandoms(multiplier)
    return {
      name: v,
      total: randomOne * 1.25,
      sql: randomTwo,
      xss: randomThree,
      auth: randomFour,
    }
  })
}

export const dailyData = makeData(12, 4)

export const hourlyData = makeData(12, 1.5)

export const getTotal = (list: typeof dailyData, key: DataKey) => {
  return list.reduce((acc, curr) => (acc += curr[key]), 0)
}

export const tabData: {
  dataKey: DataKey
  color: string
  label: string
  icon: IconDefinition
}[] = [
  { dataKey: 'total', color: '#334155', label: 'Total Blocked', icon: faBan },
  { dataKey: 'sql', color: '#a78bfa', label: 'SQL Injection', icon: faBug },
  { dataKey: 'xss', color: '#2dd4bf', label: 'XSS Atack', icon: faBug },
  { dataKey: 'auth', color: '#60a5fa', label: 'Auth Broken', icon: faBug },
]
