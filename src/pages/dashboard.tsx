import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  MessageSquare,
  Package,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { SimpleAreaChart } from '@/components/charts/simple-area-chart'
import { SimpleBarChart } from '@/components/charts/simple-bar-chart'
import { RouteMap } from '@/components/maps/route-map'
import { LoadCard } from '@/components/loads/load-card'
import { useAuth } from '@/contexts/auth-context'
import { ROUTES } from '@/constants'
import {
  mockConversations,
  mockKpis,
  mockLoads,
  mockLoadsChart,
  mockMapMarkers,
  mockNotifications,
  mockRevenueChart,
  mockReviews,
} from '@/services/mock-data'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

export function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.profile.full_name.split(' ')[0] ?? 'você'
  const recentLoads = mockLoads.slice(0, 3)

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Olá, ${firstName}`}
        description="Resumo do que está rolando na operação."
        actions={
          <Button asChild className="w-full sm:w-auto">
            <Link to={ROUTES.loadNew}>
              Nova carga
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <section
        className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3 2xl:grid-cols-6"
        aria-label="Indicadores"
      >
        <KpiCard
          title="Cargas ativas"
          value={String(mockKpis.activeLoads)}
          icon={Package}
          trend="+12% no mês"
          className="col-span-2 sm:col-span-1"
        />
        <KpiCard
          title="Candidaturas"
          value={String(mockKpis.openApplications)}
          icon={Users}
          hint="Sem resposta"
        />
        <KpiCard title="Viagens" value={String(mockKpis.completedTrips)} icon={TrendingUp} />
        <KpiCard
          title="Receita do mês"
          value={formatCurrency(mockKpis.monthlyRevenue)}
          icon={Wallet}
          trend="+8,4%"
          className="col-span-2 sm:col-span-1"
        />
        <KpiCard
          title="Avaliação"
          value={mockKpis.averageRating.toFixed(1)}
          icon={Star}
          hint="Média geral"
        />
        <KpiCard
          title="Mensagens"
          value={String(mockKpis.unreadMessages)}
          icon={MessageSquare}
          hint="Não lidas"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Receita mensal</CardTitle>
            <CardDescription>Evolução dos últimos 8 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleAreaChart data={mockRevenueChart} currency />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cargas na semana</CardTitle>
            <CardDescription>Volume diário</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={mockLoadsChart} />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RouteMap markers={mockMapMarkers} className="h-full min-h-[360px]" />
        </div>
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Notificações
              </CardTitle>
              <CardDescription>Atualizações recentes</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to={ROUTES.notifications}>Ver todas</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockNotifications.map((item) => (
              <article key={item.id} className="rounded-xl border border-border bg-secondary/40 p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  {!item.read_at ? <Badge variant="default">Nova</Badge> : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{item.body}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {formatRelativeTime(item.created_at)}
                </p>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <header className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Últimas cargas</h2>
            <Button asChild variant="outline" size="sm">
              <Link to={ROUTES.loads}>Ver todas</Link>
            </Button>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {recentLoads.map((load) => (
              <LoadCard key={load.id} load={load} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mensagens</CardTitle>
              <CardDescription>Conversas recentes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockConversations.map((c) => (
                <Link
                  key={c.id}
                  to={ROUTES.messages}
                  className="flex items-start justify-between gap-2 rounded-xl border border-border p-3 transition-colors hover:bg-secondary"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{c.participant_name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.last_message}</p>
                  </div>
                  {c.unread_count > 0 ? (
                    <Badge className="shrink-0">{c.unread_count}</Badge>
                  ) : null}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Avaliações</CardTitle>
              <CardDescription>Feedback dos parceiros</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockReviews.map((review) => (
                <article key={review.id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{review.comment}</p>
                </article>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumo financeiro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recebido</span>
                <span className="font-semibold text-success">{formatCurrency(24300)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pendente</span>
                <span className="font-semibold text-warning">{formatCurrency(3200)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="font-medium">Total do mês</span>
                <span className="font-bold text-primary">{formatCurrency(mockKpis.monthlyRevenue)}</span>
              </div>
              <Button asChild variant="outline" className="mt-2 w-full" size="sm">
                <Link to={ROUTES.finance}>Abrir financeiro</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
