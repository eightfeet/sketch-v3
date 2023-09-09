import React, { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { Button, Space, Swiper, Image, Badge } from "antd-mobile";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { runningTime } from "~/store";
import {
    ClockCircleOutline,
    PictureWrongOutline,
    QuestionCircleOutline,
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

dayjs.extend(duration);

interface Props {
    name?: string;
}

const Home: React.FC<Props> = ({ name = "达文西Sketch" }) => {
    useDocumentTitle(name);
    const { selected = [], duration = 0 } = useSnapshot(runningTime);
    const [vhelp, setVhelp] = useState(false);
    const navigator = useNavigate();

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
                                color="primary"
                                onClick={() => navigator("/view")}
                            >
                                <PlayIcon fontSize={20} />
                            </Button>
                        </Space>
                    </Space>
                    <div onClick={() => navigator("invite")}>a</div>
                    <div onClick={() => navigator("tasks")}>b</div>
                </div>
                <footer style={{ paddingBottom: "50Px" }}>
                    <span onClick={() => setVhelp(true)}>
                        达文西Art-sketch <QuestionCircleOutline />
                    </span>
                </footer>
            </Space>
            <HelpPopup visible={vhelp} onEnded={() => setVhelp(false)} />
        </>
    );
};

export default Home;
