"use client"
import type { JsonArray } from 'inngest/helpers/jsonify';
import React, {  useMemo  } from 'react'
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { CAPTION_COMPONENTS, type CaptionStyleName } from '../../../../lib/custom_types/captionComponent';
import type { Caption, DirectVideoData } from '@/lib/custom_types/caption';

function RemotionComposition({videoData,captionStyle} : {videoData:DirectVideoData,captionStyle : CaptionStyleName}) {
    const { fps } = useVideoConfig()
    const frame = useCurrentFrame();

    const durationInFrames = useMemo(()=>{
        const captions = videoData ? videoData.captionJson as Caption[] : [];
        if(videoData && captions.length > 0){
            return Number((captions[captions.length - 1]?.end! * fps).toFixed(0));
        }else return 0;
    },[videoData])

    const CaptionComponent = CAPTION_COMPONENTS[captionStyle] || CAPTION_COMPONENTS.default
    
    const imageList = useMemo(()=>videoData?.images as JsonArray,[videoData]);
    
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
                <CaptionComponent videoData = {videoData} />
            </AbsoluteFill>
        </div>
    )
}

export default RemotionComposition