import { NavLink } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, Package, Users, Wallet } from 'lucide-react'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

const items = [
  { to: ROUTES.dashboard, label: 'Início', icon: LayoutDashboard, end: true },
  { to: ROUTES.loads, label: 'Cargas', icon: Package, end: false },
  { to: ROUTES.messages, label: 'Chat', icon: MessageSquare, end: false },
  { to: ROUTES.drivers, label: 'Motoristas', icon: Users, end: false },
  { to: ROUTES.finance, label: 'Financeiro', icon: Wallet, end: false },
]

export function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card lg:hidden"
      style={{ paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom))' }}
      aria-label="Navegação principal mobile"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium text-muted-foreground',
                  isActive && 'text-foreground',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn('h-5 w-5', isActive && 'text-primary')}
                    strokeWidth={isActive ? 2.25 : 1.75}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
