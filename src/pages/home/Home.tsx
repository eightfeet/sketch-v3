import React, { useCallback, useRef, useState, useEffect } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { Button, Space, Swiper, Image, Badge, Dialog, List, Toast, Tag, Popover, ImageUploader, ImageUploadItem, Form } from "antd-mobile";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { runningTime, user } from "~/store";
import {
    AppstoreOutline,
    ClockCircleOutline,
    DeleteOutline,
    KeyOutline,
    PictureWrongOutline,
    PicturesOutline,
    QuestionCircleOutline,
    UserOutline,
} from "antd-mobile-icons";
import PlayIcon from "~/compontents/PlayIcon";

import s from "./Home.module.scss";
import SetDuration from "~/compontents/SetDuration";
import HelpPopup from "~/compontents/HelpPopup/HelpPopup";
import ClipBoard from "~/compontents/ClipBoard";
import Activation from "~/compontents/Activation";
import useAddWeChat from "~/hooks/useAddWeChat";
import { Action } from "antd-mobile/es/components/popover";
import { ImageItem } from "../list/List";
import { IconMD } from "~/compontents/IconMD";
import { CloudKeys, cloudFunction } from "~/core/cloud";
import loading from "~/compontents/Loading";
import Img from "./Img";

dayjs.extend(duration);

const images = [
    's1.jpg', 's2.jpg', 's3.jpg', 's4.jpg', 's5.jpg',
    's6.jpg', 's7.jpg', 's8.jpg', 's9.jpg', 's10.jpg',
    's11.jpg', 's12.jpg', 's13.jpg', 's14.jpg', 's15.jpg',
]


function getRandomUniqueElements<T>(arr: T[], count: number): T[] {
    if (count > arr.length) {
        throw new Error('Count exceeds array length');
    }

    const result: T[] = [];
    const pickedIndices: number[] = [];

    while (result.length < count) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        if (!pickedIndices.includes(randomIndex)) {
            pickedIndices.push(randomIndex);
            result.push(arr[randomIndex]);
        }
    }
    return result;
}

