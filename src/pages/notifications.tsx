import { Bell } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { mockNotifications } from '@/services/mock-data'
import { formatRelativeTime } from '@/lib/utils'
import { toast } from 'sonner'

export function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notificações"
        description="Alertas de candidaturas, pagamentos e mensagens."
        actions={
          <Button type="button" variant="outline" onClick={() => toast.success('Todas marcadas como lidas')}>
            Marcar todas como lidas
          </Button>
        }
      />

      {mockNotifications.length === 0 ? (
        <EmptyState icon={Bell} title="Sem notificações" description="Você está em dia." />
      ) : (
        <ul className="space-y-3">
          {mockNotifications.map((item) => (
            <li key={item.id}>
              <Card>
                <CardContent className="flex items-start justify-between gap-4 p-4 sm:p-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      {!item.read_at ? <Badge>Nova</Badge> : null}
                      <Badge variant="secondary">{item.type}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatRelativeTime(item.created_at)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
