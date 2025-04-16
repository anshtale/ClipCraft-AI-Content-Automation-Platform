'use client'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect } from 'react'

const AppHeader = ()=>{
    const session =  useSession();

    useEffect(()=>{
        if (session && session.data?.user) {
            checkAuthenticated();
        }
    },[session])

    const checkAuthenticated = ()=>{
        if(!session.data?.user){
            return;
        }
    }

    if (!session.data?.user) {
        return null;
    }
    
    return (
        <div className='p-3 flex justify-between items-center'>
            <SidebarTrigger/>
                <Image src={session.data?.user.image!} alt='profile' width={40} height={40} className='rounded-full'>
                    
                </Image>
        </div>
    )
}

export default AppHeader