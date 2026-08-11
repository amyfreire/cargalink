import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  Map,
  MessageSquare,
  Wallet,
  Bell,
  Star,
  Settings,
  Building2,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebar } from '@/contexts/sidebar-context'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

const navItems = [
  { to: ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.loads, label: 'Cargas', icon: Package },
  { to: ROUTES.drivers, label: 'Motoristas', icon: Users },
  { to: ROUTES.vehicles, label: 'Veículos', icon: Truck },
  { to: ROUTES.map, label: 'Mapa', icon: Map },
  { to: ROUTES.messages, label: 'Mensagens', icon: MessageSquare },
  { to: ROUTES.finance, label: 'Financeiro', icon: Wallet },
  { to: ROUTES.notifications, label: 'Notificações', icon: Bell },
  { to: ROUTES.reviews, label: 'Avaliações', icon: Star },
  { to: ROUTES.company, label: 'Empresa', icon: Building2 },
  { to: ROUTES.settings, label: 'Configurações', icon: Settings },
  { to: ROUTES.admin, label: 'Administração', icon: Shield },
]

export function AppSidebar() {
  const { isCollapsed, isMobileOpen, toggleCollapsed, setMobileOpen } = useSidebar()

  return (
    <>
      {isMobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(17rem,86vw)] flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-200 lg:static lg:z-0 lg:w-56',
          isCollapsed && 'lg:w-[4.25rem]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
        aria-label="Navegação principal"
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
          <Logo showText={!isCollapsed} to={ROUTES.dashboard} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            onClick={toggleCollapsed}
            aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === ROUTES.dashboard}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isActive && 'bg-secondary font-medium text-foreground',
                    isCollapsed && 'lg:justify-center lg:px-2',
                  )
                }
                title={item.label}
              >
                <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className={cn(isCollapsed && 'lg:hidden')}>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  )
}
