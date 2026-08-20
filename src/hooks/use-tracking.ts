import { useQuery } from '@tanstack/react-query'
import { fetchTrackingByLoad } from '@/services/tracking.service'

export function useTracking(loadId: string | undefined) {
  return useQuery({
    queryKey: ['tracking', loadId],
    queryFn: () => fetchTrackingByLoad(loadId!),
    enabled: Boolean(loadId),
  })
}
