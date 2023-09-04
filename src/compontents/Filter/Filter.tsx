import React, { useCallback, useRef, useState } from "react";
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

interface Props {
  onFilter?: (result: { [key: string]: string[] | undefined }) => void;
  defaultValues?: { [key: string]: string[] };
  models?: { id: string; src: string }[];
}

const Filter: React.FC<Props & PopupProps> = ({
  onFilter,
  models = [],
  ...props
}) => {
  const form = Form.useForm()[0];
  const lastAllFields = useRef<string[]>(["category", "gender", "sub", "md"]);

  const [isPerson, setIsPerson] = useState(true);
  const filterLastAll = useCallback(
    (valobj: { [s: string]: string[] | undefined }) => {
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

  const onValuesChange = useCallback(
    (
      valobj: { [s: string]: string[] | undefined } | ArrayLike<unknown>,
      values: { [key: string]: any }
    ) => {
      const key = Object.keys(valobj)[0];
      const val = Object.values(valobj)[0] as string[];
      // 当前内容有全选
      if (val?.includes("0")) {
        if (lastAllFields.current.includes(key)) {
          form.setFieldValue(
            key,
            val.filter((item) => item !== "0")
          );
        } else {
          form.setFieldValue(key, ["0"]);
        }
      }
      filterLastAll(values);
    },
    [filterLastAll, form]
  );

  const onFieldsChange = useCallback(() => {
    const categorySelected = (form.getFieldValue("category") || []) as string[];
    if (
      !categorySelected.includes(category.全部) &&
      !categorySelected.includes(category.人物)
    ) {
      setIsPerson(false);
    } else {
      setIsPerson(true);
    }
  }, [form]);

  const onFinish = useCallback(() => {
    const values = form.getFieldsValue();
    onFilter?.(values);
  }, [form, onFilter]);

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
