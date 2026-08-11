import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { ErrorState } from '@/components/ui/error-state'
import { Pagination } from '@/components/ui/pagination'
import { LoadCard } from '@/components/loads/load-card'
import { useLoads } from '@/hooks/use-loads'
import { BRAZILIAN_STATES, LOAD_STATUS, PAGE_SIZE, ROUTES, VEHICLE_TYPES } from '@/constants'
import type { LoadStatus } from '@/types'

export function LoadsListPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<LoadStatus | 'all'>('all')
  const [state, setState] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [page, setPage] = useState(1)

  const filters = useMemo(
    () => ({
      search,
      status,
      state: state === 'all' ? '' : state,
      vehicleType: vehicleType === 'all' ? '' : vehicleType,
      page,
      pageSize: PAGE_SIZE,
    }),
    [search, status, state, vehicleType, page],
  )

  const { data, isLoading, isError, refetch } = useLoads(filters)

  return (
    <div>
      <PageHeader
        title="Cargas"
        description="Busque fretes, filtre por rota e publique novas oportunidades."
        actions={
          <Button asChild>
            <Link to={ROUTES.loadNew}>
              <Plus className="h-4 w-4" />
              Nova carga
            </Link>
          </Button>
        }
      />

      <section className="mb-6 grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <SearchInput
          id="loads-search"
          placeholder="Origem, destino, tipo…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          aria-label="Buscar cargas"
        />

        <div className="space-y-1.5">
          <Label htmlFor="status-filter" className="sr-only">
            Status
          </Label>
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v as LoadStatus | 'all')
              setPage(1)
            }}
          >
            <SelectTrigger id="status-filter" aria-label="Filtrar por status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              {(Object.keys(LOAD_STATUS) as LoadStatus[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {LOAD_STATUS[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="state-filter" className="sr-only">
            Estado
          </Label>
          <Select
            value={state || 'all'}
            onValueChange={(v) => {
              setState(v === 'all' ? '' : v)
              setPage(1)
            }}
          >
            <SelectTrigger id="state-filter" aria-label="Filtrar por estado">
              <SelectValue placeholder="UF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
              {BRAZILIAN_STATES.map((uf) => (
                <SelectItem key={uf} value={uf}>
                  {uf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="vehicle-filter" className="sr-only">
            Veículo
          </Label>
          <Select
            value={vehicleType || 'all'}
            onValueChange={(v) => {
              setVehicleType(v === 'all' ? '' : v)
              setPage(1)
            }}
          >
            <SelectTrigger id="vehicle-filter" aria-label="Filtrar por veículo">
              <SelectValue placeholder="Veículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os veículos</SelectItem>
              {VEHICLE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))}
        </div>
      ) : null}

      {isError ? <ErrorState onRetry={() => void refetch()} /> : null}

      {!isLoading && !isError && data?.data.length === 0 ? (
        <EmptyState
          title="Nenhuma carga encontrada"
          description="Ajuste os filtros ou publique uma nova carga."
          actionLabel="Nova carga"
          onAction={() => {
            window.location.href = ROUTES.loadNew
          }}
        />
      ) : null}

      {!isLoading && !isError && data && data.data.length > 0 ? (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            {data.total} resultado{data.total === 1 ? '' : 's'}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.data.map((load) => (
              <LoadCard key={load.id} load={load} />
            ))}
          </div>
          <Pagination
            className="mt-8"
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      ) : null}
    </div>
  )
}
