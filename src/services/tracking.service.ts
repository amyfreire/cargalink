import { mockTrackingEvents } from '@/services/mock-data'
import type { TrackingEvent } from '@/types'
import { sleep } from '@/lib/utils'

/** Tracking service — uses mock data until Supabase is configured. */
export async function fetchTrackingByLoad(loadId: string): Promise<TrackingEvent[]> {
  await sleep(300)
  return mockTrackingEvents[loadId] ?? []
}
