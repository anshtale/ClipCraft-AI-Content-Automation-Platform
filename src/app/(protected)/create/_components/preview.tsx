
import React from 'react'
import { options } from './videoStyle';
import Image from 'next/image';
import type { UseFormReturn } from 'react-hook-form';
import { Player } from 'node_modules/@remotion/player/dist/cjs/Player';
import PreviewComposition from './previewComposition';

function Preview({methods} : {
    methods:UseFormReturn<{
        title: string;
        topic: string;
        videoStyle: string;
        voiceStyle: string;
        captionStyle: {
            name: string;
            style: string;
        };
        script: string;
    }, any, {
        title: string;
        topic: string;
        videoStyle: string;
        voiceStyle: string;
        captionStyle: {
            name: string;
            style: string;
        };
        script: string;
    }>
}) {
    
    const selectedStyle = options.find((option)=>option.name === methods.getValues().videoStyle)!

    const caption = methods.getValues().captionStyle

    if(!selectedStyle || !caption) return;
    return (
        <div>
            <Player component={PreviewComposition} durationInFrames={200} compositionWidth={720} compositionHeight={1280} fps={30} controls style={{
                width: '25vw',
                height: '70vh'
            }} inputProps={{caption,selectedStyle}} />
        </div>
    )
}

export default Preview