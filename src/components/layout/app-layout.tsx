import { Outlet } from 'react-router-dom'
import { AppNavbar } from '@/components/layout/app-navbar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { DemoBanner } from '@/components/layout/demo-banner'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { SidebarProvider } from '@/contexts/sidebar-context'

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-background">
        <DemoBanner />
        <div className="flex min-h-0 min-w-0 flex-1">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AppNavbar />
            <main className="flex-1 overflow-x-hidden p-3 pb-nav sm:p-5 lg:p-8">
              <div className="mx-auto w-full max-w-7xl animate-fade-in">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
        <MobileBottomNav />
      </div>
    </SidebarProvider>
  )
}
