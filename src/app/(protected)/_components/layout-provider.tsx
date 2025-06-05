import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'
import AppHeader from './app-header'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function LayoutProvider({  children }: { 
  children: React.ReactNode }) {
    return (
            
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full flex flex-col'>
              <AppHeader /> 
                <div className='flex-grow p-10'>
                  {children}
                </div>  
            </div>
          </SidebarProvider>


    )
  }

export default LayoutProvider