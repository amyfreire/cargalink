import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Reveal } from '@/components/ui/reveal'
import { useAuth } from '@/contexts/auth-context'
import { APP_DESCRIPTION, APP_NAME, ROUTES } from '@/constants'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

const boardLoads = [
  { route: 'Rondonópolis/MT → Santos/SP', type: 'Soja · 30t', price: 12500, vehicle: 'Carreta' },
  { route: 'Curitiba/PR → Campinas/SP', type: 'Frigorificado · 18t', price: 4800, vehicle: 'Carreta' },
  { route: 'São Paulo/SP → Rio de Janeiro/RJ', type: 'Autopeças · 2.2t', price: 1800, vehicle: 'VUC' },
  { route: 'Joinville/SC → Belo Horizonte/MG', type: 'Carga seca · 8.5t', price: 3200, vehicle: 'Truck' },
]

const points = [
  {
    title: 'Menos telefone, mais frete',
    text: 'A carga entra no ar e o motorista vê. Sem grupo de WhatsApp, sem planilha perdida.',
  },
  {
    title: 'Quem é quem',
    text: 'Empresa e motorista com histórico e nota. Você decide com quem fecha.',
  },
  {
    title: 'Tudo no mesmo lugar',
    text: 'Carga, candidatura, conversa e valor. Do anúncio à entrega, sem pular de app.',
  },
]

const steps = [
  { n: '1', title: 'Publica a carga', text: 'Origem, destino, valor e tipo de veículo.' },
  { n: '2', title: 'Recebe interesse', text: 'Motoristas se candidatam ou mandam mensagem.' },
  { n: '3', title: 'Fecha e acompanha', text: 'Combinado o frete, o status fica registrado.' },
]

const quotes = [
  {
    name: 'Mariana C.',
    role: 'Operações, MT',
    text: 'Antes a gente perdia a manhã no telefone. Agora a carga sobe e as propostas chegam sozinhas.',
  },
  {
    name: 'Roberto L.',
    role: 'Motorista, SP',
    text: 'Não é anúncio genérico. Dá pra ver o que é de verdade e se vale o combustível.',
  },
  {
    name: 'Fernanda A.',
    role: 'Embarcadora, PR',
    text: 'Interface limpa. A equipe usou no mesmo dia, sem treinamento.',
  },
]

const faqs = [
  {
    q: 'Preciso pagar para testar?',
    a: 'Neste protótipo não. Você entra e navega o fluxo completo com dados de demonstração.',
  },
  {
    q: 'Serve para empresa e motorista?',
    a: 'Sim. Empresa publica carga; motorista busca e se candidata. O mesmo sistema, papéis diferentes.',
  },
  {
    q: 'Funciona bem no celular?',
    a: 'Sim. O uso principal é no telefone — lista de fretes, chat e status cabem na mão.',
  },
  {
    q: 'Isso já está no ar com banco real?',
    a: 'Ainda é protótipo navegável. A ideia é validar o produto antes de ligar autenticação e banco de verdade.',
  },
]

