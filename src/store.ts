import type { VideoData } from "@prisma/client"
import {create} from "zustand"
import type { CaptionStyleName } from "./lib/custom_types/captionComponent"

type VideoDataStore = {
    videoData : VideoData | undefined,
    durationInFrames : number,
    setVideoData : (videoData : VideoData) => void,
    setDurationInFrames : (durationInFrames : number) => void,
    captionStyle : CaptionStyleName,
    setCaptionStyle : (captionStyle : CaptionStyleName) =>void
}


export const useVideoDataStore  = create<VideoDataStore>((set)=>({
    videoData : undefined,
    durationInFrames : 100,
    setVideoData : (videoData : VideoData) => set({videoData}),
    setDurationInFrames : (durationInFrames : number) => set({durationInFrames}),
    captionStyle : "ALI_STYLE",
    setCaptionStyle : (captionStyle : CaptionStyleName) => set({captionStyle})
}))


