import { interpolate } from "remotion";
import type { Caption } from "./custom_types/caption";
import { useVideoDataStore } from "@/store";
import { useShallow } from "zustand/shallow";

export const getScaleInterpolation = (caption: Caption, frame: number, fps: number) => {
    const durationInFrames = (caption.end - caption.start) * fps;
    
    // For very short words (less than 10 frames)
    if (durationInFrames < 10) {
      // Use a simpler animation that scales up and immediately down
      const midpoint = (caption.start + caption.end) / 2;
      return interpolate(
        frame,
        [fps * caption.start, fps * midpoint, fps * caption.end],
        [1, 1.4, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
    
    // For normal duration words, use the full animation
    // Calculate transition time as 20% of the word duration, with a minimum of 2 frames
    const transitionFrames = Math.max(2, durationInFrames * 0.2);
    
    return interpolate(
      frame,
      [
        fps * caption.start, 
        fps * caption.start + transitionFrames, 
        fps * caption.end - transitionFrames, 
        fps * caption.end
      ],
      [1, 1.4, 1.4, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
};

export const getWordOpacity = (caption: Caption, currentTime: number, frame: number, fps: number) => {
  // If the word hasn't been reached yet
  if (currentTime < caption.start) {
    return 0.4; // Dim opacity for words not yet spoken
  }
  
  // If the word is currently being spoken
  if (currentTime >= caption.start && currentTime <= caption.end) {
    // Interpolate opacity from 0.4 to 1 during the first 20% of the word's duration
    const fadeInDuration = (caption.end - caption.start) * 0.2;
    const fadeInEndTime = caption.start + fadeInDuration;
    
    if (currentTime <= fadeInEndTime) {
      return interpolate(
        currentTime,
        [caption.start, fadeInEndTime],
        [0.4, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
    }
    
    return 1; // Full opacity while word is being spoken
  }
  
  // If the word has been spoken
  return 1; // Keep full opacity for words that have been spoken
};

export const groupCaptions = ({captions,words} : {captions : Caption[],words : number})=>{
    console.log("called")

    const result:Caption[][] = [];

    if(!captions || captions.length == 0) return result;

    for (let i = 0; i < captions.length; i += words) {
        result.push(captions.slice(i, Math.min(i + words, captions.length)));
    }

    return result;
}

export const getCurrentGroupIndex = ({groupedCaptions,currentTime} : {groupedCaptions : Caption[][],currentTime : number})=>{
    if (groupedCaptions.length === 0) return -1;

    return groupedCaptions.findIndex((group) => {
      if (!group || group.length === 0) return false;
      const groupStartTime = group[0]?.start ?? 0;
      const groupEndTime = group[group.length - 1]?.end ?? 0;
      return currentTime >= groupStartTime && currentTime <= groupEndTime;
    });
}

export const dynamicGroupCaptions = ({ captions }: { captions: Caption[] }) => {
  const result: Caption[][] = [];
  if (!captions || captions.length === 0) return result;
  
    
  let currentIndex = 0;
  
  // Process all captions using the repeating pattern
  while (currentIndex < captions.length) {
    // Pattern section 1: 2-3 lines with 2 words per line
    for (let i = 0; i < 2 && currentIndex < captions.length; i++) {
      // Take 2 words if available, otherwise take what's left
      const wordsAvailable = Math.min(2, captions.length - currentIndex);
      const lineWords = captions.slice(currentIndex, currentIndex + wordsAvailable);
      result.push(lineWords);
      currentIndex += wordsAvailable;
      
      if (currentIndex >= captions.length) break;
    }
    
    // Pattern section 2: 2-3 lines with 1 word per line
    for (let i = 0; i < 3 && currentIndex < captions.length; i++) {
      // Each line gets 1 word
      const lineWords = [captions[currentIndex]!];
      
      result.push(lineWords);
      
      currentIndex += 1;
      
      if (currentIndex >= captions.length) break;
    }
    
    // Pattern section 3: 1 line with 4-5 words
    if (currentIndex < captions.length) {
      const wordsRemaining = captions.length - currentIndex;
      const wordsToTake = Math.min(wordsRemaining, 5); // Take up to 5 words
      
      const lineWords = captions.slice(currentIndex, currentIndex + wordsToTake);
      result.push(lineWords);
      currentIndex += wordsToTake;
    }
  }
  
  return result;
};

export const getIshanSharmaGroupCaptions = ({captions} : {captions : Caption[]})=>{
    const result: Caption[][] = [];
    if (!captions || captions.length === 0) return result;

    let currentIndex = 0;
    let patternPosition = 0;
    while (currentIndex < captions.length) {
      // Determine what part of the pattern we're in
      if (patternPosition < 3) {
        // Pattern 1: Single word lines (first 3 lines)
        if (currentIndex < captions.length) {
          const caption = [captions[currentIndex]];

          if(caption != undefined){
            result.push([captions[currentIndex]!])
          }

          currentIndex++;
        }
      } else if (patternPosition < 6) {
        // Pattern 2: Two word lines (next 3 lines)
        if (currentIndex < captions.length - 1) {
          result.push(captions.slice(currentIndex, currentIndex + 2));
          currentIndex += 2;
        } else if (currentIndex < captions.length) {
          // Handle case where we only have one word left
          const caption = [captions[currentIndex]];
          
          if(caption != undefined){
            result.push([captions[currentIndex]!])
          }

          currentIndex++;
        }
      } else if (patternPosition === 6) {
        // Pattern 3: Special 3-word group
        if (currentIndex < captions.length - 2) {
          // We have all 3 words available
          result.push(captions.slice(currentIndex, currentIndex + 3));
          currentIndex += 3;
        } else {
          // Not enough words for the special format, just add what's left
          result.push(captions.slice(currentIndex));
          currentIndex = captions.length;
        }
      }
      
      // Move to next position in pattern
      patternPosition = (patternPosition + 1) % 7; // Reset after 7 positions (3+3+1)
    }
    
    return result;
}

export const getWordStyle = (word: string, idx: number, group: Caption[], groupIdx: number) => {
  // Large yellow for last or first word in some lines, else white
  const isBig = group.length > 1 && (idx === 0 || idx === group.length - 1);
  const isYellow = isBig && (group.length > 2 || idx === group.length - 1);
  return {
    fontSize: isBig ? 54 : 36,
    fontWeight: isBig ? 900 : 700,
    color: isYellow ? '#FFC300' : '#fff',
    marginRight: idx < group.length - 1 ? 8 : 0,
    marginLeft: idx > 0 ? 2 : 0,
    lineHeight: 1,
    letterSpacing: isBig ? 1.5 : 0.5,
    textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
    fontFamily: 'Inter, Arial, sans-serif',
    textTransform: "lowercase" as const,
    display: 'inline-block',
    verticalAlign: 'middle',
    // For the "thought" style, make the leftmost word even bigger
    ...(group.length >= 3 && idx === 0
      ? { fontSize: 60, color: '#FFC300', fontWeight: 900 }
      : {}),
  };
};