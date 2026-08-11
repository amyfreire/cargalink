import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/contexts/auth-context'
import { registerSchema, type RegisterInput } from '@/lib/validations'
import { ROUTES } from '@/constants'
import { toast } from 'sonner'

export function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      role: 'company',
      password: '',
      confirmPassword: '',
      acceptTerms: undefined,
    },
  })

  const role = watch('role')
  const acceptTerms = watch('acceptTerms')

  const onSubmit = async (data: RegisterInput) => {
    setError(null)
    try {
      await signUp(data)
      toast.success('Conta criada com sucesso!')
      navigate(ROUTES.dashboard, { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha no cadastro'
      setError(message)
      toast.error(message)
    }
  }

  return (
    <article>
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Criar conta</h1>
        <p className="text-sm text-muted-foreground">Empresas e motoristas no mesmo lugar</p>
      </header>

      {error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome completo</Label>
          <Input
            id="fullName"
            placeholder="Seu nome"
            aria-label="Nome completo"
            autoComplete="name"
            {...register('fullName')}
          />
          {errors.fullName ? <p className="text-xs text-destructive">{errors.fullName.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@empresa.com"
            aria-label="E-mail"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
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

        <div className="space-y-2">
          <Label htmlFor="role">Tipo de conta</Label>
          <Select
            value={role}
            onValueChange={(value: 'company' | 'driver') => setValue('role', value, { shouldValidate: true })}
          >
            <SelectTrigger id="role" aria-label="Tipo de conta">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company">Empresa / Embarcador</SelectItem>
              <SelectItem value="driver">Motorista</SelectItem>
            </SelectContent>
          </Select>
          {errors.role ? <p className="text-xs text-destructive">{errors.role.message}</p> : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Mín. 8 caracteres"
              aria-label="Senha"
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password ? <p className="text-xs text-destructive">{errors.password.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repita a senha"
              aria-label="Confirmar senha"
              autoComplete="new-password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword ? (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            ) : null}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms === true}
            onCheckedChange={(checked) =>
              setValue('acceptTerms', checked === true ? true : (undefined as unknown as true), {
                shouldValidate: true,
              })
            }
            aria-label="Aceitar termos de uso"
          />
          <Label htmlFor="acceptTerms" className="text-sm font-normal leading-snug text-muted-foreground">
            Aceito os termos de uso e a política de privacidade
          </Label>
        </div>
        {errors.acceptTerms ? <p className="text-xs text-destructive">{errors.acceptTerms.message}</p> : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Criar conta
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Já tem conta?{' '}
        <Link to={ROUTES.login} className="font-medium text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </article>
  )
}
