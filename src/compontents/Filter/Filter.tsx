import React, { useCallback, useEffect, useRef, useState } from "react";
// import s from './Filter.module.scss';
import { Avatar, Button, Form, Popup, PopupProps, Selector } from "antd-mobile";
import { FormItem } from "antd-mobile/es/components/form/form-item";
import { PicturesOutline } from "antd-mobile-icons";
import { useQuery } from "@tanstack/react-query";
import { CloudKeys, cloudFunction } from "~/core/cloud";
import { useSnapshot } from "valtio";
import { user } from "~/store";
import { Logo } from "../Logo";
import loading from "../Loading";
import { NamePath } from "rc-field-form/lib/interface";

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
  onChange?: (data: valType) => void;
  defaultValues?: valType;
}

const Filter: React.FC<Props & PopupProps> = ({
  onFilter,
  defaultValues = {},
  onChange,
  ...props
}) => {
  const form = Form.useForm()[0];
  const lastValues = useRef<{ [key: string]: string[] }>({});
  const [isPerson, setIsPerson] = useState(true);
  const userR = useSnapshot(user);
  const [refetchKey, setRefetchKey] = useState(Date.now());

  const { data: { data = []
  } = {} } = useQuery({
    queryKey: ["query_tags"],
    queryFn: async () => {
      loading.show();
      try {
        const res = await cloudFunction(CloudKeys.获取模特标签, {});
        loading.hide();
        return res;
      } catch (error) {
        loading.hide();
        throw (error);
      }
    },
    enabled: !!userR.auth,
    retry: false
  });

  const { data: { data: { list = [] } = {} } = {} } = useQuery({
    queryFn: async () => {
      const { category, gender, sub } = form.getFieldsValue();
      const args: { [keys: string]: string } = {};
      if (category?.length && !category.includes("0")) args.category = category;
      if (gender?.length && !gender.includes("0")) args.gender = gender;
      if (sub?.length && !sub.includes("0")) args.sub = sub;
      loading.show();
      try {
        const res = await cloudFunction(CloudKeys.获取模特列表, args);
        loading.hide();
        return res;
      } catch (error) {
        loading.hide();
        throw (error);
      }
    },
    queryKey: [refetchKey],
    enabled: !!userR.auth,
    retry: false
  })

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
      onChange?.(getResult(newRes));
      lastValues.current = newRes;
      if (currentKey !== "poses_id") {
        setRefetchKey(Date.now())
      }
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

  return (
    <Popup {...props}>
      {userR.auth ? <div>
        <div>
          <Form
            form={form}
            onValuesChange={onValuesChange}
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
          >
            {
              data?.map((item: { keys: { [key: string]: string; }; name: NamePath | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => {
                const tags = item.keys as {
                  [key: string]: string
                };
                return !isPerson && (item.name === "gender" || item.name === "sub") ? null : <FormItem key={index} name={item.name} label={item.title}>
                  <Selector multiple options={Object.keys(tags).map(key => ({
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
                  list?.map((item: any, index: number) => ({
                    label: <Avatar key={index} src={`${import.meta.env.VITE_APP_POSESURL}${item.url}`} fit="contain" />,
                    value: item.poses_id,
                  })) || []
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
      </div> : <div style={{ height: "30vh", textAlign: "center" }}><Logo width={"40Px"} /><br />暂未激活</div>}
    </Popup>
  );
};

export default Filter;
