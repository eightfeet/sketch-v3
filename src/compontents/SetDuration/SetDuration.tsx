import { Dialog, Form, Slider, Switch } from 'antd-mobile';
import React, { useCallback, useRef } from 'react';
import { useSnapshot } from 'valtio'
import { runningTime } from '~/store';


const SetDuration: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, ...props }) => {
    const { duration, isWarn } = useSnapshot(runningTime);
    const timeRef = useRef<HTMLSpanElement>(null)
    const form = Form.useForm()[0];

    const onConfirm = useCallback(
        () => {
            const { min = 0, sec = 0, isWarn } = form.getFieldsValue();
            runningTime.duration = min * 60 + sec;
            runningTime.isWarn = isWarn;
        },
        [form],
    );

    const handleFieldsChange = useCallback(
        () => {
            const { min = 0, sec = 0 } = form.getFieldsValue();
            if (timeRef.current) {
                timeRef.current.innerText = `${min || 0}分${sec || 0}秒`
            }
        },
        [form],
    );

    const handleClick = useCallback(
        async () => {
            await Dialog.confirm({
                title: <>图片停留时间<span ref={timeRef} >{Math.floor(duration / 60)}分{duration % 60}秒</span></>,
                content: <Form form={form} onValuesChange={handleFieldsChange}>
                    <Form.Item name="min" label="分钟" initialValue={Math.floor(duration / 60)}>
                        <Slider min={0} max={60} />
                    </Form.Item>
                    <Form.Item name="sec" label="秒钟" initialValue={duration % 60}>
                        <Slider min={0} max={59} />
                    </Form.Item>
                    <Form.Item name="isWarn" layout="horizontal" label="结束语音提醒" initialValue={isWarn} valuePropName="checked">
                        <Switch checkedText="开启" uncheckedText="关闭"  />
                    </Form.Item>
                </Form>,
                onConfirm,
                style: {zIndex: 2001}
            });
        },
        [duration, form, handleFieldsChange, isWarn, onConfirm],
    );

    return (
        <span {...props} onClick={handleClick}>
            {children}
        </span>

    )
}

export default SetDuration;