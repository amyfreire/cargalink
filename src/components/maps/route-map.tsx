import type { MapMarker } from '@/types'
import { cn } from '@/lib/utils'

interface RouteMapProps {
  markers: MapMarker[]
  className?: string
}

/** Mapa esquemático — sem “mapa mágico” genérico de template. */
export function RouteMap({ markers, className }: RouteMapProps) {
  return (
    <section
      className={cn('overflow-hidden rounded-lg border border-border bg-card', className)}
      aria-label="Mapa de rotas"
    >
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold">Rotas em operação</h3>
          <p className="text-xs text-muted-foreground">Visão esquemática · demo</p>
        </div>
        <span className="font-data text-[11px] text-muted-foreground">{markers.length} pontos</span>
      </header>

      <div className="relative min-h-[260px] bg-[linear-gradient(#e7e5e4_1px,transparent_1px),linear-gradient(90deg,#e7e5e4_1px,transparent_1px)] bg-[size:24px_24px] p-4 dark:bg-[linear-gradient(#292524_1px,transparent_1px),linear-gradient(90deg,#292524_1px,transparent_1px)] sm:min-h-[320px]">
        <ul className="relative h-full min-h-[220px]">
          {markers.map((marker, index) => {
            const left = 10 + ((index * 18) % 72)
            const top = 14 + ((index * 21) % 58)
            const tone =
              marker.type === 'driver'
                ? 'border-primary text-primary'
                : marker.type === 'origin'
                  ? 'border-success text-success'
                  : 'border-stone-500 text-stone-600 dark:text-stone-300'

            return (
              <li
                key={marker.id}
                className="absolute"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <button
                  type="button"
                  className={cn(
                    'max-w-[10rem] truncate rounded-sm border bg-card px-2 py-1 text-left text-[11px] font-medium shadow-sm',
                    tone,
                  )}
                  title={marker.label}
                  aria-label={marker.label}
                >
                  {marker.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <footer className="flex flex-wrap gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-success" /> Origem
        </span>
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-stone-500" /> Destino
        </span>
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-primary" /> Motorista
        </span>
      </footer>
    </section>
  )
}
