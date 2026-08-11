import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'

export function NotFoundPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="text-3xl font-bold tracking-tight">Página não encontrada</h1>
      <p className="max-w-md text-muted-foreground">
        O endereço pode ter mudado ou a página não existe mais.
      </p>
      <Button asChild>
        <Link to={ROUTES.home}>Voltar ao início</Link>
      </Button>
    </main>
  )
}
