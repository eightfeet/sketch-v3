import { PlayOutline } from 'antd-mobile-icons';
import React, { useCallback, useRef } from 'react';
import ReactAudioPlayer from "react-audio-player";

// import s from './PlayIcon.module.scss';

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ onClick, ...props }) => {
    const player = useRef<ReactAudioPlayer>(null);
    const onPlay = useCallback(
        () => {
            player.current?.audioEl.current?.play();
        },
        [],
    );

    const handleClick = useCallback(
        (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            onPlay();
            onClick?.(e);
        },
        [onClick, onPlay],
    )

    return (<>
        <ReactAudioPlayer ref={player} src="./warning.mp3" />
        <PlayOutline fontSize={32} onClick={handleClick} {...props} />
    </>
    )
}

export default PlayIcon;