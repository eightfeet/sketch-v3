import { proxy } from "valtio";
import { ImageItem } from "./api";


interface RunningTime {
    selected?: ImageItem[];
    duration: number
}

export const runningTime = proxy<RunningTime>({
    duration: 0.1
})