import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Algo deu errado',
  description = 'Não foi possível carregar os dados. Tente novamente.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-red-50 px-6 py-12 text-center dark:bg-red-950/20',
        className,
      )}
    >
      <AlertTriangle className="mb-3 h-8 w-8 text-destructive" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {onRetry ? (
        <Button className="mt-6" variant="outline" onClick={onRetry} type="button">
          Tentar novamente
        </Button>
      ) : null}
    </section>
  )
}
