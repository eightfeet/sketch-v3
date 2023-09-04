import React, { useCallback, useEffect, useRef, useState } from "react";
// import s from './Filter.module.scss';
import { Avatar, Button, Form, Popup, PopupProps, Selector } from "antd-mobile";
import { FormItem } from "antd-mobile/es/components/form/form-item";
import { PicturesOutline } from "antd-mobile-icons";

enum category {
    全部 = "0",
    人物 = "1",
    静物 = "2",
}

enum gender {
    全部 = "0",
    男 = "1",
    女 = "2",
    组合 = "3",
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
    动漫 = "8",
}

const getOptions = (obj: { [s: string]: string }) =>
    Object.keys(obj).map((key, index) => ({
        label: key,
        value: Object.values(obj)[index],
    }));

interface valType {
    [key: string]: string[]
}

interface Props {
    onFilter?: (result: valType) => void;
    onChange?: (data: valType) => void;
    defaultValues?: valType;
    models?: { id: string; src: string }[];
}

const Filter: React.FC<Props & PopupProps> = ({
    onFilter,
    models = [],
    defaultValues = {},
    onChange,
    ...props
}) => {
    const form = Form.useForm()[0];
    const lastAllFields = useRef<string[]>(["category", "gender", "sub", "md"]);
    const [isPerson, setIsPerson] = useState(true);
    const filterLastAll = useCallback(
        (valobj?: valType) => {
            const lastAll: string[] = [];
            for (const key in valobj) {
                if (Object.prototype.hasOwnProperty.call(valobj, key)) {
                    const element = valobj[key];
                    if (element?.includes("0")) {
                        lastAll.push(key);
                    }
                    lastAll.push();
                }
            }
            lastAllFields.current = lastAll;
        },
        []
    );

    const init = useCallback(
        () => {
            if (defaultValues && form) {
                form.setFieldsValue(defaultValues);
                filterLastAll(defaultValues)
            }
            if (
                !defaultValues.category.includes(category.全部) &&
                !defaultValues.category.includes(category.人物)
            ) {
                setIsPerson(false);
            } else {
                setIsPerson(true);
            }
        },
        [defaultValues, filterLastAll, form],
    );

    useEffect(() => {
        init()
    }, [init])

    const getResult = useCallback(
        (values: { [key: string]: string[] | undefined }) => {
            const result: {
                [key: string]: string[]
            } = {};
            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    const element = values[key];
                    if (element?.length) {
                        result[key] = element;
                    }
                }
            }
            return result;
        },
        [],
    );



    const onValuesChange = useCallback(
        (
            currectValObj: { [s: string]: string[] | undefined } | ArrayLike<unknown>,
            values: { [key: string]: any }
        ) => {
            const currectKey = Object.keys(currectValObj)[0];
            const currectVal = Object.values(currectValObj)[0] as string[];
            console.log("vals", values);

            Object.keys(values).forEach(key => {
                const eachOne: string[] = values[key];
                if (currectVal?.includes("0")) {
                    // 当前结果包含0
                    if (lastAllFields.current.includes(key)) {
                        form.setFieldValue(
                            currectKey, eachOne.filter(el => el !== "0"))
                    } else {
                        console.log(111, currectKey, ["0"]);
                        
                        form.setFieldValue(
                            currectKey, ["0"])
                    }
                }
                console.log('eachOne', eachOne);
            })
            const newRes = form.getFieldsValue();
            console.log("newRes", newRes);
            
            // filterLastAll(newRes);
            // onChange?.(getResult(newRes));
        },
        [filterLastAll, form, getResult, onChange]
    );

    const onFieldsChange = useCallback(() => {
        const categorySelected = (form.getFieldValue("category") || []) as string[];
        setIsPerson(categorySelected.includes(category.全部) || categorySelected.includes(category.人物));
    }, [form]);

    const onFinish = useCallback(() => {
        const values = form.getFieldsValue();
        onFilter?.(getResult(values));
    }, [form, getResult, onFilter]);

    return (
        <Popup {...props}>
            <Form
                form={form}
                onValuesChange={onValuesChange}
                onFieldsChange={onFieldsChange}
                onFinish={onFinish}
                footer={
                    <Button type="submit" block color="primary">
                        确定
                    </Button>
                }
            >
                <FormItem name="category" label="类别">
                    <Selector multiple options={getOptions(category)} />
                </FormItem>
                {isPerson ? (
                    <FormItem name="gender" label="性别">
                        <Selector multiple options={getOptions(gender)} />
                    </FormItem>
                ) : null}
                {isPerson ? (
                    <FormItem name="sub" label="属性">
                        <Selector multiple options={getOptions(sub)} />
                    </FormItem>
                ) : null}
                {models?.length ? (
                    <FormItem name="md" label="模特">
                        <Selector
                            multiple
                            options={[
                                {
                                    label: (
                                        <div>
                                            <PicturesOutline />
                                            <div>全部</div>
                                        </div>
                                    ),
                                    value: "0",
                                },
                            ].concat(
                                models?.map((item, index) => ({
                                    label: <Avatar key={index} src={item.src} />,
                                    value: item.id,
                                })) || []
                            )}
                        />
                    </FormItem>
                ) : null}
            </Form>
        </Popup>
    );
};

export default Filter;
