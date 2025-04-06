export const options = [
    {
        name: 'Realistic',
        image: '/realistic.png'
    },
    {
        name: 'Cinematic',
        image: '/cinematic.png'
    },
    {
        name: 'Cartoon',
        image: '/cartoon.png'
    },
    {
        name: 'Cyberpunk',
        image: '/cyberpunk.png'
    },
    {
        name: 'Anim',
        image: '/anim.png'
    }
]

import type { CreateVideoForm } from '@/lib/custom_types/createForm';
import Image from 'next/image'
import React from 'react'
import { useFormContext } from 'react-hook-form';

function VideoStyle() {
    const { control, setValue, watch, trigger } = useFormContext<CreateVideoForm>();
    return (
        <div className='mt-5'>
            <h2>
                Video Styles
            </h2>
            <p className='text-sm text-gray-600 mb-1'>
                Select video style
            </p>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2'>
                {options.map((option,index)=>{
                    return (
                        <div className = "relative" key={index}>
                            <Image src={option.image} alt={option.name} width={500} height={120} className={`object-cover h-[90px]
                            lg:h-[130px] xl:h-[180px] rounded-lg p-1 hover:border border-gray-300 cursor-pointer
                            ${watch('videoStyle') === option.name && 'border'}`}
                            onClick={()=>(setValue('videoStyle',option.name,{
                                shouldDirty: true,
                                shouldValidate: true
                            }))}
                            />
                            <h2 className='absolute bottom-1 text-center w-full'>
                                {option.name}
                            </h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default VideoStyle