import { Button, Dialog, Form, Input, Space, Toast } from "antd-mobile";


import React, { useCallback, useEffect } from 'react';
import s from './Register.module.scss';
import { CloudKeys, cloudFunction } from "~/core/cloud";
import { UserInfo, user } from "~/store";
import loading from "../Loading";

interface Props {
    onCancel?: () => void;
    onSuccess?: (data: UserInfo) => void;
    member_id?: string;
    email?: string;
    username?: string;
    openid?: string;
}

const Register: React.FC<Props> = ({ onCancel, member_id, openid, username, email, onSuccess }) => {
    const form = Form.useForm()[0]

    useEffect(() => {
        form.setFieldsValue({ username, email })
    }, [username, email, form])

    const onSubmit = useCallback(
        async ({ username, email }: { username: string, email: string, }) => {
            loading.show()
            const { code, data, msg } = await cloudFunction(CloudKeys.更新会员, {
                username, email, member_id, openid
            })
            if (code === 200) {
                Toast.show("提交成功！");
                user.info = data;
                onSuccess?.(data)
            } else {
                Toast.show(msg || "请求失败！");
            }
            loading.hide()
        },
        [member_id, onSuccess, openid],
    )

    return (
        <div>
            <Form form={form} onFinish={onSubmit} className={s.formbody}
                footer={<Space block direction="vertical">
                    <Button block color="primary" onClick={form.submit}>确定</Button>
                    {onCancel ? <Button block onClick={onCancel}>取消</Button> : null}
                </Space>}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    disabled={!!username}
                    rules={[{ required: true, message: "请输入用户名" }]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                        { required: true, message: "请输入邮箱号码" },
                        { type: "string", min: 6 },
                        { type: "email", warningOnly: true },
                    ]}
                >
                    <Input placeholder="用于收取产品序列号" />
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register;

export const register = ({
    member_id,
    openid,
    email,
    username,
    onSuccess
}: {
    member_id?: string,
    email?: string,
    username?: string,
    openid?: string,
    onSuccess?: (data: UserInfo) => void
}) => {
    const dialog = Dialog.show({
        title: "完善用户信息",
        content: <Register
            member_id={member_id}
            openid={openid}
            email={email}
            username={username}
            onSuccess={(data: UserInfo) => {

                dialog.close();
                onSuccess?.(data);
            }}
            onCancel={() => dialog.close()}
        />
    });
};
