"use client"
import { Player, type PlayerRef } from "@remotion/player"
import RemotionComposition from "./remotionComposition"
import { useVideoDataStore } from "@/store"
import { useRef } from "react"
import { useShallow } from 'zustand/shallow'


function RemotionPlayer() {
    const durationInFrames = useVideoDataStore(useShallow((state) => state.durationInFrames))
    const playerRef = useRef<PlayerRef>(null);
    return (
        <div>
            <Player ref = {playerRef} component={RemotionComposition} durationInFrames={Number(durationInFrames.toFixed(0)) + 100} inputProps = {{playerRef}} compositionWidth={720} compositionHeight={1280} fps={30} controls style={{
                width: '25vw',
                height: '70vh'
            }} />
        </div>
    )
}

export default RemotionPlayer