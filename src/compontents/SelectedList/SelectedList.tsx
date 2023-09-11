import { Button, NavBar, Popup, PopupProps } from "antd-mobile";
import React, { useCallback } from "react";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import s from "./SelectedList.module.scss";
import ImageCard from "../ImageCard";
import Empty from "~/compontents/Empty/Empty";
import { useSnapshot } from 'valtio'
import { runningTime } from "~/store";

interface Props {
  onClear?: () => void;
  clearText?: string;
}

const SelectedList: React.FC<Props & PopupProps> = ({
  onClear,
  clearText,
  ...popupProps
}) => {
  const runningTimeR = useSnapshot(runningTime)
  const matches768 = useMediaQuery("(min-width: 768px)");
  const matches1024 = useMediaQuery("(min-width: 1024px)");
  const displaywf = { cols: 4, gap: 10 };

  if (matches768) {
    displaywf.cols = 12;
  }

  if (matches1024) {
    displaywf.cols = 14;
  }

  const handleToggle = useCallback(
    (index: number) => {
      runningTime.selected = [...runningTime.selected || []].filter((_, ind) => ind !== index)
    },
    []
  );

  const clear = useCallback(
    () => {
      runningTime.selected = [];
      onClear?.()
    },
    [onClear],
  );

  return (
    <Popup {...popupProps} className={s.main}>
      <NavBar
        className={s.nav}
        backArrow={false}
        left={`已选择 ${10}`}
        right={
          <Button fill="none" size="mini" onClick={clear}>
            {clearText || "清除"}
          </Button>
        }
      ></NavBar>
      <div className={s.content}>
        <div className={s.pupup}>
          <wc-waterfall {...displaywf}>
            {runningTimeR.selected?.map((item, index) => (
              <ImageCard
                key={item._id}
                selected
                onToggle={() => handleToggle(index)}
                src={item.url}
              />
            ))}
          </wc-waterfall>
          {!runningTimeR.selected?.length ? <Empty /> : null}
        </div>
      </div>
    </Popup>
  );
};

export default SelectedList;
