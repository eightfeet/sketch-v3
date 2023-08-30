import React from 'react';
import s from './Loading.module.scss';
import { DotLoading, Mask } from 'antd-mobile';

const Loading:React.FC = () => {
    return (
        <Mask className={s.root} color='rgba(255,255,255,.3)' >
            <DotLoading />
        </Mask>
    )
}

export default Loading;