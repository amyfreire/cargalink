import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createLoad, fetchLoadById, fetchLoads, type LoadFilters } from '@/services/loads.service'
import type { LoadInput } from '@/lib/validations'
import { toast } from 'sonner'

export function useLoads(filters: LoadFilters) {
  return useQuery({
    queryKey: ['loads', filters],
    queryFn: () => fetchLoads(filters),
  })
}

export function useLoad(id: string | undefined) {
  return useQuery({
    queryKey: ['loads', id],
    queryFn: () => fetchLoadById(id!),
    enabled: Boolean(id),
  })
}

export function useCreateLoad() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: LoadInput) => createLoad(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['loads'] })
      toast.success('Carga publicada com sucesso')
    },
    onError: () => {
      toast.error('Não foi possível publicar a carga')
    },
  })
}
