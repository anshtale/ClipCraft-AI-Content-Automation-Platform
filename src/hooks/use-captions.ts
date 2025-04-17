import { dynamicGroupCaptions, getCurrentGroupIndex, getIshanSharmaGroupCaptions, groupCaptions } from "../lib/animation-utils";
import type { Caption } from "../lib/custom_types/caption";
import { useMemo } from "react";

export const useCurrentGroupIndex = ({groupedCaptions,currentTime} : {groupedCaptions : Caption[][],currentTime:number})=>{
    return useMemo(() => {
        return getCurrentGroupIndex({groupedCaptions, currentTime});
    }, [groupedCaptions, currentTime]);
}

export const useGroupedCaptions =  ({captions,words} : {captions : Caption[],words : number})=>{
    return useMemo(() => {
        return groupCaptions({captions, words});
    }, [captions, words]);
}

export const useDynamicallyGroupedCaptions = ({captions,words} : {captions : Caption[],words : number})=>{
    return useMemo(() => {
        return dynamicGroupCaptions({captions});
    }, [captions, words]);
}


export const useIshanSharmaCaptions  = ({captions} : {captions : Caption[],})=>{
    return useMemo(() => {
        return getIshanSharmaGroupCaptions({captions});
    }, [captions]);
}