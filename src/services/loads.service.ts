import { mockLoads } from '@/services/mock-data'
import type { Load, LoadStatus } from '@/types'
import { sleep } from '@/lib/utils'
import type { LoadInput } from '@/lib/validations'

export interface LoadFilters {
  search?: string
  status?: LoadStatus | 'all'
  state?: string
  vehicleType?: string
  page?: number
  pageSize?: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/** Loads service — uses mock data until Supabase is configured. */
export async function fetchLoads(filters: LoadFilters = {}): Promise<PaginatedResult<Load>> {
  await sleep(350)

  const {
    search = '',
    status = 'all',
    state = '',
    vehicleType = '',
    page = 1,
    pageSize = 12,
  } = filters

  let filtered = [...mockLoads]

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (load) =>
        load.title.toLowerCase().includes(q) ||
        load.origin_city.toLowerCase().includes(q) ||
        load.destination_city.toLowerCase().includes(q) ||
        load.cargo_type.toLowerCase().includes(q),
    )
  }

  if (status !== 'all') {
    filtered = filtered.filter((load) => load.status === status)
  }

  if (state) {
    filtered = filtered.filter(
      (load) => load.origin_state === state || load.destination_state === state,
    )
  }

  if (vehicleType) {
    filtered = filtered.filter((load) => load.vehicle_type === vehicleType)
  }

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  const data = filtered.slice(start, start + pageSize)

  return { data, total, page, pageSize, totalPages }
}

export async function fetchLoadById(id: string): Promise<Load | null> {
  await sleep(250)
  return mockLoads.find((load) => load.id === id) ?? null
}

export async function createLoad(input: LoadInput): Promise<Load> {
  await sleep(400)
  const load: Load = {
    id: crypto.randomUUID(),
    company_id: 'demo-company',
    title: input.title,
    description: input.description,
    origin_city: input.originCity,
    origin_state: input.originState,
    destination_city: input.destinationCity,
    destination_state: input.destinationState,
    cargo_type: input.cargoType,
    weight_kg: input.weightKg,
    price: input.price,
    vehicle_type: input.vehicleType,
    pickup_date: input.pickupDate,
    delivery_date: null,
    status: 'open',
    applications_count: 0,
    company: { trade_name: 'Sua Empresa', rating_avg: 5, logo_url: null },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  }
  mockLoads.unshift(load)
  return load
}
