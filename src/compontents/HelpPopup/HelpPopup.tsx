import { Button, Popup, PopupProps, Swiper } from "antd-mobile";
import React from "react";
import s from "./HelpPopup.module.scss";

interface Props extends PopupProps {
  onEnded?: () => void;
}

const HelpPopup: React.FC<Props> = ({ onEnded, ...props }) => {
  return (
    <Popup position="bottom" destroyOnClose {...props}>
      <Swiper loop={false}>
        <Swiper.Item>
          <div className={s.item} style={{ background: "#ace0ff" }}>
            <Button onClick={() => onEnded?.()}>跳过</Button>
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={s.item} style={{ background: "#bcffbd" }}>
            <Button onClick={() => onEnded?.()}>跳过</Button>
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={s.item}>
            <Button color="primary" onClick={() => onEnded?.()}>
              开始使用
            </Button>
          </div>
        </Swiper.Item>
      </Swiper>
    </Popup>
  );
};

export default HelpPopup;
