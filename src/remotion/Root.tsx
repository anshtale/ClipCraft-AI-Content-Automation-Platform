import React from 'react';
import { Composition, getInputProps } from 'remotion';
import type { Caption } from '@/lib/custom_types/caption';
import type { CaptionStyleName } from '@/lib/custom_types/captionComponent';
import RemotionComposition from '../app/(protected)/editor/_components/remotionComposition';
import "./remotion-fonts"

export const RemotionRoot: React.FC = () => {
  const { videoData, captionStyle }: {
    videoData: {
      audioUrl: string;
      images?: any;
      captionJson?: any;
    }, captionStyle: CaptionStyleName
  } = getInputProps();

  console.log("from root", videoData);

  return (
    <Composition
      id="renderer"
      component={RemotionComposition}
      durationInFrames={100}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{
        videoData: {
          audioUrl: "",
          images: [],
          captionJson: [],
        },
        captionStyle: "default",
      }}
      calculateMetadata={async ({ props }) => {
        const captions = videoData ? videoData.captionJson as Caption[] : [];
        if (videoData && captions.length > 0) {
          const totalDuration = captions[captions.length - 1]?.end! * 30;
          return {durationInFrames : Number(totalDuration.toFixed(0)) + 100}
        }else{
          return {durationInFrames : 100}
        }
      }}
    />

  );
};