import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  Heart,
  MapPin,
  MessageSquare,
  Package,
  Star,
  Truck,
  X,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { EmptyState } from '@/components/ui/empty-state'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLoad } from '@/hooks/use-loads'
import { useAcceptApplication, useApplications, useRejectApplication } from '@/hooks/use-applications'
import { useTracking } from '@/hooks/use-tracking'
import { LOAD_STATUS, ROUTES, TRACKING_STATUS } from '@/constants'
import { formatCurrency, formatDate, formatRelativeTime, getInitials } from '@/lib/utils'
import { toast } from 'sonner'
import type { ApplicationStatus } from '@/types'

const APPLICATION_BADGE: Record<ApplicationStatus, { label: string; variant: 'success' | 'warning' | 'destructive' | 'secondary' }> = {
  pending: { label: 'Pendente', variant: 'warning' },
  accepted: { label: 'Aceita', variant: 'success' },
  rejected: { label: 'Recusada', variant: 'destructive' },
  withdrawn: { label: 'Retirada', variant: 'secondary' },
}

export function LoadDetailPage() {
  const { id } = useParams()
  const { data: load, isLoading, isError, refetch } = useLoad(id)
  const { data: applications } = useApplications(id)
  const { data: trackingEvents } = useTracking(id)
  const acceptApplication = useAcceptApplication(id ?? '')
  const rejectApplication = useRejectApplication(id ?? '')

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

  const pendingCount = applications?.filter((a) => a.status === 'pending').length ?? 0
  const showTracking = load.status === 'in_progress' || load.status === 'completed'

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

      <Tabs defaultValue="detalhes">
        <TabsList>
          <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
          <TabsTrigger value="candidatos">
            Candidatos{applications?.length ? ` (${applications.length})` : ''}
          </TabsTrigger>
          {showTracking && <TabsTrigger value="rastreio">Rastreio</TabsTrigger>}
        </TabsList>

        <TabsContent value="detalhes">
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
                  <p className="font-data text-3xl font-semibold text-primary">
                    {formatCurrency(load.price)}
                  </p>
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
        </TabsContent>

        <TabsContent value="candidatos">
          {!applications || applications.length === 0 ? (
            <EmptyState
              title="Nenhuma candidatura ainda"
              description="Motoristas interessados vão aparecer aqui."
            />
          ) : (
            <div className="space-y-3">
              {pendingCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  {pendingCount} candidatura{pendingCount > 1 ? 's' : ''} aguardando resposta
                </p>
              )}
              {applications.map((application) => {
                const badge = APPLICATION_BADGE[application.status]
                return (
                  <Card key={application.id}>
                    <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{getInitials(application.driver.full_name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate font-semibold">{application.driver.full_name}</h3>
                            <Badge variant={badge.variant}>{badge.label}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {application.driver.city}/{application.driver.state}
                            {' · '}
                            <span className="inline-flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current text-primary" />
                              {application.driver.rating_avg.toFixed(1)} (
                              {application.driver.rating_count})
                            </span>
                          </p>
                          {application.message && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              &ldquo;{application.message}&rdquo;
                            </p>
                          )}
                          {application.proposed_price !== null && (
                            <p className="font-data mt-1 text-sm font-medium">
                              Proposta: {formatCurrency(application.proposed_price)}
                            </p>
                          )}
                        </div>
                      </div>
                      {application.status === 'pending' && (
                        <div className="flex shrink-0 gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            disabled={rejectApplication.isPending}
                            onClick={() => rejectApplication.mutate(application.id)}
                          >
                            <X className="h-4 w-4" />
                            Recusar
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            disabled={acceptApplication.isPending}
                            onClick={() => acceptApplication.mutate(application.id)}
                          >
                            <Check className="h-4 w-4" />
                            Aceitar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {showTracking && (
          <TabsContent value="rastreio">
            {!trackingEvents || trackingEvents.length === 0 ? (
              <EmptyState
                title="Sem eventos de rastreio"
                description="O acompanhamento aparece assim que a carga é aceita."
              />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <ol className="space-y-6">
                    {trackingEvents.map((event, index) => (
                      <li key={event.id} className="relative flex gap-4 pl-1">
                        <div className="flex flex-col items-center">
                          <span
                            className={
                              index === trackingEvents.length - 1
                                ? 'h-2.5 w-2.5 shrink-0 rounded-full bg-primary'
                                : 'h-2.5 w-2.5 shrink-0 rounded-full border-2 border-primary bg-background'
                            }
                          />
                          {index < trackingEvents.length - 1 && (
                            <span className="mt-1 w-px flex-1 bg-border" />
                          )}
                        </div>
                        <div className="pb-1">
                          <p className="font-medium">{TRACKING_STATUS[event.status]}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {event.location ? `${event.location} · ` : ''}
                            {formatRelativeTime(event.created_at)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
