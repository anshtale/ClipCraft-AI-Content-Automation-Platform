
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

