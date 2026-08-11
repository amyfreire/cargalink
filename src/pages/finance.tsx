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
import { SimpleAreaChart } from '@/components/charts/simple-area-chart'
import { mockPayments, mockRevenueChart } from '@/services/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'

const statusLabel = {
  pending: 'Pendente',
  paid: 'Pago',
  failed: 'Falhou',
  refunded: 'Estornado',
} as const

const statusVariant = {
  pending: 'warning',
  paid: 'success',
  failed: 'destructive',
  refunded: 'secondary',
} as const

export function FinancePage() {
  const paid = mockPayments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const pending = mockPayments
    .filter((p) => p.status === 'pending')
    .reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financeiro"
        description="Acompanhe pagamentos, recebimentos e projeção de receita."
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Recebido</p>
            <p className="mt-1 text-2xl font-bold text-success">{formatCurrency(paid)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Pendente</p>
            <p className="mt-1 text-2xl font-bold text-warning">{formatCurrency(pending)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total listado</p>
            <p className="mt-1 text-2xl font-bold text-primary">{formatCurrency(paid + pending)}</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Receita</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleAreaChart data={mockRevenueChart} currency />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{payment.method ?? '—'}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[payment.status]}>
                      {statusLabel[payment.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.paid_at ? formatDate(payment.paid_at) : formatDate(payment.created_at)}
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
