import LayoutProvider from './_components/layout-provider'
import { SessionProvider } from 'next-auth/react';

function ClientLayout({ children,session }: { children: React.ReactNode,session : any }) {
    return (
        <SessionProvider refetchInterval={0} refetchOnWindowFocus={false} session={session}>
            <LayoutProvider>
                <div className='h-full w-full'>
                    {children}
                </div>
            </LayoutProvider>
        </SessionProvider>
    )
}

export default ClientLayout