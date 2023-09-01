import React from "react";
import s from "./Empty.module.scss";
import { EmpytIcon } from "./EmptyIcon";

interface Props {
  msg?: string;
  icon?: React.ReactNode;
}

const Empty: React.FC<Props> = ({ msg, icon }) => {
  return (
    <div className={s.root}>
      {icon || <EmpytIcon />}
      <span className={s.msg}>{msg || "暂无数据"}</span>
    </div>
  );
};

export default Empty;
