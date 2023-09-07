import { Button, Popup, PopupProps, Space, Swiper } from "antd-mobile";
import React from "react";
import classNames from 'classnames'
import s from "./HelpPopup.module.scss";

interface Props extends PopupProps {
  onEnded?: () => void;
}

const HelpPopup: React.FC<Props> = ({ onEnded, ...props }) => {
  return (
    <Popup position="bottom" destroyOnClose {...props} className={s.root}>
      <Swiper loop={false}>
        <Swiper.Item>
          <div className={s.item}>
            <Space className={s.main} block direction="vertical" align="center">
              <h3>1、设置速写时间</h3>
              <div className={s.iconsbar}>
                <div className={s.mask} style={{ backgroundPositionX: "-373px" }} >&nbsp;</div>
              </div>
              <span className={s.info}>选择每张图片停留的时间</span>
              <div className={s.st1} />
              <Button className={s.btn} onClick={() => onEnded?.()}>跳过</Button>
            </Space>
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={s.item}>
            <Space className={s.main} block direction="vertical" align="center">
              <h3>2、选择速写图片</h3>
              <div className={s.iconsbar}>
                <div className={s.mask} style={{ backgroundPositionX: "-287px" }} >&nbsp;</div>
              </div>
              <span className={s.info}>筛选您喜欢的速写模特图片</span>
              <div className={s.st2} />
              <Button className={s.btn} onClick={() => onEnded?.()}>跳过</Button>
            </Space>
          </div>
        </Swiper.Item>
        <Swiper.Item>
        <div className={s.item}>
            <Space className={s.main} block direction="vertical" align="center">
              <h3>3、开始速写</h3>
              <div className={s.iconsbar}>
                <div className={s.mask} style={{ backgroundPositionX: "-200px" }} >&nbsp;</div>
              </div>
              <span className={s.info}>点击按钮速写计时开始，每张模特图片按照设定时间轮播</span>
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
