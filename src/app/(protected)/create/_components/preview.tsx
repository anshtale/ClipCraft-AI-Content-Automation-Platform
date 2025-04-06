import type { CreateVideoForm } from '@/lib/custom_types/createForm'
import React from 'react'
import { options } from './videoStyle';
import Image from 'next/image';
import type { UseFormReturn } from 'react-hook-form';

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
    
    const selectedStyle = options.find((option)=>option.name === methods.getValues().videoStyle)

    const caption = methods.getValues().captionStyle

    if(!selectedStyle || !caption) return;
    return (
        <div className='relative'>
            <Image src={selectedStyle.image} alt={selectedStyle.name}
            width={1000}
            height={300}
            className='w-full h-[70vh] object-cover rounded-xl'/>
            <h2 className={`${caption.style} absolute text-center bottom-7 w-full`}>{caption.name}</h2>
        </div>
    )
}

export default Preview