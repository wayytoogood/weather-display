import { dataKeys } from '@/data/chart'
import { Props } from 'recharts/types/component/DefaultLegendContent'

const reOrderPayload = (payload: any[], key: string) => {
  return dataKeys.map(
    (currentKey) => payload.find((item) => item.dataKey === currentKey)!
  )
}

export const CustomTooltip = ({
  payload,
  label,
  active,
}: {
  payload?: any[]
  label: string
  active?: boolean
}) => {
  if (active && payload && payload.length) {
    const reOrderedPayload = reOrderPayload(payload, 'dataKey')

    return (
      <ul className='grid grid-cols-2 gap-y-2 px-3 py-2 bg-slate-600 text-white text-sm font-semibold rounded-lg'>
        {reOrderedPayload.map(({ name, value }, i) => (
          <li key={name} className={`uppercase ${i % 2 && 'justify-self-end'}`}>
            {name} - {value.toFixed(2)}M
          </li>
        ))}
      </ul>
    )
  }

  return null
}

export const renderLegend = (props: Props) => {
  const { payload, color } = props

  if (payload) {
    const reOrderedPayload = reOrderPayload(payload, 'value')

    return (
      <ul className='flex gap-6 justify-center'>
        {reOrderedPayload.map((entry, i) => (
          <div className='flex gap-1 items-center' key={i}>
            <div
              style={{
                width: '16px',
                height: '12px',
                backgroundColor: entry.color,
              }}
            ></div>
            <p className='uppercase text-sm font-semibold text-slate-600'>
              {entry.value}
            </p>
          </div>
        ))}
      </ul>
    )
  }

  return null
}
