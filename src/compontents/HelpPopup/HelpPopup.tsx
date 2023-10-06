import { Button, Popup, PopupProps, Space, Swiper, SwiperRef } from "antd-mobile";
import React, { useRef } from "react";
import classNames from 'classnames'
import s from "./HelpPopup.module.scss";

interface Props extends PopupProps {
  onEnded?: () => void;
}

const HelpPopup: React.FC<Props> = ({ onEnded, ...props }) => {
  const ref = useRef<SwiperRef>(null)
  return (
    <Popup position="bottom" destroyOnClose {...props} className={s.root}>
      <Swiper loop={false}>
      <Swiper.Item>
          <div className={s.item}>
            <Space className={s.main} block direction="vertical" align="center">
              <h3>1、设置时间</h3>
              <div className={s.st1} />
              <Button className={s.btn} onClick={() => ref.current?.swipeNext()}>下一步</Button>
              <Button fill="none" color="primary" onClick={() => onEnded?.()}>跳过</Button>
            </Space>
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={s.item}>
            <Space className={s.main} block direction="vertical" align="center">
              <h3>2、选择素材</h3>
              <div className={s.st2} />
              <Button className={s.btn} onClick={() => ref.current?.swipeNext()}>下一步</Button>
              <Button fill="none" color="primary" onClick={() => onEnded?.()}>跳过</Button>
            </Space>
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={s.item}>
            <Space className={s.main} block direction="vertical" align="center">
              <h3>3、开始</h3>
              <div className={s.st3} />
              <Button className={classNames(s.btn, s.startbtn)} onClick={() => onEnded?.()}>开始使用</Button>
            </Space>
          </div>
        </Swiper.Item>
      </Swiper>
    </Popup>
  );
};

export default HelpPopup;
