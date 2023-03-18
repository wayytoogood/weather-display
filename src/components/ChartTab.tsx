import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ChartTabProps {
  label: string
  total: number
  isActive: boolean
  icon: IconDefinition
  onClick(): void
}

export const ChartTab: React.FC<ChartTabProps> = ({
  label,
  total,
  isActive,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-48 flex justify-center items-center gap-4 p-3 rounded-lg ${
        isActive
          ? 'bg-teal-500 text-white'
          : 'bg-gray-100 text-gray-600 border border-gray-300'
      } `}
    >
      <div
        className={`grid place-items-center w-10 h-10 rounded-lg ${
          isActive
            ? 'bg-white'
            : 'bg-gray-100 border border-gray-300 text-gray-600'
        }`}
      >
        {isActive ? (
          <FontAwesomeIcon icon={icon} className='w-5 text-teal-500' />
        ) : (
          <div className='grid place-items-center w-10 h-10 bg-white border border-gray-300 rounded-lg'>
            <FontAwesomeIcon icon={icon} className='w-5 text-gray-600' />
          </div>
        )}
      </div>
      <div>
        <h3 className='mb-1'>{label}</h3>
        <p>{total.toFixed(2)}M</p>
      </div>
      {isActive && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-teal-500`}
        ></div>
      )}
    </button>
  )
}
