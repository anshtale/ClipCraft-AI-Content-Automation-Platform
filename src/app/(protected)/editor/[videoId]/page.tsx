"use client"
import { useParams } from "next/navigation"
import RemotionPlayer from "../_components/remotionPlayer"
import VideoInfo from "../_components/videoInfo"
import { api } from "@/trpc/react"
import CenteredSpinner from "@/app/_components/spinner"
import { useEffect, useState } from "react"
import { useVideoDataStore } from "@/store"
import type { CaptionStyleName } from "../../../../lib/custom_types/captionComponent"
import { useShallow } from "zustand/shallow"

function EditorPage() {
    const { videoId } = useParams();
    const [loading,setLoading] = useState(true);

    const {setVideoData,setCaptionStyle} = useVideoDataStore(useShallow((state) => ({
        setVideoData : state.setVideoData,
        setCaptionStyle: state.setCaptionStyle
    })));

    const {data : responseVideoData} = api.project.getVideoById.useQuery({videoId : videoId as string});

    useEffect(()=>{
        if(responseVideoData){
            setVideoData(responseVideoData);
            setCaptionStyle(responseVideoData.videoStyle as CaptionStyleName)
            setLoading(false);
        }
    },[responseVideoData,setVideoData,setCaptionStyle])

    if(loading) return (
        <div className="flex h-full w-full items-center justify-center">
            <CenteredSpinner />
        </div>
    )

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="border rounded-2xl p-4 border-slate-500">
                <VideoInfo/>
            </div>
            <div className=" flex items-center justify-center">
                <RemotionPlayer/>
            </div>
        </div>
    )
}

export default EditorPage