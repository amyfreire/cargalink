import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { companySchema, type CompanyInput } from '@/lib/validations'
import { BRAZILIAN_STATES } from '@/constants'
import { toast } from 'sonner'

export function CompanyPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CompanyInput>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      legalName: 'AgroSul Logística LTDA',
      tradeName: 'AgroSul',
      document: '12.345.678/0001-90',
      phone: '(11) 4000-1234',
      city: 'São Paulo',
      state: 'SP',
    },
  })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400))
    toast.success('Dados da empresa salvos')
  }

  return (
    <div>
      <PageHeader
        title="Empresa"
        description="Informações cadastrais do embarcador / transportadora."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cadastro empresarial</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2">
              <Label htmlFor="legalName">Razão social</Label>
              <Input
                id="legalName"
                placeholder="Razão social"
                aria-label="Razão social"
                autoComplete="organization"
                {...register('legalName')}
              />
              {errors.legalName ? (
                <p className="text-xs text-destructive">{errors.legalName.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tradeName">Nome fantasia</Label>
              <Input
                id="tradeName"
                placeholder="Nome fantasia"
                aria-label="Nome fantasia"
                autoComplete="organization"
                {...register('tradeName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document">CNPJ</Label>
              <Input
                id="document"
                placeholder="00.000.000/0000-00"
                aria-label="CNPJ"
                autoComplete="off"
                {...register('document')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 0000-0000"
                aria-label="Telefone da empresa"
                autoComplete="tel"
                {...register('phone')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                placeholder="Cidade"
                aria-label="Cidade"
                autoComplete="address-level2"
                {...register('city')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">UF</Label>
              <Select
                value={watch('state')}
                onValueChange={(v) => setValue('state', v, { shouldValidate: true })}
              >
                <SelectTrigger id="state" aria-label="Estado">
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
            <div className="sm:col-span-2">
              <Button type="submit" disabled={isSubmitting}>
                Salvar empresa
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
