"use client"
import CenteredSpinner from "@/app/_components/spinner";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

function VideoList() {
    const {status, data : videoData} = api.project.getUserVideos.useQuery(undefined,{
        refetchOnWindowFocus: false,
        refetchOnMount: false
    }) 
    
    if(!videoData) return(
        <div className="flex h-full w-full items-center justify-center">
            <CenteredSpinner/>
        </div>
    ) 

    return (
        <div>
            {videoData.length == 0 ?
                <div className="flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed rounded-xl py-16">
                    <Image src={'/logo.svg'} alt="logo" width={60} height={60}/>
                    <h2 className="text-gray-400 text-lg">
                        You don't have any videos. Create new video
                    </h2>
                    <Link href={'/create'}>
                        <Button >+ Create New Video</Button>
                    </Link>
                </div>
            : <></>}
        </div>
    )
}

export default VideoList