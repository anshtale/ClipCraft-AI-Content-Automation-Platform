"use client"
import type { JsonArray } from 'inngest/helpers/jsonify';
import React, { useCallback, useEffect, useMemo  } from 'react'
import type {PlayerRef} from '@remotion/player';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { useVideoDataStore } from '@/store';
import { CAPTION_COMPONENTS, type CaptionStyleName } from '../../../../lib/custom_types/captionComponent';
import type { Caption } from '@/lib/custom_types/caption';
import { useShallow } from 'zustand/shallow';

function RemotionComposition({playerRef} : {playerRef : React.RefObject<PlayerRef | null>}) {
    const { fps } = useVideoConfig()
    const frame = useCurrentFrame();

    const {videoData,durationInFrames,setDurationInFrames} = useVideoDataStore(useShallow(
        (state) => ({
          videoData: state.videoData,
          durationInFrames: state.durationInFrames,
          setDurationInFrames: state.setDurationInFrames,
        }))
    );
    
    const captionStyle : CaptionStyleName = useVideoDataStore(useShallow(((state) => state.captionStyle)));
    
    const CaptionComponent = CAPTION_COMPONENTS[captionStyle] || CAPTION_COMPONENTS.default
    
    const imageList = useMemo(()=>videoData?.images as JsonArray,[videoData]);
    
    useEffect(() => {
        const captions = videoData ? videoData.captionJson as Caption[] : [];
        if(videoData && captions.length > 0){
            const totalDuration = captions[captions.length - 1]?.end! * fps;
            setDurationInFrames(totalDuration);
        }
    }, [videoData,setDurationInFrames,fps])
    
    if(!videoData) return null;

    return (
        <div>
            <AbsoluteFill>
                {(imageList as any)?.map((item:any,index:number)=>{
                    const startTime = (index * durationInFrames /imageList.length)

                    const duration = durationInFrames
                    const scale = (index : number)=>interpolate(
                        frame,
                        [startTime,startTime + duration/2,startTime + duration],
                        index%2==0 ? [1,1.8,1] : [1.8,1,1.8],
                        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
                    )

                    return (
                        <div key = {index}>
                            <Sequence from = {startTime} durationInFrames={duration}>
                                <AbsoluteFill>
                                    <Img src={item}
                                    style={{
                                        width:"100%",
                                        height:"100%",
                                        objectFit:"cover",
                                        transform: `scale(${scale(index)})`
                                    }}
                                    />
                                </AbsoluteFill>
                            </Sequence>    
                        </div>
                    )
                })}
                {videoData.audioUrl && <Audio src={videoData.audioUrl}/>}
            </AbsoluteFill>
            <AbsoluteFill className='relative'>
                <CaptionComponent playerRef={playerRef} />
            </AbsoluteFill>
        </div>
    )
}

export default RemotionComposition