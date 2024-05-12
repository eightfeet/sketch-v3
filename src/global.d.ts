import { Waterfall } from 'wc-waterfall';
import { Howl } from "howler";


declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['wc-waterfall']: CustomElement<Waterfall>;
        }
    }
    interface Window {
        warnPlayer: Howl;
        cloud: any;
        wx: any;
        VConsole: any;
    }
}

