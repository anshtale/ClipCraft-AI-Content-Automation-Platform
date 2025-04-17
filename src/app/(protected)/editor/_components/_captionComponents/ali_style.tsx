import { useCurrentGroupIndex, useGroupedCaptions } from "../../../../../hooks/use-captions";
import { getWordOpacity } from "../../../../../lib/animation-utils";
import type { Caption } from "../../../../../lib/custom_types/caption";

import type { DirectVideoData } from "../../../../../lib/custom_types/caption";
import { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";


export function AliStyle({videoData} : {videoData : DirectVideoData}) {
    const frame = useCurrentFrame();
      const { fps } = useVideoConfig();
    
      const currentTime = frame / fps;
    
    
      const captions = videoData ? useMemo(()=>videoData.captionJson as Caption[],[videoData]) : [];
      
      const groupedCaptions = useGroupedCaptions({captions, words : 2});
      
      const currentGroupIndex = useCurrentGroupIndex({groupedCaptions, currentTime});
      
      if (!videoData || currentGroupIndex === -1 || groupedCaptions.length === 0) return null;
      
      const currentGroup = groupedCaptions[currentGroupIndex];

      return (
        <AbsoluteFill
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingTop: '30px',
          }}
        >
          <div className="gap-2"
            style={{
                marginBottom : '150px',
                display: 'inline-flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5', // Light gray background
                padding: '8px 16px',
                borderRadius: '8px',
                maxWidth: '80%',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {currentGroup && currentGroup.map((caption, index) => {
              
              // Calculate opacity based on word status
              const opacity = getWordOpacity(caption, currentTime, frame, fps);
              
              return (
                <span className="font-extrabold"
                    key={index}
                    style={{
                        // margin: '0 2px',
                        fontSize: '35px',
                        // fontWeight: 700,
                        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                        color: '#222222', // Dark text for contrast
                        opacity: opacity,
                        transition: 'opacity 0.2s ease',
                  }}
                >
                  {caption.punctuated_word || caption.word}
                </span>
              );
            })}
          </div>
        </AbsoluteFill>
      );

}