import { useState } from 'react'
import { Phone, Star } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { SearchInput } from '@/components/ui/search-input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { mockDrivers } from '@/services/mock-data'
import { getInitials } from '@/lib/utils'
import { toast } from 'sonner'

export function DriversPage() {
  const [search, setSearch] = useState('')

  const drivers = mockDrivers.filter((d) =>
    d.full_name.toLowerCase().includes(search.toLowerCase()) ||
    d.city.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      <PageHeader
        title="Motoristas"
        description="Rede de profissionais verificados e avaliados."
      />

      <div className="mb-6 max-w-md">
        <SearchInput
          id="drivers-search"
          placeholder="Buscar por nome ou cidade…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar motoristas"
        />
      </div>

      {drivers.length === 0 ? (
        <EmptyState title="Nenhum motorista encontrado" description="Tente outro termo de busca." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {drivers.map((driver) => (
            <Card key={driver.id} className="transition-shadow hover:shadow-md">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{getInitials(driver.full_name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-semibold">{driver.full_name}</h3>
                      {driver.is_available ? (
                        <Badge variant="success">Disponível</Badge>
                      ) : (
                        <Badge variant="secondary">Em viagem</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {driver.city}/{driver.state} · CNH {driver.cnh_category}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {driver.rating_avg.toFixed(1)} · {driver.rating_count} avaliações
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => toast.message(`Telefone: ${driver.phone}`)}
                  >
                    <Phone className="h-4 w-4" />
                    Contato
                  </Button>
                  <Button type="button" className="flex-1" onClick={() => toast.success('Convite enviado')}>
                    Convidar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
