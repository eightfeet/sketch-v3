import { Dialog } from "antd-mobile";
import { useCallback, useRef } from "react";
import s from './style.module.scss'
import wx from "./WechatIMG1.jpeg";

export const useAddWeChat = () => {
    const refDialog = useRef<any>();
    const refGetDialog = useRef<any>();
    const addWeChat = useCallback(() => {
        refDialog.current?.close();
        refGetDialog.current = Dialog.show({
            title: (
                <div className={s.title}>
                    请加微信号申请
                    <span onClick={() => refGetDialog.current?.close()}>取消</span>
                </div>
            ),
            content: (
                <div className={s.wx}>
                    <img src={wx} alt="微信" />
                </div>
            ),
        });
    }, []);

    return addWeChat

}

export default useAddWeChat;