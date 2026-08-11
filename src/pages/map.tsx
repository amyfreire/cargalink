import { PageHeader } from '@/components/ui/page-header'
import { RouteMap } from '@/components/maps/route-map'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockLoads, mockMapMarkers } from '@/services/mock-data'

export function MapPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Mapa"
        description="Visão geográfica de origens, destinos e motoristas ativos."
      />

      <RouteMap markers={mockMapMarkers} className="min-h-[420px]" />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rotas em destaque</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border">
            {mockLoads.slice(0, 4).map((load) => (
              <li key={load.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium">{load.title}</span>
                <span className="text-xs text-muted-foreground">
                  {load.origin_city}/{load.origin_state} → {load.destination_city}/{load.destination_state}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
