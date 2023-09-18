import React, { useCallback, useEffect, useRef, useState } from "react";
// import s from './Filter.module.scss';
import { Avatar, Button, Dialog, Form, Popup, PopupProps, Selector } from "antd-mobile";
import { FormItem } from "antd-mobile/es/components/form/form-item";
import { PicturesOutline } from "antd-mobile-icons";
import { useSnapshot } from "valtio";
import { user } from "~/store";
import { Logo } from "../Logo";
import s from './Filter.module.scss'
import Activation from "../Activation";
import useAddWeChat from "~/hooks/useAddWeChat";

enum category {
  全部 = "0",
  人物 = "1",
  静物 = "2",
}

interface valType {
  [key: string]: string[];
}

interface Props {
  onFilter?: (result: valType) => void;
  onChange?: (data: valType, currentKey: string) => void;
  defaultValues?: valType;
  data?: { [key: string]: any}[];
  list?: any[]
}

const Filter: React.FC<Props & PopupProps> = ({
  onFilter,
  defaultValues = {},
  onChange,
  data,
  list,
  ...props
}) => {
  const form = Form.useForm()[0];
  const lastValues = useRef<{ [key: string]: string[] }>({});
  const [isPerson, setIsPerson] = useState(true);
  const userR = useSnapshot(user);



  useEffect(() => {
    if (defaultValues && props.visible) {
      form.setFieldsValue(defaultValues);
      setIsPerson(
        defaultValues.category?.includes(category.全部) ||
        defaultValues.category?.includes(category.人物) ||
        !defaultValues.category?.length
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
      onChange?.(getResult(newRes), currentKey);
      lastValues.current = newRes;
    },
    [form, getResult, onChange]
  );

  const onFieldsChange = useCallback(() => {
    const categorySelected = (form.getFieldValue("category") || []) as string[];
    if (!categorySelected?.length) {
      setIsPerson(true);
    } else {
      setIsPerson(
        categorySelected.includes(category.全部) ||
        categorySelected.includes(category.人物)
      );
    }
  }, [form]);

  useEffect(() => {
    if (props.visible) {
      lastValues.current = form.getFieldsValue();
    }
  }, [form, isPerson, props.visible]);

  const onFinish = useCallback(() => {
    const { category, gender, sub, poses_id } = form.getFieldsValue();
    const args: { [keys: string]: string[] } = {};
    if (category?.length && !category.includes("0")) args.category = category;
    if (gender?.length && !gender.includes("0")) args.gender = gender;
    if (sub?.length && !sub.includes("0")) args.sub = sub;
    if (poses_id?.length && !poses_id.includes("0")) args.poses_id = poses_id;

    onFilter?.(args);
  }, [form, onFilter]);


  const addWeChat = useAddWeChat();

  const checkAuth = useCallback(() => {
    Dialog.show({
        content: <Activation
            onSucess={() => Dialog.clear()}
            onGetSN={() => {
                Dialog.clear();
                addWeChat();
            }}
            onCancel={() => Dialog.clear()}
        />,
        actions: [],
    });
}, [addWeChat]);

  return (
    <Popup className={s.root} {...props}>
      {userR.auth ? <div>
        <div>
          <Form
            form={form}
            onValuesChange={onValuesChange}
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
          >
            {
              data?.map((item: any, index: React.Key | null | undefined) => {
                const tags = item.keys as {
                  [key: string]: string
                };
                return !isPerson && (item.name === "gender" || item.name === "sub") ? null : <FormItem key={index} name={item.name} label={item.title}>
                  <Selector style={{ "--padding": "5px 10px", }} multiple options={Object.keys(tags).map(key => ({
                    label: tags[key],
                    value: key,
                  }))} />
                </FormItem>
              })
            }

            <FormItem name="poses_id" label="模特">
              <Selector
                style={{ height: "30vh", overflowY: "auto" }}
                multiple
                options={([
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
                  list?.map((item: any, index: number) => ({
                    label: <Avatar key={index} src={`${import.meta.env.VITE_APP_POSESURL}${item.url}`} fit="contain" />,
                    value: item.poses_id,
                  })) || [])
                )}
              />
            </FormItem>
          </Form>
        </div>
        <div style={{ margin: "14px" }}>
          <Button type="submit" block color="primary" onClick={form.submit}>
            确定
          </Button>
        </div>
      </div> : <div style={{ height: "30vh", textAlign: "center" }} onClick={checkAuth}><Logo width={"40Px"} /><br />暂未激活</div>}
    </Popup>
  );
};

export default Filter;
