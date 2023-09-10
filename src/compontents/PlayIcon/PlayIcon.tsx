import { Dialog } from 'antd-mobile';
import { PlayOutline } from 'antd-mobile-icons';
import React, { useCallback, useRef } from 'react';
import ReactAudioPlayer from "react-audio-player";
import Activation from '../Activation';
import useAddWeChat from '~/hooks/useAddWeChat';
import { useSnapshot } from 'valtio';
import { user } from '~/store';

// import s from './PlayIcon.module.scss';

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ onClick, ...props }) => {
    const player = useRef<ReactAudioPlayer>(null);
    const userR = useSnapshot(user);
  const addWeChat = useAddWeChat();

    const onPlay = useCallback(
        () => {
            player.current?.audioEl.current?.play();
            player.current?.audioEl.current?.pause();
        },
        [],
    );

    const checkAuth = useCallback(() => {
        Dialog.show({
          content: <Activation
            onSucess={() => Dialog.clear()}
            onGetSN={() => {
              Dialog.clear();
              addWeChat();
            }}
            onCancel={() => Dialog.clear()}
          />,
          actions: [],
        });
      }, [addWeChat]);

    const handleClick = useCallback(
        (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            if (!userR.auth) {
                checkAuth();
                return;
            }
            onPlay();
            onClick?.(e);
        },
        [checkAuth, onClick, onPlay, userR.auth],
    )

    return (<>
        <ReactAudioPlayer ref={player} src="./warning.mp3" />
        <PlayOutline fontSize={32} onClick={handleClick} {...props} />
    </>
    )
}

export default PlayIcon;