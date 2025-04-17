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
import Spinner from "../_components/spinner"
import type { CaptionObject } from "@/lib/custom_types/caption"

function EditorPage() {
    const { videoId } = useParams();
    const [loading, setLoading] = useState(true);

    const { setVideoData, setCaptionStyle } = useVideoDataStore(useShallow((state) => ({
        setVideoData: state.setVideoData,
        setCaptionStyle: state.setCaptionStyle
    })));

    const { data: responseVideoData, status, error } = api.project.getVideoById.useQuery({ videoId: videoId as string });

    useEffect(() => {
        if (responseVideoData) {
            setVideoData(responseVideoData);
            const CaptionObject = responseVideoData.caption as CaptionObject
            setCaptionStyle(CaptionObject.name as CaptionStyleName)
            setLoading(false);
        }
    }, [responseVideoData, setVideoData, setCaptionStyle])

    if (loading && status === 'pending') {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <CenteredSpinner />
            </div>
        )
    }

    if (responseVideoData && responseVideoData.status === 'pending') {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <div>
                    <div className="flex items-center justify-center">
                        <Spinner />
                        Video is still processing...
                    </div>
                    <span className="w-full flex items-center justify-center text-muted-foreground text-sm">Please refresh page to get updated status</span>
                </div>

            </div>
        )

    }

    if (status === 'error') {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <div className="text-red-500 text-lg">
                    {error.message || "An error occurred while loading the video."}
                </div>
            </div>
        );
    }

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="border rounded-2xl p-4 border-slate-500">
                <VideoInfo />
            </div>
            <div className=" flex items-center justify-center">
                <RemotionPlayer />
            </div>
        </div>
    )
}

export default EditorPage