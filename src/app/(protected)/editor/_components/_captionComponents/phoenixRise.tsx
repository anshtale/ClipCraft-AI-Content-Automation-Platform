import { useCurrentGroupIndex, useIshanSharmaCaptions } from "../../../../../hooks/use-captions";

import type { Caption, RootVideoData } from "../../../../../lib/custom_types/caption";

import React, { useMemo } from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';


function PhoenixRise({videoData} : {videoData:{
  audioUrl: string | undefined | null ;
  images?: any;
  captionJson?: any;
} }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTime = frame / fps;

  const captions = videoData ? useMemo(() => videoData.captionJson as Caption[], [videoData]) : [];

  const groupedCaptions = useIshanSharmaCaptions({ captions });

  const currentGroupIndex = useCurrentGroupIndex({ groupedCaptions, currentTime });

  if (!videoData || currentGroupIndex === -1) return null;

  const currentGroup = groupedCaptions[currentGroupIndex];
  if (!currentGroup) return <></>;

  const isThreeWordGroup = currentGroup!.length === 3;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          marginBottom: '250px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '0 20px',
        }}
      >
        {isThreeWordGroup ? (
          // Special handling for 3-word groups with overlapping effect
          <div
            style={{
              position: 'relative',
              height: '120px', // Ensure enough space for the overlapping text
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* First TWO words on top */}
            <div style={{
              position: 'absolute',
              zIndex: 1, // Higher z-index to appear on top
              textAlign: 'center',
            }}>
              {currentGroup.slice(0, 2).map((caption, index) => {
                const word = caption.punctuated_word || caption.word;
                const isVisible = currentTime >= caption.start;

                return (
                  <span
                    key={index}
                    style={{
                      fontSize: '70px',
                      fontFamily: "EuropaGroteskSH",
                      color: '#FFFFFF',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                      transition: 'opacity 0.1s ease, transform 0.15s ease',
                      textTransform: 'lowercase',
                      textShadow: '14px 0px 14px rgba(0, 0, 0)',
                      marginRight: index < currentGroup.slice(0, 2).length - 1 ? '10px' : '0',
                      display: 'inline-block',
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            {/* Last word on bottom */}
            <div style={{
              position: 'absolute',
              top: '45px',
              bottom: '11px',
              zIndex: 3,
              textAlign: 'center',
            }}>
              <span
                style={{
                  fontFamily: "KeplerStd-BoldScnItDisp",
                  fontSize: '85px',
                  color: '#FFD700', // Yellow/gold color for the last word
                  opacity: currentTime >= currentGroup[2]!.start ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  textTransform: 'lowercase',
                  textShadow: '14px 0px 14px rgba(0, 0, 0)',
                }}
              >
                {currentGroup[2]!.punctuated_word || currentGroup[2]!.word}
              </span>
            </div>
          </div>
        ) : (
          // Regular handling for other groups
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              maxWidth: '80%',
            }}
          >
            {currentGroup.map((caption, index) => {
              const word = caption.punctuated_word || caption.word;
              const isVisible = currentTime >= caption.start;

              return (
                <span
                  key={index}
                  style={{
                    // letterSpacing: '2px',
                    fontFamily: "EuropaGroteskSH",
                    fontSize: '70px',
                    // fontWeight: 700,
                    color: '#FFFFFF',
                    opacity: isVisible ? 1 : 0,
                    // transition: 'opacity 0.2s ease',
                    textTransform: 'lowercase',
                    textShadow: '14px 0px 14px rgba(0, 0, 0)',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </AbsoluteFill>
  )
}

export default PhoenixRise