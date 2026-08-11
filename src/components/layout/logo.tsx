import { Link } from 'react-router-dom'
import { APP_NAME } from '@/constants'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
  to?: string
  inverted?: boolean
}

export function Logo({ className, showText = true, to = '/', inverted = false }: LogoProps) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-2.5 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      aria-label={`${APP_NAME} — início`}
    >
      <span
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-sm border text-[11px] font-bold tracking-tight',
          inverted
            ? 'border-white/40 bg-white/10 text-white'
            : 'border-primary/30 bg-primary text-primary-foreground',
        )}
        aria-hidden="true"
      >
        CL
      </span>
      {showText ? (
        <span
          className={cn(
            'text-[15px] font-semibold tracking-tight',
            inverted ? 'text-white' : 'text-foreground',
          )}
        >
          CargaLink
        </span>
      ) : null}
    </Link>
  )
}
