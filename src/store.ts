
import {create} from "zustand"
import type { CaptionStyleName } from "./lib/custom_types/captionComponent"
import type { DirectVideoData } from "./lib/custom_types/caption"

type VideoDataStore = {
    videoData : DirectVideoData | undefined,
    durationInFrames : number,
    setVideoData : (videoData : DirectVideoData) => void,
    captionStyle : CaptionStyleName,
    setCaptionStyle : (captionStyle : CaptionStyleName) =>void
}


export const useVideoDataStore  = create<VideoDataStore>((set)=>({
    videoData : undefined,
    durationInFrames : 100,
    setVideoData : (videoData : DirectVideoData) => set({videoData}),
    captionStyle : "ALI_STYLE",
    setCaptionStyle : (captionStyle : CaptionStyleName) => set({captionStyle})
}))


