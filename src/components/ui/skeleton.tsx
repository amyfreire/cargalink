import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-skeleton rounded-xl bg-muted', className)}
      aria-hidden="true"
      {...props}
    />
  )
}

export { Skeleton }
