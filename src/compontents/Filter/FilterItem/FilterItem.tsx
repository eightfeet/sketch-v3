import React, { useCallback } from 'react';
import s from './FilterItem.module.scss';
import { Button, Space } from 'antd-mobile';
import classNames from 'classnames';

interface Props {
    onChange?: (value: (number | string)[]) => void;
    options?: { label: JSX.Element | string, value: string | number }[];
    wrapClassName?: string;
    buttonClassName?: string;
    value?: (string | number)[]
}

const FilterItem: React.FC<Props> = ({ onChange, options = [], wrapClassName, buttonClassName, value = [] }) => {
    const handleChange = useCallback(
        (key?: string | number) => () => {
            if (key === undefined) {
                onChange?.([])
            } else {
                if (value.includes(key)) {
                    onChange?.(value.filter(el => el !== key))
                } else {
                    const vals = [...value, key];
                    if (vals.length === options.length) {
                        onChange?.([])
                    } else {
                        onChange?.([...value, key])
                    }
                }
            }
        },
        [onChange, options.length, value],
    );
    return (
        <div className={s.wrap}>
            <Space wrap className={wrapClassName}>
                <Button className={classNames(s.btn, buttonClassName)} onClick={handleChange()}>全部</Button>
                {options.map(item => <Button className={classNames(s.btn, buttonClassName, { [s.selected]: value.includes(item.value) })} key={item.value} onClick={handleChange(item.value)}>{item.label}</Button>)}
            </Space>
        </div>
    )
}

export default FilterItem;