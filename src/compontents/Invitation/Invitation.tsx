import React, { useCallback, useEffect } from "react";
import s from "./Invitation.module.scss";
import { Space, Form, Input, Button, Toast } from "antd-mobile";
import { CloudKeys, cloudFunction } from "~/core/cloud";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { getSerialCode, user } from "~/store";
import loading from "../Loading";

interface Props {
  onHelp?: () => void;
}

const Invitation: React.FC<Props> = ({ onHelp }) => {
  const userR = useSnapshot(user);
  const navigator = useNavigate();

  useEffect(() => {
    if (!userR.member_id) {
      navigator("/")
    }
  }, [navigator, userR.member_id])

  const invForm = Form.useForm()[0];

  useEffect(() => {
    if (userR.info?.username) {
      invForm.setFieldValue("name", userR.info?.username);
    }
    if (userR.info?.email) {
      invForm.setFieldValue("email", userR.info?.email);
    }
  }, [invForm, userR.info?.email, userR.info?.username])


  const onSubmit = useCallback(async () => {
    // 参数准备
    const { name, code, email } = invForm.getFieldsValue();

    try {
      loading.show();

      const {
        code: invActCode,
        data: invActData,
        msg: invActMsg,
        status
      } = await cloudFunction(CloudKeys.邀请码激活, {
        username: name,
        code,
        email,
        member_id: userR.member_id,
      });
      
      loading.hide();
      if (invActCode !== 200) {

        let msg = invActMsg;
        if (status === -3) {
          msg = `${msg} 核销时间:${dayjs(invActData.writeoff_at).format("YYYY-MM-DD HH:mm:ss")}`
        }
        if (invActData?.extra) {
          msg = `${msg} ${invActData?.extra}`
        }
        invActMsg && Toast.show(msg || '');
        return;
      }
      Toast.show("恭喜您激活成功！");
      await getSerialCode(userR.member_id as string);
      navigator("/")
    } catch (error) {
      console.error(error);
      Toast.show("激活失败");
      loading.hide();
    }
  }, [invForm, navigator, userR.member_id]);
  return (
    <Space direction="vertical" block >
      <h3 className={s.title}>邀请码激活</h3>
      <Form form={invForm} onFinish={onSubmit} className={s.formbody}>
        <Form.Item
          label={
            <Space block justify="between">
              <span>邀请码</span>
              {onHelp ? <Button size="mini" fill="outline" onClick={() => onHelp?.()}>
                获取邀请码
              </Button> : null}
            </Space>
          }
          name="code"
          rules={[{ required: true, message: "请输入邀请码" }]}
        >
          <Input placeholder="请输入邀请码" />
        </Form.Item>
        <Form.Item
          label="用户名"
          name="name"
          help="唯一用户名用于激活产品"
          disabled={!!userR.info?.username}
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          help="用于收取产品序列号"
          rules={[
            { required: true, message: "请输入邮箱号码" },
            { type: "string", min: 6 },
            { type: "email", warningOnly: true },
          ]}
        >
          <Input placeholder="用于收取产品序列号" />
        </Form.Item>
      </Form>
      <div className={s.footer}>
        <Button
          block
          type="submit"
          color="primary"
          size="large"
          onClick={invForm.submit}
        >
          激活
        </Button>
      </div>
    </Space>
  );
};

export default Invitation;