import { Star } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { mockReviews } from '@/services/mock-data'
import { formatDate } from '@/lib/utils'

export function ReviewsPage() {
  const avg =
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(mockReviews.length, 1)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Avaliações"
        description="Reputação construída em cada frete concluído."
      />

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Star className="h-7 w-7 fill-current" />
          </span>
          <div>
            <p className="text-3xl font-bold">{avg.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">
              Média com base em {mockReviews.length} avaliações
            </p>
          </div>
        </CardContent>
      </Card>

      <ul className="grid gap-4 md:grid-cols-2">
        {mockReviews.map((review) => (
          <li key={review.id}>
            <Card className="h-full">
              <CardContent className="space-y-3 p-6">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'opacity-30'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <p className="text-xs text-muted-foreground">{formatDate(review.created_at)}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
