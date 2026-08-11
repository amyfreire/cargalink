import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/auth-context'
import { AppLayout } from '@/components/layout/app-layout'
import { AuthLayout } from '@/components/layout/auth-layout'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { LoadingState } from '@/components/ui/loading-state'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ROUTES } from '@/constants'

const LandingPage = lazy(() =>
  import('@/pages/landing').then((m) => ({ default: m.LandingPage })),
)
const LoginPage = lazy(() =>
  import('@/pages/auth/login').then((m) => ({ default: m.LoginPage })),
)
const RegisterPage = lazy(() =>
  import('@/pages/auth/register').then((m) => ({ default: m.RegisterPage })),
)
const ForgotPasswordPage = lazy(() =>
  import('@/pages/auth/forgot-password').then((m) => ({ default: m.ForgotPasswordPage })),
)
const DashboardPage = lazy(() =>
  import('@/pages/dashboard').then((m) => ({ default: m.DashboardPage })),
)
const LoadsListPage = lazy(() =>
  import('@/pages/loads/loads-list').then((m) => ({ default: m.LoadsListPage })),
)
const LoadNewPage = lazy(() =>
  import('@/pages/loads/load-new').then((m) => ({ default: m.LoadNewPage })),
)
const LoadDetailPage = lazy(() =>
  import('@/pages/loads/load-detail').then((m) => ({ default: m.LoadDetailPage })),
)
const DriversPage = lazy(() =>
  import('@/pages/drivers').then((m) => ({ default: m.DriversPage })),
)
const VehiclesPage = lazy(() =>
  import('@/pages/vehicles').then((m) => ({ default: m.VehiclesPage })),
)
const MapPage = lazy(() => import('@/pages/map').then((m) => ({ default: m.MapPage })))
const MessagesPage = lazy(() =>
  import('@/pages/messages').then((m) => ({ default: m.MessagesPage })),
)
const FinancePage = lazy(() =>
  import('@/pages/finance').then((m) => ({ default: m.FinancePage })),
)
const NotificationsPage = lazy(() =>
  import('@/pages/notifications').then((m) => ({ default: m.NotificationsPage })),
)
const ReviewsPage = lazy(() =>
  import('@/pages/reviews').then((m) => ({ default: m.ReviewsPage })),
)
const ProfilePage = lazy(() =>
  import('@/pages/profile').then((m) => ({ default: m.ProfilePage })),
)
const CompanyPage = lazy(() =>
  import('@/pages/company').then((m) => ({ default: m.CompanyPage })),
)
const SettingsPage = lazy(() =>
  import('@/pages/settings').then((m) => ({ default: m.SettingsPage })),
)
const AdminPage = lazy(() =>
  import('@/pages/admin').then((m) => ({ default: m.AdminPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })),
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingState />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="cargalink-theme">
        <TooltipProvider delayDuration={200}>
          <AuthProvider>
            <BrowserRouter>
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path={ROUTES.home} element={<LandingPage />} />

                  <Route element={<AuthLayout />}>
                    <Route path={ROUTES.login} element={<LoginPage />} />
                    <Route path={ROUTES.register} element={<RegisterPage />} />
                    <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
                  </Route>

                  <Route
                    path={ROUTES.dashboard}
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<DashboardPage />} />
                    <Route path="perfil" element={<ProfilePage />} />
                    <Route path="empresa" element={<CompanyPage />} />
                    <Route path="motoristas" element={<DriversPage />} />
                    <Route path="veiculos" element={<VehiclesPage />} />
                    <Route path="cargas" element={<LoadsListPage />} />
                    <Route path="cargas/nova" element={<LoadNewPage />} />
                    <Route path="cargas/:id" element={<LoadDetailPage />} />
                    <Route path="mapa" element={<MapPage />} />
                    <Route path="mensagens" element={<MessagesPage />} />
                    <Route path="financeiro" element={<FinancePage />} />
                    <Route path="notificacoes" element={<NotificationsPage />} />
                    <Route path="avaliacoes" element={<ReviewsPage />} />
                    <Route path="configuracoes" element={<SettingsPage />} />
                    <Route path="administracao" element={<AdminPage />} />
                  </Route>

                  <Route path="/app/*" element={<Navigate to={ROUTES.dashboard} replace />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
            <Toaster richColors position="top-right" closeButton />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
