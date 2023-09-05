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
  [key: string]: string[];
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
  const lastValues = useRef<{ [key: string]: string[] }>({});
  const [isPerson, setIsPerson] = useState(true);
  useEffect(() => {
    if (defaultValues && props.visible) {
      form.setFieldsValue(defaultValues);
      setIsPerson(
        defaultValues.category?.includes(category.全部) ||
          defaultValues.category?.includes(category.人物)
      );
      setTimeout(() => {
        lastValues.current = defaultValues;
      }, 100);
    }
  }, [defaultValues, form, props.visible]);

  const getResult = useCallback(
    (values: { [key: string]: string[] | undefined }) => {
      const result: {
        [key: string]: string[];
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
    []
  );

  const onValuesChange = useCallback(
    (
      currentValObj: { [s: string]: string[] | undefined } | ArrayLike<unknown>
    ) => {
      const currentKey = Object.keys(currentValObj)[0];
      const currentVal = Object.values(currentValObj)[0] as string[];
      const lastVal = lastValues.current[currentKey];
      if (lastVal?.includes("0")) {
        // 有历史全选
        if (currentVal?.length) {
          const res = currentVal.filter((item) => item !== "0");
          form.setFieldValue(currentKey, res);
        }
      } else {
        // 没有历史全选
        if (currentVal?.includes("0")) {
          form.setFieldValue(currentKey, ["0"]);
        }
      }

      const newRes = form.getFieldsValue();
      onChange?.(getResult(newRes));
      lastValues.current = newRes;
    },
    [form, getResult, onChange]
  );

  const onFieldsChange = useCallback(() => {
    const categorySelected = (form.getFieldValue("category") || []) as string[];
    setIsPerson(
      categorySelected.includes(category.全部) ||
        categorySelected.includes(category.人物)
    );
  }, [form]);

  useEffect(() => {
    if (props.visible) {
      lastValues.current = form.getFieldsValue();
    }
  }, [form, isPerson, props.visible]);

  const onFinish = useCallback(() => {
    const values = form.getFieldsValue();
    onFilter?.(getResult(values));
  }, [form, getResult, onFilter]);

  return (
    <Popup {...props}>
      <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Form
          form={form}
          onValuesChange={onValuesChange}
          onFieldsChange={onFieldsChange}
          onFinish={onFinish}
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
      </div>
      <div style={{ margin: "14px"}}>
        <Button type="submit" block color="primary" onClick={form.submit}>
          确定
        </Button>
      </div>
    </Popup>
  );
};

export default Filter;
