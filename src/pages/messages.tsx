import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EmptyState } from '@/components/ui/empty-state'
import { mockConversations } from '@/services/mock-data'
import { messageSchema, type MessageInput } from '@/lib/validations'
import { getInitials, formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ChatMessage {
  id: string
  content: string
  mine: boolean
  at: string
}

const seedMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Olá! Tenho interesse na carga de soja.',
    mine: false,
    at: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: '2',
    content: 'Ótimo. A coleta é amanhã cedo no silo.',
    mine: true,
    at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '3',
    content: 'Posso coletar amanhã às 8h?',
    mine: false,
    at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
]

export function MessagesPage() {
  const [activeId, setActiveId] = useState(mockConversations[0]?.id ?? '')
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages)

  const active = useMemo(
    () => mockConversations.find((c) => c.id === activeId) ?? null,
    [activeId],
  )

  const { register, handleSubmit, reset } = useForm<MessageInput>({
    resolver: zodResolver(messageSchema),
  })

  const onSubmit = (data: MessageInput) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: data.content,
        mine: true,
        at: new Date().toISOString(),
      },
    ])
    reset({ content: '' })
  }

  return (
    <div>
      <PageHeader title="Mensagens" description="Negocie fretes com chat integrado e histórico." />

      <div className="grid h-[min(70vh,720px)] gap-4 lg:grid-cols-5">
        <Card className="overflow-hidden lg:col-span-2">
          <CardHeader className="border-b border-border py-4">
            <CardTitle className="text-base">Conversas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[min(58vh,600px)]">
              <ul>
                {mockConversations.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(c.id)}
                      className={cn(
                        'flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-secondary',
                        activeId === c.id && 'bg-secondary',
                      )}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getInitials(c.participant_name)}</AvatarFallback>
                      </Avatar>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-medium">{c.participant_name}</span>
                          {c.unread_count > 0 ? <Badge>{c.unread_count}</Badge> : null}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                          {c.last_message}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="flex flex-col overflow-hidden lg:col-span-3">
          {active ? (
            <>
              <CardHeader className="border-b border-border py-4">
                <CardTitle className="text-base">{active.participant_name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Última mensagem {active.last_message_at ? formatRelativeTime(active.last_message_at) : '—'}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4 p-4">
                <ScrollArea className="flex-1 pr-3">
                  <ul className="space-y-3">
                    {messages.map((msg) => (
                      <li
                        key={msg.id}
                        className={cn('flex', msg.mine ? 'justify-end' : 'justify-start')}
                      >
                        <article
                          className={cn(
                            'max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm',
                            msg.mine
                              ? 'rounded-br-md bg-primary text-primary-foreground'
                              : 'rounded-bl-md border border-border bg-card',
                          )}
                        >
                          <p>{msg.content}</p>
                          <time className="mt-1 block text-[10px] opacity-70">
                            {formatRelativeTime(msg.at)}
                          </time>
                        </article>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>

                <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex-1">
                    <Label htmlFor="chat-message" className="sr-only">
                      Mensagem
                    </Label>
                    <Input
                      id="chat-message"
                      placeholder="Escreva uma mensagem…"
                      aria-label="Mensagem"
                      autoComplete="off"
                      {...register('content')}
                    />
                  </div>
                  <Button type="submit" size="icon" aria-label="Enviar mensagem">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <EmptyState className="m-6" title="Selecione uma conversa" />
          )}
        </Card>
      </div>
    </div>
  )
}
