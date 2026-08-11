import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartPoint } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface SimpleAreaChartProps {
  data: ChartPoint[]
  currency?: boolean
}

export function SimpleAreaChart({ data, currency = false }: SimpleAreaChartProps) {
  return (
    <div className="h-64 w-full min-w-0 sm:h-72" role="img" aria-label="Gráfico de área">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C2410C" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#C2410C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#9CA3AF"
            width={currency ? 64 : 40}
            tickFormatter={(v: number) => (currency ? `${Math.round(v / 1000)}k` : String(v))}
          />
          <Tooltip
            formatter={(value) =>
              currency ? formatCurrency(Number(value)) : String(value)
            }
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#C2410C"
            strokeWidth={2}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
