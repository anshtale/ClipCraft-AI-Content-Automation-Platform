import { PREVIEW_AUDIO_URL } from '@/lib/constants';
import { CAPTION_COMPONENTS } from '@/lib/custom_types/captionComponent';
import { PREVIEW_CAPTION_COMPONENTS, type PreviewCaptionStyleName } from '@/lib/custom_types/previewCaptionComponent';
import React from 'react'
import { AbsoluteFill, Audio, Img } from 'remotion';

function PreviewComposition({ caption, selectedStyle }: {
    caption: {
        name: string;
        style: string;
    }, selectedStyle: {
        name: string;
        image: string;
    }
}) {

    const durationInFrames = 200
    const captionStyle = caption.name as PreviewCaptionStyleName
    const PreviewCaptionComponent = PREVIEW_CAPTION_COMPONENTS[captionStyle] || CAPTION_COMPONENTS.default

    return (
        <div>
            <AbsoluteFill>
                <Img src={selectedStyle.image}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                <Audio src={PREVIEW_AUDIO_URL}/>
            </AbsoluteFill>
            <AbsoluteFill className='relative'>
                <PreviewCaptionComponent  />
            </AbsoluteFill>
        </div>
    )
}

export default PreviewComposition