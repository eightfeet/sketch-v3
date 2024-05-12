import { Waterfall } from 'wc-waterfall'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['wc-waterfall']: CustomElement<Waterfall>;
        }
    }
    interface Window {
        warnPlayer: HTMLAudioElement;
        cloud: any;
        wx: any;
        VConsole: any;
    }
}

