import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'
import AppHeader from './app-header'

function LayoutProvider({  children }: { 
  children: React.ReactNode }) {
    return (
        <SidebarProvider>
          <AppSidebar />
          <div className='w-full'>
            <AppHeader /> 
              <div className='p-10'>
                {children}
              </div>  
          </div>
        </SidebarProvider>

    )
  }

export default LayoutProvider