import { Link, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Menu, Moon, Search, Settings, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'
import { useSidebar } from '@/contexts/sidebar-context'
import { ROUTES } from '@/constants'
import { getInitials } from '@/lib/utils'
import { mockNotifications } from '@/services/mock-data'
import { toast } from 'sonner'

export function AppNavbar() {
  const { user, signOut } = useAuth()
  const { setMobileOpen } = useSidebar()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  const unread = mockNotifications.filter((n) => !n.read_at).length
  const name = user?.profile.full_name ?? 'Usuário'

  const handleSignOut = async () => {
    await signOut()
    toast.success('Sessão encerrada')
    navigate(ROUTES.login)
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-card px-3 sm:h-14 sm:gap-3 sm:px-5">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <form className="hidden min-w-0 flex-1 md:block md:max-w-md" role="search" onSubmit={(e) => e.preventDefault()}>
        <Label htmlFor="global-search" className="sr-only">
          Busca global
        </Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="global-search"
            type="search"
            placeholder="Buscar cargas, motoristas, rotas…"
            aria-label="Busca global"
            autoComplete="off"
            className="pl-9"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button type="button" variant="ghost" size="icon" className="relative" asChild>
          <Link to={ROUTES.notifications} aria-label={`Notificações${unread ? `, ${unread} não lidas` : ''}`}>
            <Bell className="h-5 w-5" />
            {unread > 0 ? (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            ) : null}
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" className="relative h-10 gap-2 rounded-full px-1.5 sm:px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profile.avatar_url ?? undefined} alt="" />
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
              <span className="hidden max-w-[8rem] truncate text-sm font-medium sm:inline">{name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={ROUTES.profile}>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={ROUTES.settings}>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => void handleSignOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
