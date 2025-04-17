"use client"
import { Player } from "@remotion/player"
import RemotionComposition from "./remotionComposition"
import { useVideoDataStore } from "@/store"
import { useMemo } from "react"
import { useShallow } from 'zustand/shallow'
import type { Caption } from "@/lib/custom_types/caption"
import type { CaptionStyleName } from "@/lib/custom_types/captionComponent"


function RemotionPlayer() {
    const fps = 30;
    const { videoData } = useVideoDataStore(useShallow(
        (state) => ({
            videoData: state.videoData, 
        }))
    );

    const durationInFrames = useMemo(() => {
        const captions = videoData ? videoData.captionJson as Caption[] : [];
        if (videoData && captions.length > 0) {
            const totalDuration = captions[captions.length - 1]?.end! * fps;
            return totalDuration;
        } else {
            return 0;
        }
    }, [videoData])

    const captionStyle : CaptionStyleName = useVideoDataStore(useShallow(((state) => state.captionStyle)));

    if (!videoData) return <div>Loading...</div>;

    return (
        <div>
            <Player component={RemotionComposition} durationInFrames={Number(durationInFrames.toFixed(0)) + 100} inputProps={{ videoData, captionStyle}} compositionWidth={720} compositionHeight={1280} fps={30} controls style={{
                width: '25vw',
                height: '70vh'
            }} />
        </div>
    )
}

export default RemotionPlayer