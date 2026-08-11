import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartPoint } from '@/types'

interface SimpleBarChartProps {
  data: ChartPoint[]
}

export function SimpleBarChart({ data }: SimpleBarChartProps) {
  return (
    <div className="h-64 w-full min-w-0 sm:h-72" role="img" aria-label="Gráfico de barras">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" width={32} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              fontSize: 12,
            }}
          />
          <Bar dataKey="value" fill="#C2410C" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
