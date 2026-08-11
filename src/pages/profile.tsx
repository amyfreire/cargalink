import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/auth-context'
import { profileSchema, type ProfileInput } from '@/lib/validations'
import { getInitials } from '@/lib/utils'
import { toast } from 'sonner'

export function ProfilePage() {
  const { user } = useAuth()
  const name = user?.profile.full_name ?? 'Usuário'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: name,
      phone: user?.profile.phone ?? '',
      bio: user?.profile.bio ?? '',
    },
  })

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400))
    toast.success('Perfil atualizado')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Perfil" description="Gerencie seus dados pessoais e foto." />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-xl">{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="mt-1 text-xs capitalize text-primary">{user?.profile.role}</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => toast.message('Upload via Supabase Storage')}>
              Alterar foto
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Dados pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <Input
                  id="fullName"
                  placeholder="Seu nome"
                  aria-label="Nome completo"
                  autoComplete="name"
                  {...register('fullName')}
                />
                {errors.fullName ? (
                  <p className="text-xs text-destructive">{errors.fullName.message}</p>
                ) : null}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  aria-label="Telefone"
                  autoComplete="tel"
                  {...register('phone')}
                />
                {errors.phone ? <p className="text-xs text-destructive">{errors.phone.message}</p> : null}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Conte um pouco sobre você ou sua operação"
                  aria-label="Biografia"
                  {...register('bio')}
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={isSubmitting}>
                  Salvar alterações
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
