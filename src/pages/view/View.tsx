import { ImageViewer, NavBar, Space } from "antd-mobile";
import React, { useCallback, useRef, useState } from "react";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { useSnapshot } from 'valtio'
import { runningTime } from "~/store";
import Timer from "./components/Timer";
import ReactAudioPlayer from "react-audio-player";
import classNames from 'classnames'
import s from './View.module.scss'
import { SlidesRef } from "antd-mobile/es/components/image-viewer/slides";
import { EditFill, LeftOutline } from "antd-mobile-icons";

interface Props {
  name?: string;
}

const View: React.FC<Props> = ({ name = "view" }) => {
  useDocumentTitle(name);
  const player = useRef<ReactAudioPlayer>(null);
  const imageViewRef = useRef<SlidesRef>(null);

  const { selected = [] } = useSnapshot(runningTime);
  const [wranTime, setWranTime] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const handleIndexChange = useCallback(
    (index: number) => setImgIndex(index),
    [],
  )

  const handleComplete = useCallback(() => {
    const next = imgIndex < selected.length - 1 ? imgIndex + 1 : 0;
    imageViewRef.current?.swipeTo(next)
    setWranTime(false);
    setImgIndex(next)
  }, [imgIndex, selected.length]);

  const onUpdate = useCallback(
    (remainingTime: number) => {
      if (remainingTime === 4) {
        player.current?.audioEl.current?.play();
        setWranTime(true);
      }
      if (remainingTime < 4) {
        !wranTime && setWranTime(false);
      }
      if (remainingTime > 4) {
        wranTime && setWranTime(true);
      }
    },
    [wranTime]
  );

  return <div className={s.root}>
    <NavBar className={s.nav} backArrow={false} left={
      <Space>
        <LeftOutline />
        <EditFill />
      </Space>
    } >{imgIndex + 1}/{selected.length}</NavBar>
    <ImageViewer.Multi
      maxZoom={10}
      images={
        selected?.map(Item => Item.src)
      }
      visible
      defaultIndex={imgIndex}
      onIndexChange={handleIndexChange}
      ref={imageViewRef}
    />
    <div className={classNames(s.timer, { [s.timewran]: wranTime })}>
      <Timer
        key={imgIndex}
        onComplete={handleComplete}
        onUpdate={onUpdate}
        isPlaying={true}
        wranTime={true}
      />
      <ReactAudioPlayer ref={player} src="./warning.mp3" />
    </div>
  </div>;
};

export default View;
