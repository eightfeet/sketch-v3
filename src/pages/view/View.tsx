import { ImageViewer, NavBar, Space } from "antd-mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { useSnapshot } from 'valtio'
import { runningTime, painter } from "~/store";
import Timer from "./components/Timer";
import ReactAudioPlayer from "react-audio-player";
import classNames from 'classnames'
import s from './View.module.scss'
import { SlidesRef } from "antd-mobile/es/components/image-viewer/slides";
import { EditSOutline } from "antd-mobile-icons";
import SelectedList from "~/compontents/SelectedList";
import SetDuration from "~/compontents/SetDuration";
import { useNavigate } from "react-router-dom";
import Painter from "~/compontents/Painter";

interface Props {
  name?: string;
}

const View: React.FC<Props> = ({ name = "view" }) => {
  useDocumentTitle(name);
  const player = useRef<ReactAudioPlayer>(null);
  const imageViewRef = useRef<SlidesRef>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const { selected = [] } = useSnapshot(runningTime);

  const painterR = useSnapshot(painter);

  const navigator = useNavigate();

  useEffect(() => {
    if (!selected.length) {
      navigator("/list")
    }
  }, [navigator, selected])


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
    {!painterR.showPanter ? <NavBar className={s.nav} onBack={() => navigator(-1)} left={
      <Space>
        <EditSOutline onClick={() => painter.showPanter = true} fontSize={24} />
      </Space>
    } >
      <span onClick={() => setPopupVisible(true)}>{imgIndex + 1}/{selected.length}</span>
    </NavBar> : null}
    <ImageViewer.Multi
      maxZoom={10}
      images={
        selected?.map(Item => Item.url)
      }
      visible
      defaultIndex={imgIndex}
      onIndexChange={handleIndexChange}
      ref={imageViewRef}
    />
    <SetDuration>
      <div className={classNames(s.timer, { [s.timewran]: wranTime })} style={{ opacity: !painterR.showPanter ? 1 : 0}}>
        <Timer
          key={imgIndex}
          onComplete={handleComplete}
          onUpdate={onUpdate}
          isPlaying={!painterR.showPanter}
          wranTime={true}
        />
        <ReactAudioPlayer ref={player} src="./warning.mp3" />
      </div>
    </SetDuration>
    <SelectedList
      visible={popupVisible}
      onMaskClick={() => setPopupVisible(false)}
    />
    <Painter
      visible={painterR.showPanter}
      onClose={() => painter.showPanter = false}
      onChange={() => "onChangePainter"}
      lineColor={painterR.lineColor}
      lineWidth={painterR.lineWidth || 1}
      bgColor={painter.panterBgColor}
      bgAlph={painter.bgAlph}
      eraserAlph={painter.eraserAlph}
      eraserWidth={painter.eraserWidth}
      lineAlph={painter.lineAlph}
      historyRecords={1000}
      auth={true}
    />
  </div>;
};

export default View;
