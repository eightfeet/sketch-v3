import React, { useCallback, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { Button, Space, Swiper, Image, Badge, Dialog, List, Toast, Tag } from "antd-mobile";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { runningTime, user } from "~/store";
import {
    ClockCircleOutline,
    KeyOutline,
    PictureWrongOutline,
    QuestionCircleOutline,
    UserOutline,
} from "antd-mobile-icons";
import PlayIcon from "~/compontents/PlayIcon";
import img from "./show.jpeg";
import img3 from "./show3.jpeg";
import img4 from "./show4.jpeg";
import img5 from "./show5.jpeg";
import img6 from "./show6.jpeg";
import img7 from "./show7.jpeg";
import img8 from "./show8.jpeg";

import s from "./Home.module.scss";
import SetDuration from "~/compontents/SetDuration";
import HelpPopup from "~/compontents/HelpPopup/HelpPopup";
import ClipBoard from "~/compontents/ClipBoard";
import Activation from "~/compontents/Activation";
import useAddWeChat from "~/hooks/useAddWeChat";

dayjs.extend(duration);

interface Props {
    name?: string;
}

const Home: React.FC<Props> = ({ name = "达文西Art-sketch" }) => {
    useDocumentTitle(name);
    const { selected = [], duration = 0 } = useSnapshot(runningTime);
    const [vhelp, setVhelp] = useState(false);
    const navigator = useNavigate();
    const userR = useSnapshot(user);
    const addWeChat = useAddWeChat();

    const goTasks = useCallback(
        () => {
            Dialog.clear()
            navigator("/tasks");
        },
        [navigator],
    )

    const goInvite = useCallback(() => {
        Dialog.clear()
        navigator("/invite")
    }, [navigator])

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


    const showUser = useCallback(() => {
        const { username, license, end_at } = userR.serialCode || {};

        if (!userR.auth) {
            checkAuth();
            return;
        }

        Dialog.show({
            content: (
                <>
                    <List header="用户信息" className={s.list}>
                        {userR.serialCode ? <List.Item
                            prefix={
                                <Image
                                    src={"./logo192.png"}
                                    style={{ borderRadius: 20 }}
                                    fit="cover"
                                    width={40}
                                    height={40}
                                />
                            }
                            description={
                                <>
                                    {license}
                                    {
                                        <div className={s.times}>
                                            有效期至：<div>{dayjs(end_at).format("YYYY-MM-DD HH:mm:ss")}</div>
                                        </div>
                                    }
                                    <div>关联应用：
                                        <Space>
                                            {userR.serialCode.role.includes(1) ? <Tag >模型</Tag> : null}
                                            {userR.serialCode.role.includes(2) ? <Tag >速写</Tag> : null}
                                        </Space>
                                    </div><br />
                                    <ClipBoard
                                        onSuccess={Dialog.clear}
                                        message="已复制"
                                        text={`用户名：${username}\n序列号：${license}`}
                                        fallback={<>不支持复制</>}
                                    >
                                        <Button className={s.buttoncopy} size="mini" fill="outline">复制序列号</Button>
                                    </ClipBoard>
                                </>
                            }
                        >
                            {username}
                        </List.Item> : <List.Item
                            prefix={
                                <Image
                                    src={"./logo192.png"}
                                    style={{ borderRadius: 20 }}
                                    fit="cover"
                                    width={40}
                                    height={40}
                                />
                            }
                            description={<>请先激活达文西Art-sketch</>}
                        >
                            游客
                        </List.Item>}
                        <List.Item onClick={goInvite}>
                            通过邀请码激活
                        </List.Item>
                        {
                            (userR.tasks?.achieving?.length ||
                                userR.tasks?.newAchieved?.length || userR.tasks?.oldAchieved?.length
                            ) ?
                                <List.Item onClick={goTasks}>
                                    <Badge content={userR.unexchangede ? userR.unexchangede : null}>
                                        通过任务激活
                                    </Badge>
                                </List.Item> : null
                        }
                    </List>
                </>
            ),
            closeOnMaskClick: true,
        });
    }, [checkAuth, goInvite, goTasks, userR.auth, userR.serialCode, userR.tasks?.achieving?.length, userR.tasks?.newAchieved?.length, userR.tasks?.oldAchieved?.length, userR.unexchangede]);

    const onPlay = useCallback(
        () => {
            if (!userR.auth) {
                Toast.show("请先激活产品")
                checkAuth();
                return;
            }
            if (selected.length <= 1) {
                Toast.show("请先选择图片")
                return;
            }
            if (duration <= 0) {
                Toast.show("请先选择速写时间")
                return;
            }
            navigator("/view")
        },
        [checkAuth, duration, navigator, selected.length, userR.auth],
    );

    const onAct = useCallback(
        () => {
            Dialog.show({
                title: <div>通过邀请码激活<div style={{ fontSize: "12px", color: "var(--adm-color-light)", fontWeight: "normal"}}>前往达文西Art小程序</div></div>,
                content: <div style={{ textAlign: "center" }}>
                    <img width={"80%"} src="./entrance/sinvite.png" />
                    <br /><br />
                    <Button block onClick={Dialog.clear}>取消</Button>
                </div>,
            });
        },
        [],
    );

    return (
        <>
            <Space
                block
                direction="vertical"
                align="center"
                justify="between"
                className={s.root}
            >
                <div className={s.top}>
                    <Swiper className={s.swp} autoplay loop >
                        {[img, img3, img4, img5, img6, img7, img8].map((item, index) => (
                            <Swiper.Item key={index} className={s.switem}>
                                <Image className={s.imgs} src={item} fit="cover" />
                            </Swiper.Item>
                        ))}
                    </Swiper>
                    <Space
                        className={s.head}
                        direction="vertical"
                        justify="center"
                        align="center"
                    >
                        <span className={s.info}>
                            {selected.length ? (
                                <>
                                    速写预计持续
                                    {dayjs
                                        .duration(
                                            dayjs()
                                                .add(duration * selected.length, "second")
                                                .diff(dayjs())
                                        )
                                        .format("HH时mm分ss秒")}
                                </>
                            ) : null}
                        </span>
                        <Space className={s.nav} block justify="around">
                            <SetDuration>
                                <Badge
                                    content={
                                        duration
                                            ? `${Math.floor(duration / 60)}分${duration % 60}秒`
                                            : null
                                    }
                                >
                                    <Button className={s.button} shape="rounded" color="primary">
                                        <ClockCircleOutline fontSize={20} />
                                    </Button>
                                </Badge>
                            </SetDuration>
                            <Badge content={selected.length || null}>
                                <Button
                                    className={s.button}
                                    shape="rounded"
                                    color="primary"
                                    onClick={() => navigator("/list")}
                                >
                                    <PictureWrongOutline fontSize={20} />
                                </Button>
                            </Badge>
                            <Button
                                className={s.button}
                                shape="rounded"
                                color={selected.length && userR.auth && duration ? "danger" : "primary"}
                                onClick={onPlay}
                            >
                                <PlayIcon fontSize={20} />
                            </Button>
                        </Space>
                    </Space>
                </div>

                <footer style={{ paddingBottom: "50Px", textAlign: "center" }}>
                    <Space block >
                        <span onClick={showUser}><UserOutline /> {!userR.auth ? "序列号激活" : "个人中心"} </span>
                        <span onClick={onAct}><KeyOutline /> 我有邀请码 </span>
                        <span onClick={() => setVhelp(true)}>
                            <QuestionCircleOutline /> 如何使用
                        </span>
                    </Space>

                </footer>
            </Space>
            <HelpPopup visible={vhelp} onEnded={() => setVhelp(false)} />
        </>
    );
};

export default Home;
