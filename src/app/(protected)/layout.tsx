import { auth } from '@/server/auth';
import LayoutProvider from './_components/layout-provider'
import { SessionProvider } from 'next-auth/react';
import { redirect } from 'next/navigation';

async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if(!session) return redirect('/')

    return (
        <SessionProvider session={session}>
            <LayoutProvider>
                <div>
                    {children}
                </div>
            </LayoutProvider>
        </SessionProvider>
    )
}

export default Layout