import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/auth-context'
import { loginSchema, type LoginInput } from '@/lib/validations'
import { DEMO_ACCOUNT } from '@/services/auth.service'
import { ROUTES } from '@/constants'
import { toast } from 'sonner'

export function LoginPage() {
  const { signIn, enterPrototype } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [demoLoading, setDemoLoading] = useState(false)

  const from = (location.state as { from?: string } | null)?.from ?? ROUTES.dashboard

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: DEMO_ACCOUNT.email,
      password: DEMO_ACCOUNT.password,
    },
  })

  const goToApp = (path = from) => {
    toast.success('Bem-vindo ao CargaLink!')
    navigate(path, { replace: true })
  }

  const onSubmit = async (data: LoginInput) => {
    setError(null)
    try {
      await signIn(data)
      goToApp()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha no login'
      setError(message)
      toast.error(message)
    }
  }

  const onEnterPrototype = async () => {
    setDemoLoading(true)
    setError(null)
    try {
      await enterPrototype()
      goToApp(ROUTES.dashboard)
    } catch {
      toast.error('Não foi possível abrir o protótipo')
    } finally {
      setDemoLoading(false)
    }
  }

  return (
    <article>
      <header className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
        <p className="text-sm text-muted-foreground">Protótipo com dados de demonstração</p>
      </header>

      <Button
        type="button"
        size="lg"
        className="mb-4 w-full"
        disabled={demoLoading || isSubmitting}
        onClick={() => void onEnterPrototype()}
      >
        {demoLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Entrar no protótipo
      </Button>

      <p className="mb-4 text-center text-xs text-muted-foreground">ou preencha o formulário</p>

      {error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="password">Senha</Label>
            <Link to={ROUTES.forgotPassword} className="text-xs font-medium text-primary hover:underline">
              Esqueci a senha
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Sua senha"
            aria-label="Senha"
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password ? <p className="text-xs text-destructive">{errors.password.message}</p> : null}
        </div>

        <Button type="submit" variant="outline" className="w-full" disabled={isSubmitting || demoLoading}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Entrar
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Não tem conta?{' '}
        <Link to={ROUTES.register} className="font-medium text-primary hover:underline">
          Cadastre-se
        </Link>
      </p>
    </article>
  )
}
