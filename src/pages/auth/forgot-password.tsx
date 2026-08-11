import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations'
import { resetPassword } from '@/services/auth.service'
import { ROUTES } from '@/constants'
import { toast } from 'sonner'

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      await resetPassword(data.email)
      setSent(true)
      toast.success('Se o e-mail existir, enviamos as instruções')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao enviar e-mail')
    }
  }

  return (
    <article>
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Esqueci a senha</h1>
        <p className="text-sm text-muted-foreground">Enviaremos um link de redefinição para o seu e-mail</p>
      </header>

      {sent ? (
        <Alert variant="success" className="mb-6">
          <AlertDescription>
            Verifique sua caixa de entrada (e o spam). O link expira em pouco tempo por segurança.
          </AlertDescription>
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Enviar link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to={ROUTES.login} className="font-medium text-primary hover:underline">
          Voltar ao login
        </Link>
      </p>
    </article>
  )
}
