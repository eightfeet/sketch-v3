import React, { useCallback } from "react";
import s from "./Activation.module.scss";
import { Form, Input, Toast, Button, Space } from "antd-mobile";
import { loginBySN } from "~/store";
import loading from "../Loading";

interface Props {
  onSucess?: () => void;
  onGetSN?: () => void;
  onCancel?: () => void;
}
/**
 * 激活码登陆
 */
const Activation: React.FC<Props> = ({ onSucess, onGetSN, onCancel }) => {
  const authForm = Form.useForm()[0];
  const authFormSubmit = useCallback(async () => {
    loading.show();
    const { name, license } = authForm.getFieldsValue();
    try {
      await loginBySN({ username: name, license });
      Toast.show("激活成功");
      loading.hide();
      onSucess?.();
    } catch (error) {
      loading.hide();
      Toast.show(decodeURI(error as string));
    }
  }, [authForm, onSucess]);

  return (
    <Space direction="vertical" block>
      <h3 className={s.title}>达文西激活</h3>
      <Form form={authForm} onFinish={authFormSubmit} className={s.formbody}>
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label={
            <Space block justify="between">
              <span>序列号</span>
              <Button size="mini" fill="outline" onClick={() => onGetSN?.()}>
                没有序列号
              </Button>
            </Space>
          }
          name="license"
          rules={[{ required: true, message: "请输入产品序列号" }]}
        >
          <Input placeholder="请输入序列号" />
        </Form.Item>
      </Form>
      <Space block direction="vertical">
        <Button
          block
          type="submit"
          color="primary"
          size="large"
          onClick={authForm.submit}
        >
          确定
        </Button>
        {onCancel ? <Button block onClick={onCancel}>取消</Button> : null}
      </Space>
    </Space>
  );
};

export default Activation;
