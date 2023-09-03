import React from 'react';
// import s from './Filter.module.scss';
import { Avatar, Form, Popup, PopupProps, Selector } from 'antd-mobile';
import { FormItem } from 'antd-mobile/es/components/form/form-item';
import { mockImg } from '~/api';

interface Props {

}

const typesobj = [
    {
        label: "人物",
        value: "rw"
    },
    {
        label: "静物",
        value: "jw"
    },
]

const gender = [
    {
        label: "男",
        value: "n"
    },
    {
        label: "女",
        value: "v"
    },
    {
        label: "组合",
        value: "zh"
    },
]

const types = [
    {
        label: "动态",
        value: "dt"
    },
    {
        label: "角色",
        value: "js"
    },
    {
        label: "头像",
        value: "tx"
    },
    {
        label: "半身",
        value: "female"
    },
    {
        label: "手足",
        value: "stilllife"
    },
    {
        label: "结构",
        value: "jg"
    },
    {
        label: "动漫",
        value: "dm"
    },
]

const Filter: React.FC<Props & PopupProps> = ({ ...props }) => {
    return (
        <Popup {...props}>
            <Form>
                <FormItem label="类别" >
                    <Selector
                        options={
                            typesobj
                        }
                    />
                </FormItem>
                <FormItem label="性别" >
                    <Selector
                        options={
                            gender
                        }
                    />
                </FormItem>
                <FormItem label="类别" >
                    <Selector
                        options={
                            types
                        }
                    />
                </FormItem>
                <FormItem label="模特">
                    <Selector
                        options={mockImg.map((item, index) => ({
                            label: <Avatar src={item} />,
                            value: index,
                        }))}
                    />
                </FormItem>



            </Form>
        </Popup>
    )
}

export default Filter;