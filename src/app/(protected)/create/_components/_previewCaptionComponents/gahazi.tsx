import { previewCaption } from "@/lib/preview_caption";
import { useCurrentGroupIndex, useDynamicallyGroupedCaptions } from "../../../../../hooks/use-captions";
import type { Caption, RootVideoData } from "../../../../../lib/custom_types/caption";

import { useMemo } from "react";

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";


function GahaziCaption() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTime = frame / fps;

  const captions = previewCaption;
  
  const groupedCaptions = useDynamicallyGroupedCaptions({captions, words : 2});
  
  const currentGroupIndex = useCurrentGroupIndex({groupedCaptions, currentTime});
  
  if (currentGroupIndex === -1) return null;
  
  const currentGroup = groupedCaptions[currentGroupIndex];
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <div
      
        style={{
          fontFamily: "Coolvetica",
          marginBottom : '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '0 20px',
        }}
      >
        <div

          style={{
            fontFamily: "Coolvetica",
            
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px', // REDUCED from 10px to 4px for less space between wrapped words
            maxWidth: '80%',
            lineHeight:'0.9'
          }}
        >
          {currentGroup && currentGroup.map((caption, index) => {
            const word = caption.punctuated_word || caption.word;
            
            // Check if this word should be visible based on current time
            const isVisible = currentTime >= caption.start;
            
            // Only show the word if it's time to show it
            // For single-word groups, always show the word when the group is active
            const shouldShow = currentGroup.length === 1 || isVisible;
            
            return (
              <span

                key={index}
                style={{
                  fontSize: '65px',
                  fontWeight: 'bold',
                  fontFamily: "Coolvetica",
                  fontStyle: 'normal',
                  color: '#FFFFFF',
                  textShadow: '5px 5px 10px rgba(0, 0, 0)',
                  opacity: shouldShow ? 1 : 0, // Hide words until they're spoken
                  letterSpacing:'2px'
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default GahaziCaption