import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { mockDrivers, mockLoads } from '@/services/mock-data'
import { toast } from 'sonner'

export function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Administração"
        description="Painel operacional para moderação, auditoria e saúde da plataforma."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Usuários ativos', value: '3.842' },
          { label: 'Cargas abertas', value: String(mockLoads.filter((l) => l.status === 'open').length) },
          { label: 'Motoristas', value: String(mockDrivers.length) },
          { label: 'Alertas', value: '2' },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Moderação de cargas</CardTitle>
          <Badge variant="warning">Atenção</Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Carga</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLoads.slice(0, 5).map((load) => (
                <TableRow key={load.id}>
                  <TableCell className="font-medium">{load.title}</TableCell>
                  <TableCell>{load.company?.trade_name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{load.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => toast.success('Ação registrada no audit log')}
                    >
                      Revisar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Audit log (amostra)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>· user:demo atualizou carga #1 — status open → in_progress</p>
          <p>· user:admin aprovou motorista d2</p>
          <p>· payment:p1 marcado como paid via PIX</p>
        </CardContent>
      </Card>
    </div>
  )
}
