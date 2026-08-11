import { Truck } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockVehicles } from '@/services/mock-data'
import { toast } from 'sonner'

export function VehiclesPage() {
  return (
    <div>
      <PageHeader
        title="Veículos"
        description="Cadastro e status da frota vinculada à sua operação."
        actions={
          <Button type="button" onClick={() => toast.message('Formulário de veículo em breve')}>
            <Truck className="h-4 w-4" />
            Novo veículo
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Frota cadastrada</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Capacidade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.plate}</TableCell>
                  <TableCell>
                    {vehicle.brand} {vehicle.model} ({vehicle.year})
                  </TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{(vehicle.capacity_kg / 1000).toFixed(1)} t</TableCell>
                  <TableCell>
                    {vehicle.is_active ? (
                      <Badge variant="success">Ativo</Badge>
                    ) : (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
