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
      <Swiper loop={false} ref={ref}>
        <Swiper.Item>
          <div className={s.item}>
            <Space className={s.main} block direction="vertical" align="center">
              <h3><p>使用说明</p>1、设置时间</h3>
              <div className={s.st1} >
                <div className={s.msg}>
                  点击闹钟设置每张素材图片的速写时间
                </div>
              </div>
              <Button className={s.btn} onClick={() => ref.current?.swipeNext()}>知道了</Button>
              <Button fill="none" color="primary" onClick={() => onEnded?.()}>跳过</Button>
            </Space>
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={s.item}>
            <Space className={s.main} block direction="vertical" align="center">
              <h3><p>使用说明</p>2、选择素材</h3>
              <div className={s.st2} >
                <div className={s.msg}>
                  点击选择即将速写的图片素材；可以选择sketch的图库素材，也可以放心使用手机相册图片，手机相册图片仅在本人手机预览，绝不会上传到服务器。
                </div>
              </div>
              <Button className={s.btn} onClick={() => ref.current?.swipeNext()}>知道了</Button>
              <Button fill="none" color="primary" onClick={() => onEnded?.()}>跳过</Button>
            </Space>
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className={s.item}>
            <Space className={s.main} block direction="vertical" align="center">
              <h3><p>使用说明</p>3、开始</h3>
              <div className={s.st3} >
                <div className={s.msg}>
                  点击开始应用，您将进入到第一张素材
                  的速写倒计时。倒计时结束后，系统将
                  自动切换到下一张素材，并重新开始计时。
                </div>
              </div>
              <Button className={classNames(s.btn, s.startbtn)} onClick={() => onEnded?.()}>开始使用</Button>
            </Space>
          </div>
        </Swiper.Item>
      </Swiper>
    </Popup>
  );
};

export default HelpPopup;
