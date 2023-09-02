import { proxy } from "valtio";
import { ImageItem } from "./api";


interface RunningTime {
    selected?: ImageItem[];
    duration: number;
    formatTime?: string;
}

export const runningTime = proxy<RunningTime>({
    duration: 300
})


interface PainterData {
    showPanter: boolean;
    lineColor?: string;
    lineWidth?: number;
    panterBgColor?: string;
    bgAlph?: number;
    eraserAlph?: number;
    eraserWidth?: number;
    lineAlph?: number;
}

export const painter = proxy<PainterData>({
    showPanter: false,
})