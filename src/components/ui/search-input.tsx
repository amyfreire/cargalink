import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  containerClassName?: string
}

export function SearchInput({
  label = 'Buscar',
  id = 'search',
  className,
  containerClassName,
  placeholder = 'Buscar…',
  'aria-label': ariaLabel,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn('relative w-full', containerClassName)}>
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        id={id}
        type="search"
        className={cn('pl-9', className)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? label}
        autoComplete="off"
        {...props}
      />
    </div>
  )
}
