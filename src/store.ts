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