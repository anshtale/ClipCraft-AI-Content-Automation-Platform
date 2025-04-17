
import type { JsonValue } from "@prisma/client/runtime/library";
import type { CaptionStyleName } from "./captionComponent";
import type { VideoData } from "@prisma/client";
import { z } from "zod";

type SubtitleWord = {
    type: string;
    asset: string;
    endTime: number;
    startTime: number;
}

type GroupedCaption = {
    lineIndex: number;
    words: SubtitleWord[];
    startTime: number;
    endTime: number;
}


export type Caption = {
    confidence: number,
    end: number,
    punctuated_word: string,
    start: number,
    word: string
}

export type CaptionObject = {
    name:CaptionStyleName,
    style : string
}

export type DirectVideoData = VideoData;

export const RootVideoDataSchema = {
    captionJson : z.any(),
    images : z.any(),
    audioUrl : z.string()
}

export type RootVideoData = {
    captionJson: JsonValue,
    images : JsonValue,
    audioUrl : string,
}
