import React from 'react';
import s from './Loading.module.scss';
import { DotLoading } from 'antd-mobile';

const Loading:React.FC = () => {
    return (
        <div className={s.root} >
            <DotLoading />
        </div>
    )
}

export default Loading;