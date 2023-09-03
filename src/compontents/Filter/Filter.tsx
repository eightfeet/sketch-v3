import React, { useCallback, useRef } from 'react';
// import s from './Filter.module.scss';
import { Avatar, Form, Popup, PopupProps, Selector } from 'antd-mobile';
import { FormItem } from 'antd-mobile/es/components/form/form-item';
import { mockImg } from '~/api';
import { PicturesOutline } from 'antd-mobile-icons';

interface Props {

}

enum category {
    全部 = "0",
    人物 = "1",
    静物 = "2"
}

enum gender {
    全部 = "0",
    男 = "1",
    女 = "2",
    组合 = "3"
}

enum sub {
    全部 = "0",
    动态 = "1",
    角色 = "2",
    头像 = "3",
    半身 = "4",
    手足 = "5",
    五官 = "6",
    解剖 = "7",
    动漫 = "8"
}

console.log("Object.keys(category)", Object.keys(category))
console.log("Object.values(category)", Object.values(category))


const getOptions = (obj: { [s: string]: string; }) => Object.keys(obj).map((key, index) => ({
    label: key,
    value: Object.values(obj)[index]
}))

const Filter: React.FC<Props & PopupProps> = ({ ...props }) => {
    const form = Form.useForm()[0];

    const lastAllFields = useRef<string[]>(["category", "gender", "sub", "md"]);

    const filterLastAll = useCallback(
        (valobj: { [s: string]: string[] | undefined; }) => {
            const lastAll: string[] = [];
            for (const key in valobj) {
                if (Object.prototype.hasOwnProperty.call(valobj, key)) {
                    const element = valobj[key];
                    if (element?.includes("0")) {
                        lastAll.push(key)
                    }
                    lastAll.push()
                }
            }
            lastAllFields.current = lastAll;
        },
        [],
    );

    const onValuesChange = useCallback(
        (valobj: { [s: string]: string[] | undefined; } | ArrayLike<unknown>, values: { [key: string]: any }) => {
            const key = Object.keys(valobj)[0]
            const val = Object.values(valobj)[0] as string[];
            // 当前内容有全选
            if (val?.includes("0")) {
                console.log("you", key, lastAllFields.current);
                
                if (lastAllFields.current.includes(key)) {
                    console.log(111);
                    
                    form.setFieldValue(key, val.filter(item => item === "0"))
                } else {
                    form.setFieldValue(key, ["0"])
                }   
            }
            filterLastAll(values)
        },
        [filterLastAll, form],
    );

    return (
        <Popup {...props}>
            <Form form={form} onValuesChange={onValuesChange}>
                <FormItem name="category" label="类别" >
                    <Selector
                        multiple
                        options={
                            getOptions(category)
                        }
                    />
                </FormItem>
                <FormItem name="gender" label="性别" >
                    <Selector
                        multiple
                        options={
                            getOptions(gender)
                        }
                    />
                </FormItem>
                <FormItem name="sub" label="属性" >
                    <Selector
                        multiple
                        options={
                            getOptions(sub)
                        }
                    />
                </FormItem>
                <FormItem name="md" label="模特">
                    <Selector
                        multiple
                        options={[{
                            label: <div>
                                <PicturesOutline />
                                <div>全部</div>
                            </div>,
                            value: "0",
                        }].concat(mockImg.map((item, index) => ({
                            label: <Avatar src={item} />,
                            value: `${index} + 1`,
                        })))}
                    />
                </FormItem>
            </Form>
        </Popup>
    )
}

export default Filter;