import { Button, NavBar, Popup, PopupProps } from "antd-mobile";
import React, { useCallback } from "react";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import s from "./SelectedList.module.scss";
import ImageCard from "../ImageCard";
import Empty from "~/compontents/Empty/Empty";
import { ImageItem } from "~/api";

interface Props {
  data: ImageItem[];
  onUpdate?: (data: any[]) => void;
  onClear?: () => void;
}

const SelectedList: React.FC<Props & PopupProps> = ({
  data,
  onUpdate,
  onClear,
  ...popupProps
}) => {
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
      onUpdate?.([...data].filter((_, ind) => ind !== index));
    },
    [data, onUpdate]
  );

  return (
    <Popup {...popupProps} className={s.main}>
      <NavBar
        className={s.nav}
        backArrow={false}
        left={`已选择 ${10}`}
        right={
          onClear && (
            <Button fill="none" size="mini" onClick={() => onClear?.()}>
              清除
            </Button>
          )
        }
      ></NavBar>
      <div className={s.content}>
        <div className={s.pupup}>
          <wc-waterfall {...displaywf}>
            {data.map((item, index) => (
              <ImageCard
                key={item._id}
                selected
                onToggle={() => handleToggle(index)}
                src={item.src}
              />
            ))}
          </wc-waterfall>
          {!data.length ? <Empty /> : null}
        </div>
      </div>
    </Popup>
  );
};

export default SelectedList;