const imagesUse = getRandomUniqueElements(images, 5);

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
        const days = dayjs(userR.serialCode?.end_at).diff(dayjs(), "day");
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
                                            有效期至：<div>{dayjs(end_at).format("YYYY-MM-DD HH:mm:ss")}{days <= 0 ? <span style={{ color: "red" }}>【过期】</span> : null}</div>
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
            // if (!userR.auth) {
            //     Toast.show("请先激活产品")
            //     checkAuth();
            //     return;
            // }
            if (selected.length < 1) {
                Toast.show("请先选择图片")
                return;
            }
            if (duration <= 0) {
                Toast.show("请先选择速写时间")
                return;
            }
            navigator("/view")
        },
        [duration, navigator, selected.length],
    );

    const onAct = useCallback(
        () => {
            Dialog.show({
                title: <div>通过邀请码激活<div style={{ fontSize: "12px", color: "var(--adm-color-light)", fontWeight: "normal" }}>前往达文西Art小程序</div></div>,
                content: <div style={{ textAlign: "center" }}>
                    <img width={"80%"} src="./entrance/sinvite.png" />
                    <br /><br />
                    <Button block onClick={Dialog.clear}>取消</Button>
                </div>,
            });
        },
        [],
    );

    // const [fileList, setFileList] = useState<ImageUploadItem[]>([])

    const fileList = useRef<ImageUploadItem[]>([]);


    const handleLocalImg = useCallback(
        async (file: File) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const res: ImageItem = await new Promise((resolve) => {
                reader.onload = (e: any) => {
                    resolve({
                        url: e.target.result,
                        poses_id: `${Date.now() * Math.random()}`,
                        poses_name: `${Date.now()}`,
                        categroy: "",
                        sub: [],
                        gender: "1",
                        _id: "album"
                    })
                }
            });
            return res
        },
        [],
    )

    const form = Form.useForm()[0];
    const memoizedCallback = useCallback(
        () => {
            try {
                const newData: any[] = form.getFieldValue("localselected");
                runningTime.selected = [
                    ...runningTime.selected || [] as any,
                    ...newData || []];
                form.setFieldValue("localselected", [])
            } catch (error) {
                console.error(error)
            }
            Dialog.clear();
        },
        [form],
    );


    const getGallery = useCallback(
        () => {
            Dialog.show({
                title: "从本地相册中选择",
                content: <>
                    <Form form={form}>
                        <Form.Item name="localselected" style={{ padding: 0, margin: 0 }} >
                            <ImageUploader
                                style={{ '--cell-size': '61px' }}
                                value={fileList.current}
                                upload={handleLocalImg}
                                multiple
                            />
                        </Form.Item>
                    </Form>
                    <br />
                    <Button block color="primary" onClick={memoizedCallback}>确定</Button>
                </>
            })
        },
        [form, handleLocalImg, memoizedCallback],
    )


    const selectPicture = useCallback(
        (node: Action) => {
            // 相册
            if (node.key === "gallery") {
                navigator("/list")
            }
            if (node.key === "album") {
                getGallery();
            }
            if (node.key === "clear") {
                runningTime.selected = []
            }
        },
        [getGallery, navigator],
    )

    const goToMD = useCallback(
        () => {
            Dialog.confirm({
                title: <IconMD width={60} />,
                content: <Space block align="center" direction="vertical" style={{ width: "100%" }}>
                    <div>即将前往模型工具 <b>达文西Art-Model</b></div>
                </Space>,
                onConfirm() {
                    window.location.href = `${import.meta.env.VITE_APP_MODELURL}${userR.auth ? `?member_id=${userR.member_id}&token=${userR.token}` : ''}`
                },
            });
        },
        [userR.auth, userR.member_id, userR.token],
    );


    const { complete_learning = [] } = userR.info || {};
    useEffect(() => {
        console.log(userR);

        if (userR.info && !complete_learning?.includes(2)) {
            setVhelp(true)
        }
    }, [complete_learning, userR.info, userR])

    const onLearning = useCallback(
        async () => {
            if (!complete_learning.includes(2)) {
                loading.show();
                const { code, data, msg } = await cloudFunction(CloudKeys.更新会员, {
                    complete_learning: [...complete_learning, 2],
                    member_id: userR.member_id
                })
                if (code === 200) {
                    user.info = data;
                } else {
                    console.error(msg || "创建学习记录失败");
                }
                loading.hide()
            }
            setVhelp(false);
        },
        [complete_learning, userR.member_id],
    )

    


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
                    <Swiper className={s.swp} autoplay={false} loop indicator={() => <></>} >
                        {imagesUse.map((item, index) => (
                            <Swiper.Item key={index} className={s.switem}>
                                <Img src={item} />
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
                                <Popover.Menu
                                    actions={[
                                        // { key: 'gallery', icon: <AppstoreOutline />, text: '图库' },
                                        { key: 'album', icon: <PicturesOutline />, text: '选择图片' },
                                        { key: 'clear', icon: <DeleteOutline />, text: '清空已选' }
                                    ]}
                                    placement='bottom-start'
                                    onAction={selectPicture}
                                    trigger='click'
                                >
                                    <Button
                                        className={s.button}
                                        shape="rounded"
                                        color="primary">
                                        <PictureWrongOutline fontSize={20} />
                                    </Button>
                                </Popover.Menu>
                                {/* <Button
                                    className={s.button}
                                    shape="rounded"
                                    color="primary"
                                    onClick={() => navigator("/list")}
                                >
                                    <PictureWrongOutline fontSize={20} />
                                </Button> */}
                            </Badge>
                            <Button
                                className={s.button}
                                shape="rounded"
                                color={selected.length && duration ? "danger" : "primary"}
                                onClick={onPlay}
                            >
                                <PlayIcon fontSize={20} />
                            </Button>
                        </Space>
                    </Space>
                </div>

                <footer style={{ paddingBottom: "50Px", textAlign: "center" }}>
                    <Space block >
                        {/* <span onClick={showUser}><UserOutline /> {!userR.auth ? "序列号激活" : "个人中心"} </span>
                        <span onClick={onAct}><KeyOutline /> 我有邀请码 </span> */}
                        <span onClick={() => setVhelp(true)}>
                            <QuestionCircleOutline /> 如何使用
                        </span>
                        <span onClick={goToMD} >
                            <IconMD width={13} /> 模型库
                        </span>
                    </Space>

                </footer>
            </Space>
            <HelpPopup visible={vhelp} onEnded={onLearning} />
        </>
    );
};

export default Home;
