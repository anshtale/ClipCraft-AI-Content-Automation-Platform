"use client"
import CenteredSpinner from "@/app/_components/spinner";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

function VideoList() {
    const [pendingVideoIds, setPendingVideoIds] = useState<string[]>([]);
    
    const { status, data: videoData,refetch:getVideoList } = api.project.getUserVideos.useQuery(undefined, {
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })

    const { 
        data: pendingVideosStatus 
    } = api.project.getVideosById.useQuery(
        { ids: pendingVideoIds },
        {
            enabled: pendingVideoIds.length > 0,
            refetchInterval: pendingVideoIds.length > 0 ? 5000 : false,
            refetchIntervalInBackground: true,
        }
    );


    useEffect(() => {
        if(videoData) {
            const pendingIds = videoData
                .filter(video => video.status === "pending")
                .map(video => video.id);
                
            setPendingVideoIds(pendingIds);
        }
    }, [videoData]);

    useEffect(() => {
        if (pendingVideosStatus && videoData) {
            const hasStatusChanged = pendingVideosStatus.some(
                updatedVideo => updatedVideo.status !== "pending"
            );
            
            if (hasStatusChanged) {
                getVideoList();
            }
            
        }
    }, [pendingVideosStatus, videoData, getVideoList]);

    console.log(pendingVideoIds)


    if (!videoData) return (
        <div className="flex h-full w-full items-center justify-center">
            <CenteredSpinner />
        </div>
    )

    return (
        <div>
            {videoData.length == 0 ?
                <div className="flex flex-col items-center justify-center mt-28 gap-5 p-5 border border-dashed rounded-xl py-16">
                    <Image src={'/logo.svg'} alt="logo" width={60} height={60} />
                    <h2 className="text-gray-400 text-lg">
                        You don't have any videos. Create new video
                    </h2>
                    <Link href={'/create'}>
                        <Button >+ Create New Video</Button>
                    </Link>
                </div>
                : <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10">
                    {videoData.map((project, index) => {
                        return (
                            <div className= "relative" key={index}>
                                {
                                    project.status === "completed" && Array.isArray(project.images) && project.images.length 
                                    ? 
                                    <Image src={String(project.images[0])} alt={project.title} width={500} height={500}
                                    className="w-full aspect-[2/3] object-cover rounded-xl"/> 
                                    :
                                    <div className="flex items-center justify-center aspect-[2/3] p-5 w-full rounded-xl bg-slate-900">
                                        <RefreshCcw className="animate-spin gap-3"/>
                                        <h2>Generating...</h2>

                                    </div>
                                }
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
                                
                                <div className="absolute bottom-2 px-5 w-full">
                                    <h2>{project.title}</h2>
                                    <h3 className="text-[12px] text-gray-300">{project.createdAt.toDateString()}</h3>
                                </div>
                            </div>
                        )
                    })}

                </div>}
        </div>
    )
}

export default VideoList