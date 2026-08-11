import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  /** delay em ms para stagger */
  delay?: number
  variant?: 'up' | 'left' | 'scale'
  /** Mantido por API; sempre renderiza wrapper semântico via className no pai se necessário */
  as?: 'div' | 'section' | 'article' | 'li' | 'header' | 'aside'
}

/**
 * Animação de entrada no scroll (fade + slide).
 * Wrapper em div para tipagem simples e estável no mobile.
 */
export function Reveal({ children, className, delay = 0, variant = 'up' }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  const variantClass =
    variant === 'left' ? 'reveal-left' : variant === 'scale' ? 'reveal-scale' : 'reveal'

  return (
    <div
      ref={ref}
      className={cn(variantClass, isVisible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
