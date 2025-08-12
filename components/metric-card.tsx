import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  description?: string
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  description 
}: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return '↗'
      case 'negative':
        return '↘'
      default:
        return '→'
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          
          <div className="mb-1">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
          </div>
          
          {change && (
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
              <span>{getChangeIcon()}</span>
              <span>{change}</span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
