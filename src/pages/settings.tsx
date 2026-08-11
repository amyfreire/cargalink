import { useTheme } from 'next-themes'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

export function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-6">
      <PageHeader title="Configurações" description="Preferências da conta e da interface." />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Aparência</CardTitle>
          <CardDescription>Tema claro e escuro preparados</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="dark-mode">Modo escuro</Label>
            <p className="text-xs text-muted-foreground">Alterna entre light e dark</p>
          </div>
          <Switch
            id="dark-mode"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            aria-label="Alternar modo escuro"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notificações</CardTitle>
          <CardDescription>Controle o que deseja receber</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: 'email-loads', label: 'E-mail de novas cargas' },
            { id: 'push-messages', label: 'Push de mensagens' },
            { id: 'sms-payments', label: 'SMS de pagamentos' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <Label htmlFor={item.id}>{item.label}</Label>
              <Switch id={item.id} defaultChecked aria-label={item.label} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Segurança</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Sessões protegidas com JWT (Supabase Auth), RLS no banco e validação Zod nos formulários.
          </p>
          <Separator />
          <Button type="button" variant="outline" onClick={() => toast.success('Sessões revogadas (demo)')}>
            Encerrar outras sessões
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
