import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateLoad } from '@/hooks/use-loads'
import { loadSchema, type LoadInput } from '@/lib/validations'
import { BRAZILIAN_STATES, CARGO_TYPES, ROUTES, VEHICLE_TYPES } from '@/constants'

export function LoadNewPage() {
  const navigate = useNavigate()
  const createLoad = useCreateLoad()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoadInput>({
    resolver: zodResolver(loadSchema),
    defaultValues: {
      title: '',
      description: '',
      originCity: '',
      originState: 'SP',
      destinationCity: '',
      destinationState: 'RJ',
      cargoType: 'Carga seca',
      weightKg: 1000,
      price: 1000,
      vehicleType: 'Truck',
      pickupDate: new Date().toISOString().slice(0, 10),
    },
  })

  const onSubmit = async (data: LoadInput) => {
    const load = await createLoad.mutateAsync(data)
    navigate(`/app/cargas/${load.id}`)
  }

  return (
    <div>
      <PageHeader
        title="Nova carga"
        description="Preencha os dados com clareza — motoristas respondem melhor a anúncios completos."
      />

      <Card>
        <CardContent className="p-6">
          <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Ex: Soja a granel — 30 toneladas"
                aria-label="Título da carga"
                autoComplete="off"
                {...register('title')}
              />
              {errors.title ? <p className="text-xs text-destructive">{errors.title.message}</p> : null}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Detalhes da coleta, descarga, documentos e requisitos"
                aria-label="Descrição da carga"
                {...register('description')}
              />
              {errors.description ? (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originCity">Cidade de origem</Label>
              <Input
                id="originCity"
                placeholder="Cidade"
                aria-label="Cidade de origem"
                autoComplete="address-level2"
                {...register('originCity')}
              />
              {errors.originCity ? (
                <p className="text-xs text-destructive">{errors.originCity.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originState">UF origem</Label>
              <Select
                value={watch('originState')}
                onValueChange={(v) => setValue('originState', v, { shouldValidate: true })}
              >
                <SelectTrigger id="originState" aria-label="UF de origem">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BRAZILIAN_STATES.map((uf) => (
                    <SelectItem key={uf} value={uf}>
                      {uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destinationCity">Cidade de destino</Label>
              <Input
                id="destinationCity"
                placeholder="Cidade"
                aria-label="Cidade de destino"
                autoComplete="address-level2"
                {...register('destinationCity')}
              />
              {errors.destinationCity ? (
                <p className="text-xs text-destructive">{errors.destinationCity.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="destinationState">UF destino</Label>
              <Select
                value={watch('destinationState')}
                onValueChange={(v) => setValue('destinationState', v, { shouldValidate: true })}
              >
                <SelectTrigger id="destinationState" aria-label="UF de destino">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BRAZILIAN_STATES.map((uf) => (
                    <SelectItem key={uf} value={uf}>
                      {uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargoType">Tipo de carga</Label>
              <Select
                value={watch('cargoType')}
                onValueChange={(v) => setValue('cargoType', v, { shouldValidate: true })}
              >
                <SelectTrigger id="cargoType" aria-label="Tipo de carga">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CARGO_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Tipo de veículo</Label>
              <Select
                value={watch('vehicleType')}
                onValueChange={(v) => setValue('vehicleType', v, { shouldValidate: true })}
              >
                <SelectTrigger id="vehicleType" aria-label="Tipo de veículo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weightKg">Peso (kg)</Label>
              <Input
                id="weightKg"
                type="number"
                placeholder="10000"
                aria-label="Peso em quilogramas"
                autoComplete="off"
                {...register('weightKg')}
              />
              {errors.weightKg ? (
                <p className="text-xs text-destructive">{errors.weightKg.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Valor do frete (R$)</Label>
              <Input
                id="price"
                type="number"
                placeholder="5000"
                aria-label="Valor do frete"
                autoComplete="off"
                {...register('price')}
              />
              {errors.price ? <p className="text-xs text-destructive">{errors.price.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupDate">Data de coleta</Label>
              <Input
                id="pickupDate"
                type="date"
                aria-label="Data de coleta"
                autoComplete="off"
                {...register('pickupDate')}
              />
              {errors.pickupDate ? (
                <p className="text-xs text-destructive">{errors.pickupDate.message}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 sm:col-span-2 sm:justify-end">
              <Button type="button" variant="outline" onClick={() => navigate(ROUTES.loads)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={createLoad.isPending}>
                {createLoad.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Publicar carga
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
