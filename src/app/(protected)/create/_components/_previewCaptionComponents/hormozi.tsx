
import React, {  useMemo } from 'react'

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Caption, RootVideoData } from "../../../../../lib/custom_types/caption";

import {  getScaleInterpolation } from '../../../../../lib/animation-utils';
import { useCurrentGroupIndex, useGroupedCaptions } from "../../../../../hooks/use-captions";
import type { DirectVideoData } from "../../../../../lib/custom_types/caption";
import { previewCaption } from '@/lib/preview_caption';

function HormoziCaption() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTime = frame / fps;

  const captions = previewCaption;
  
  const groupedCaptions = useGroupedCaptions({captions, words : 2});
  
  const currentGroupIndex = useCurrentGroupIndex({groupedCaptions, currentTime});
  
  if (currentGroupIndex === -1) return null;
  
  const currentGroup = groupedCaptions[currentGroupIndex];
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '100px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '15px 25px',
          borderRadius: '8px',
          maxWidth: '80%',
        }}
      >
        {currentGroup && currentGroup.map((caption, index) => {
          // Check if this word is currently being spoken
          if (!caption) return null;
          const isActive = currentTime >= caption.start && currentTime <= caption.end;

          // Calculate scale based on active state
          const scale = isActive 
            ? getScaleInterpolation(caption, frame, fps)
            : 1;

          return (
            <div
              key={index}
              style={{
                margin: '0 8px',
                fontSize: isActive ? '20px' : '15px',
                fontWeight: 'normal',
                fontFamily: 'Impact, sans-serif',
                color: isActive ? '#FF9500' : '#FFFFFF',
                textTransform: 'uppercase',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                transform: `scale(${scale})`,
                transition: 'color 0.2s ease',
                
              }}
            >
              {caption.punctuated_word || caption.word}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default HormoziCaption