export function LandingPage() {
  const { enterPrototype, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const openApp = async () => {
    if (isAuthenticated) {
      navigate(ROUTES.dashboard)
      return
    }
    setLoading(true)
    try {
      await enterPrototype()
      navigate(ROUTES.dashboard)
    } catch {
      toast.error('Não foi possível abrir o app')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh overflow-x-hidden bg-background pb-20 sm:pb-0">
      <header className="safe-top sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container-page flex h-14 items-center justify-between gap-3">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label="Menu">
            <a href="#como" className="hover:text-foreground">
              Como funciona
            </a>
            <a href="#cargas" className="hover:text-foreground">
              Fretes
            </a>
            <a href="#faq" className="hover:text-foreground">
              Dúvidas
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to={ROUTES.login}>Entrar</Link>
            </Button>
            <Button type="button" size="sm" disabled={loading} onClick={() => void openApp()}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Abrir app
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero editorial */}
        <section className="border-b border-border">
          <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
            <div className="space-y-6">
              <p className="label-caps text-primary">Marketplace de fretes</p>
              <h1 className="heading-display max-w-[18ch]">
                O frete certo,
                <br />
                sem enrolação.
              </h1>
              <p className="text-body max-w-md">{APP_DESCRIPTION}</p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={loading}
                  onClick={() => void openApp()}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Entrar no protótipo
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a href="#cargas">Ver fretes de exemplo</a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Protótipo navegável · sem cadastro real · dados fictícios
              </p>
            </div>

            {/* Quadro de fretes — visual “produto real”, não mock de dashboard genérico */}
            <aside
              id="cargas"
              className="rounded-lg border border-border bg-card"
              aria-label="Quadro de fretes"
            >
              <header className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">Quadro de fretes</p>
                  <p className="text-xs text-muted-foreground">Atualizado agora · demo</p>
                </div>
                <span className="rounded-sm border border-border px-2 py-0.5 font-data text-[11px] text-muted-foreground">
                  4 abertas
                </span>
              </header>
              <ul className="divide-y divide-border">
                {boardLoads.map((load) => (
                  <li key={load.route}>
                    <button
                      type="button"
                      onClick={() => void openApp()}
                      className="flex w-full flex-col gap-1 px-4 py-3.5 text-left transition-colors hover:bg-secondary/70 active:bg-secondary"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium leading-snug">{load.route}</p>
                        <p className="font-data shrink-0 text-sm font-semibold text-primary">
                          {formatCurrency(load.price)}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                        <span>{load.type}</span>
                        <span aria-hidden="true">·</span>
                        <span>{load.vehicle}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <footer className="border-t border-border px-4 py-3">
                <button
                  type="button"
                  onClick={() => void openApp()}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Ver painel completo →
                </button>
              </footer>
            </aside>
          </div>
        </section>

        {/* Números simples, sem strip “AI” */}
        <section className="border-b border-border bg-secondary/40">
          <div className="container-page grid grid-cols-3 divide-x divide-border py-6 sm:py-8">
            {[
              ['R$ 12,5 mil', 'maior frete no quadro'],
              ['3 papéis', 'empresa, motorista, admin'],
              ['1 app', 'do anúncio ao status'],
            ].map(([value, label]) => (
              <div key={label} className="px-3 text-center sm:px-6">
                <p className="font-data text-sm font-semibold sm:text-lg">{value}</p>
                <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Por quê */}
        <section className="section-pad border-b border-border">
          <div className="container-page">
            <Reveal>
              <header className="mb-8 max-w-xl sm:mb-10">
                <p className="label-caps mb-2">Por que existe</p>
                <h2 className="heading-section">Feito pra quem não tem tempo de “explorar features”</h2>
              </header>
            </Reveal>
            <div className="grid gap-0 border border-border md:grid-cols-3">
              {points.map((item, i) => (
                <Reveal key={item.title} delay={i * 60} className="h-full">
                  <article className="h-full border-b border-border p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 sm:p-6">
                    <p className="font-data text-xs text-primary">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como" className="section-pad border-b border-border bg-card">
          <div className="container-page">
            <Reveal>
              <header className="mb-8 sm:mb-10">
                <p className="label-caps mb-2">Fluxo</p>
                <h2 className="heading-section">Três passos. Acabou.</h2>
              </header>
            </Reveal>
            <ol className="grid gap-6 sm:grid-cols-3 sm:gap-8">
              {steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 50} as="div">
                  <li className="list-none">
                    <p className="font-data text-3xl font-semibold text-stone-300 dark:text-stone-600">
                      {step.n}
                    </p>
                    <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="section-pad border-b border-border">
          <div className="container-page">
            <Reveal>
              <header className="mb-8 sm:mb-10">
                <p className="label-caps mb-2">Quem já usou o fluxo</p>
                <h2 className="heading-section">Feedback de quem vive de frete</h2>
              </header>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {quotes.map((q, i) => (
                <Reveal key={q.name} delay={i * 50}>
                  <blockquote className="flex h-full flex-col border border-border bg-card p-5">
                    <p className="flex-1 text-sm leading-relaxed text-foreground">“{q.text}”</p>
                    <footer className="mt-5 border-t border-border pt-3">
                      <cite className="not-italic">
                        <span className="block text-sm font-medium">{q.name}</span>
                        <span className="text-xs text-muted-foreground">{q.role}</span>
                      </cite>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section-pad border-b border-border">
          <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <header>
                <p className="label-caps mb-2">Dúvidas</p>
                <h2 className="heading-section">Perguntas diretas</h2>
              </header>
            </Reveal>
            <Reveal delay={40}>
              <Accordion type="single" collapsible className="w-full border-t border-border">
                {faqs.map((item, index) => (
                  <AccordionItem key={item.q} value={`f-${index}`} className="border-border">
                    <AccordionTrigger className="py-4 text-left text-sm font-medium hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* CTA final seco */}
        <section className="section-pad">
          <div className="container-page">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 border border-border bg-foreground px-5 py-8 text-background sm:flex-row sm:items-center sm:px-8">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    Quer ver o painel funcionando?
                  </h2>
                  <p className="mt-1.5 max-w-md text-sm text-background/70">
                    Dashboard, cargas, chat e financeiro — tudo clicável neste protótipo.
                  </p>
                </div>
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  className="w-full shrink-0 sm:w-auto"
                  disabled={loading}
                  onClick={() => void openApp()}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Abrir protótipo
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="container-page flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs space-y-2">
            <Logo />
            <p className="text-sm text-muted-foreground">{APP_DESCRIPTION}</p>
          </div>
          <div className="flex gap-12 text-sm">
            <nav aria-label="Links">
              <p className="mb-2 font-medium">Produto</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#como" className="hover:text-foreground">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#cargas" className="hover:text-foreground">
                    Fretes
                  </a>
                </li>
                <li>
                  <button type="button" className="hover:text-foreground" onClick={() => void openApp()}>
                    Abrir app
                  </button>
                </li>
              </ul>
            </nav>
            <nav aria-label="Conta">
              <p className="mb-2 font-medium">Conta</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link to={ROUTES.login} className="hover:text-foreground">
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.register} className="hover:text-foreground">
                    Cadastro
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="container-page mt-8 border-t border-border pt-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {APP_NAME}
        </div>
      </footer>

      <div className="sticky-cta sm:hidden">
        <Button type="button" size="lg" className="w-full" disabled={loading} onClick={() => void openApp()}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Entrar no protótipo
        </Button>
      </div>
    </div>
  )
}
