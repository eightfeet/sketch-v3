import { ImageViewer, NavBar, Space } from "antd-mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { useSnapshot } from 'valtio'
import { runningTime, painter, user } from "~/store";
import Timer from "./components/Timer";
import classNames from 'classnames'
import s from './View.module.scss'
import { SlidesRef } from "antd-mobile/es/components/image-viewer/slides";
import { AppstoreOutline, EditSOutline } from "antd-mobile-icons";
import SelectedList from "~/compontents/SelectedList";
import SetDuration from "~/compontents/SetDuration";
import { useNavigate } from "react-router-dom";
import Painter from "~/compontents/Painter";
import { onChangeParams } from "~/compontents/Painter/Painter";
import { LogoBlack } from "~/compontents/LogoBlack";
import { IconBlack } from "~/compontents/IconBlack";
import DrawingBoard from "~/compontents/DrawingBoard";

interface Props {
  name?: string;
}

const View: React.FC<Props> = ({ name = "view" }) => {
  useDocumentTitle(name);
  const imageViewRef = useRef<SlidesRef>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const { selected = [], warnStart, isWarn } = useSnapshot(runningTime);

  const painterR = useSnapshot(painter);
  const userR = useSnapshot(user);

  const navigator = useNavigate();

  useEffect(() => {
    if (!selected.length) {
      navigator("/")
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
    console.log(imageViewRef.current);

    imageViewRef.current?.swipeTo(next)
    setWranTime(false);
    setImgIndex(next)
  }, [imgIndex, selected.length]);

  const onUpdate = useCallback(
    (remainingTime: number) => {
      if (remainingTime === warnStart) {
        if(isWarn){window.warnPlayer?.play();}
        setWranTime(true);
      }
      if (remainingTime < warnStart) {
        !wranTime && setWranTime(false);
      }
      if (remainingTime > warnStart) {
        wranTime && setWranTime(true);
      }
    },
    [warnStart, wranTime, isWarn]
  );

  useEffect(() => {
    document.title = `${imgIndex + 1}/${selected.length}`;
  }, [imgIndex, selected.length])

  const onChangePainter = useCallback(
    ({ bgAlph, bgColor, lineAlph, lineColor, lineWidth }: onChangeParams) => {
      if (bgAlph) painter.bgAlph = bgAlph;
      if (bgColor) painter.panterBgColor = bgColor;
      if (lineAlph) painter.lineAlph = lineAlph;
      if (lineColor) painter.lineColor = lineColor;
      if (lineWidth) painter.lineWidth = lineWidth;
    },
    [],
  )

  const [isBlack, setIsBlack] = useState(false)

  return <div className={classNames(s.root, {
    [s.gray]: isBlack
  })}>
    {!painterR.showPanter ? <NavBar className={s.nav} onBack={() => navigator(-1)} left={
      <Space justify="center" align="center">
        <LogoBlack width={20} onClick={() => navigator("/")} fontSize={24} />
        <AppstoreOutline onClick={() => setPopupVisible(true)} fontSize={24} />
        <IconBlack
          width={28}
          height={28}
          onClick={() => setIsBlack(!isBlack)}
          fontSize={24}
          style={{ borderRadius: 28, overflow: "hidden", background: isBlack ? "#000" : "inherit" }}
        />
        <EditSOutline onClick={() => painter.showPanter = true} fontSize={24} />
      </Space>
    } /> : null}
    <ImageViewer.Multi
      maxZoom={10}
      images={
        selected?.map(item => `${item.url.indexOf("data:image") === -1 ? import.meta.env.VITE_APP_POSESURL : ''}${item.url}`)
      }
      visible
      defaultIndex={imgIndex}
      onIndexChange={handleIndexChange}
      ref={imageViewRef}
    />
    <SetDuration>
      <div className={classNames(s.timer, { [s.timewran]: wranTime })} style={{ opacity: !painterR.showPanter ? 1 : 0 }}>
        <Timer
          key={imgIndex}
          onComplete={handleComplete}
          onUpdate={onUpdate}
          isPlaying={!painterR.showPanter}
          wranTime={true}
        />
      </div>
    </SetDuration>
    <SelectedList
      visible={popupVisible}
      onMaskClick={() => setPopupVisible(false)}
    />
    {/* <Painter
      visible={painterR.showPanter}
      onClose={() => painter.showPanter = false}
      onChange={onChangePainter}
      lineColor={painterR.lineColor}
      lineWidth={painterR.lineWidth || 1}
      bgColor={painterR.panterBgColor}
      bgAlph={painterR.bgAlph}
      eraserAlph={painterR.eraserAlph}
      eraserWidth={painterR.eraserWidth}
      lineAlph={painterR.lineAlph}
      historyRecords={1000}
      auth={userR.auth}
    /> */}
    <DrawingBoard visible={painterR.showPanter} bgimg={selected[imgIndex]} />
  </div>;
};

export default View;
