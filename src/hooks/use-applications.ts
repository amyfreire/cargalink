import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  acceptApplication,
  fetchApplicationsByLoad,
  rejectApplication,
} from '@/services/applications.service'
import { toast } from 'sonner'

export function useApplications(loadId: string | undefined) {
  return useQuery({
    queryKey: ['applications', loadId],
    queryFn: () => fetchApplicationsByLoad(loadId!),
    enabled: Boolean(loadId),
  })
}

export function useAcceptApplication(loadId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (applicationId: string) => acceptApplication(loadId, applicationId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['applications', loadId] })
      toast.success('Motorista aceito. Frete em andamento.')
    },
    onError: () => {
      toast.error('Não foi possível aceitar a candidatura')
    },
  })
}

export function useRejectApplication(loadId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (applicationId: string) => rejectApplication(loadId, applicationId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['applications', loadId] })
      toast.message('Candidatura recusada')
    },
    onError: () => {
      toast.error('Não foi possível recusar a candidatura')
    },
  })
}
