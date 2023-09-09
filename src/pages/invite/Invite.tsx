import React, {  } from "react";
import s from "./Invite.module.scss";
import Invitation from "~/compontents/Invitation";
import { Avatar, FloatingBubble, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import useAddWeChat from "~/hooks/useAddWeChat";
import useDocumentTitle from "~/hooks/useDocumentTitle";

interface Props {
  name?: string;
}
const Invite: React.FC<Props> = ({ name = "邀请码激活"}) => {
  const navigator = useNavigate();
  const addWeChat = useAddWeChat();
  useDocumentTitle(name);

  return (
    <div className={s.root}>
      <Space block direction="vertical" justify="around" >
        <div className={s.header}>
          <Avatar src="./logo512.png" style={{ '--size': '64px' }} />
        </div>

        <Invitation onHelp={addWeChat} />
      </Space>
      <FloatingBubble
        style={{
          '--initial-position-bottom': '24px',
          '--initial-position-right': '24px',
          '--edge-distance': '24px',
        }}
        onClick={() => navigator("/")}
      >
        首页
      </FloatingBubble>
    </div>
  );
};

export default Invite;
