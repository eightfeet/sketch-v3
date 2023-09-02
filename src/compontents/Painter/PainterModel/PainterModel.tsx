import React, { useState } from 'react';
import s from './PainterModel.module.scss';

interface Props {
    visiable?: boolean;
    title?: string;
    onOk?: () => void;
    okText?: string;
    onCancel?: () => void;
    cancelText?: string;
    children?: React.ReactNode;
    maskStyle?: React.CSSProperties;
}

const PainterModel: React.FC<Props> = ({ visiable, title, onOk, okText, cancelText, onCancel, children, maskStyle }) => {
    if (!visiable) return null;
    return (
        <div className={s.cleanbox} style={maskStyle}>
            <div>
                {title ? <h3 className={s.title}>{title}</h3> : null}
                <div className={s.content}>
                    {children}
                </div>
                <div className={s.btnbar}>
                    {onCancel ? <div className={s.btn} onClick={onCancel}>
                        {cancelText || "取消"}
                    </div> : null}
                    {onOk ? <div className={s.btn} onClick={onOk}>
                        {okText || "确定"}
                    </div> : null}

                </div>
            </div>
        </div>
    )
}

export default PainterModel;