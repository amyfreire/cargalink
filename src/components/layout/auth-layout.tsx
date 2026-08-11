import { Outlet, Link } from 'react-router-dom'
import { Logo } from '@/components/layout/logo'
import { APP_TAGLINE } from '@/constants'

export function AuthLayout() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between border-r border-border bg-foreground p-10 text-background lg:flex">
        <Logo inverted to="/" />
        <div className="max-w-sm space-y-3">
          <p className="label-caps text-background/50">CargaLink</p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight">{APP_TAGLINE}</h1>
          <p className="text-sm leading-relaxed text-background/65">
            Publique a carga, fale com o motorista e acompanhe o frete — sem planilha e sem grupo de
            WhatsApp.
          </p>
        </div>
        <p className="text-xs text-background/45">© {new Date().getFullYear()} CargaLink</p>
      </aside>

      <main className="flex flex-col justify-center px-4 py-8 sm:px-8">
        <div className="mb-8 flex justify-center lg:hidden">
          <Logo />
        </div>
        <div className="mx-auto w-full max-w-sm animate-fade-in">
          <Outlet />
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground hover:underline">
            Voltar
          </Link>
        </p>
      </main>
    </div>
  )
}
