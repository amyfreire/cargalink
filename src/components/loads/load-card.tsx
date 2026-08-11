import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LOAD_STATUS } from '@/constants'
import type { Load } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'

const statusVariant: Record<Load['status'], 'secondary' | 'success' | 'warning' | 'info' | 'destructive'> = {
  draft: 'secondary',
  open: 'success',
  in_progress: 'info',
  completed: 'secondary',
  cancelled: 'destructive',
}

interface LoadCardProps {
  load: Load
  className?: string
}

export function LoadCard({ load, className }: LoadCardProps) {
  return (
    <Card className={`flex h-full flex-col ${className ?? ''}`}>
      <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{load.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {load.company?.trade_name ?? 'Empresa'}
            </p>
          </div>
          <Badge variant={statusVariant[load.status]} className="shrink-0 rounded-sm font-normal">
            {LOAD_STATUS[load.status]}
          </Badge>
        </div>

        <p className="border-l-2 border-primary pl-3 text-sm leading-snug">
          <span className="font-medium">
            {load.origin_city}/{load.origin_state}
          </span>
          <span className="mx-1.5 text-muted-foreground">→</span>
          <span className="font-medium">
            {load.destination_city}/{load.destination_state}
          </span>
        </p>

        <dl className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>
            <dt>Carga</dt>
            <dd className="font-medium text-foreground">
              {load.cargo_type} · {(load.weight_kg / 1000).toFixed(1)} t
            </dd>
          </div>
          <div>
            <dt>Veículo</dt>
            <dd className="font-medium text-foreground">{load.vehicle_type}</dd>
          </div>
          <div>
            <dt>Coleta</dt>
            <dd className="font-medium text-foreground">{formatDate(load.pickup_date)}</dd>
          </div>
          <div>
            <dt>Candidaturas</dt>
            <dd className="font-medium text-foreground">{load.applications_count ?? 0}</dd>
          </div>
        </dl>

        <div className="mt-auto border-t border-border pt-3">
          <p className="text-[11px] text-muted-foreground">Frete</p>
          <p className="font-data text-lg font-semibold text-primary">{formatCurrency(load.price)}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border p-3 sm:p-4">
        <Button asChild variant="outline" className="w-full" size="sm">
          <Link to={`/app/cargas/${load.id}`}>Abrir carga</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
