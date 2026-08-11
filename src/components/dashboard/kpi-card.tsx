import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  title: string
  value: string
  hint?: string
  icon?: LucideIcon
  trend?: string
  className?: string
  style?: CSSProperties
}

export function KpiCard({ title, value, hint, trend, className, style }: KpiCardProps) {
  return (
    <Card className={cn(className)} style={style}>
      <CardContent className="space-y-2 p-4 sm:p-5">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="font-data text-xl font-semibold tracking-tight sm:text-2xl">{value}</p>
        {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
        {trend ? <p className="font-data text-[11px] text-success">{trend}</p> : null}
      </CardContent>
    </Card>
  )
}
