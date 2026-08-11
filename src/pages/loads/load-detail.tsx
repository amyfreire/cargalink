import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, MapPin, MessageSquare, Package, Truck } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { useLoad } from '@/hooks/use-loads'
import { LOAD_STATUS, ROUTES } from '@/constants'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

export function LoadDetailPage() {
  const { id } = useParams()
  const { data: load, isLoading, isError, refetch } = useLoad(id)

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState onRetry={() => void refetch()} />
  if (!load) {
    return (
      <ErrorState
        title="Carga não encontrada"
        description="Esta carga pode ter sido removida ou o link está incorreto."
      />
    )
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to={ROUTES.loads}>
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      </Button>

      <PageHeader
        title={load.title}
        description={`${load.company?.trade_name ?? 'Empresa'} · Publicado em ${formatDate(load.created_at)}`}
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.success('Carga salva nos favoritos')}
            >
              <Heart className="h-4 w-4" />
              Favoritar
            </Button>
            <Button type="button" onClick={() => toast.success('Candidatura enviada!')}>
              Candidatar-se
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Detalhes</CardTitle>
            <Badge>{LOAD_STATUS[load.status]}</Badge>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="leading-relaxed text-muted-foreground">{load.description}</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  <strong className="block text-foreground">Rota</strong>
                  {load.origin_city}/{load.origin_state} → {load.destination_city}/
                  {load.destination_state}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Package className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  <strong className="block text-foreground">Carga</strong>
                  {load.cargo_type} · {(load.weight_kg / 1000).toFixed(1)} t
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Truck className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  <strong className="block text-foreground">Veículo</strong>
                  {load.vehicle_type}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 text-primary" />
                <span>
                  <strong className="block text-foreground">Candidaturas</strong>
                  {load.applications_count ?? 0} motoristas
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proposta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Valor do frete</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(load.price)}</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Coleta</p>
              <p className="font-medium">{formatDate(load.pickup_date)}</p>
            </div>
            <Button asChild className="w-full" variant="outline">
              <Link to={ROUTES.messages}>Abrir chat</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
