import LayoutProvider from './_components/layout-provider'
import { SessionProvider } from 'next-auth/react';
import { AuthGuard } from './authGuard';
import { Suspense } from 'react';
import CenteredSpinner from '../_components/spinner';
import '../../../public/font.css';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={
            <div className="flex h-[100vh] w-[100vw] items-center justify-center">
                <div >
                    <CenteredSpinner />
                </div>
            </div>}>
            <AuthGuard>
                <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
                    <LayoutProvider>
                        <div className='h-full w-full'>
                            {children}
                        </div>
                    </LayoutProvider>
                </SessionProvider>
            </AuthGuard>
        </Suspense>
    )
}

export default Layout