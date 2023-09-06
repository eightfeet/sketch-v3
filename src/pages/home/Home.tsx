import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Swiper, Image } from 'antd-mobile';
import { useSnapshot } from 'valtio';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { runningTime } from '~/store';
import { ClockCircleOutline, PictureWrongOutline, QuestionCircleOutline } from 'antd-mobile-icons';
import PlayIcon from '~/compontents/PlayIcon';
import img from "./show.jpeg";
import img3 from "./show3.jpeg";
import img4 from "./show4.jpeg";
import img5 from "./show5.jpeg";
import img6 from "./show6.jpeg";
import img7 from "./show7.jpeg";
import img8 from "./show8.jpeg";

import s from './Home.module.scss';


dayjs.extend(duration)

interface Props {
    name?: string
}

const Home: React.FC<Props> = ({ name = "home" }) => {
    useDocumentTitle(name)
    const { selected = [], duration = 0 } = useSnapshot(runningTime);
    const navigator = useNavigate();

    return (
        <Space block direction="vertical" align="center" justify="around" className={s.root} >
            <div className={s.top}>
                <Swiper className={s.swp} autoplay>
                    {
                        [img, img3, img4, img5, img6, img7, img8].map((item, index) => <Swiper.Item  key={index}>
                            <Image className={s.imgs} src={item} fit="cover" />
                        </Swiper.Item>
                        )
                    }
                </Swiper>
                <Space className={s.head} direction="vertical" justify="center" align="center">
                    <span className={s.info}>
                        {
                            selected.length ? <>
                                速写预计持续
                                {
                                    dayjs
                                        .duration(
                                            dayjs()
                                                .add(duration * selected.length, "second")
                                                .diff(dayjs())
                                        )
                                        .format("HH时mm分ss秒")
                                }
                            </> : null
                        }
                    </span>
                    <Space className={s.nav} block justify="around" >
                        <Button className={s.button} shape="rounded" color="primary" onClick={() => navigator("/list")}>
                            <ClockCircleOutline fontSize={26} />
                        </Button>
                        <Button className={s.button} shape="rounded" color="primary" onClick={() => navigator("/list")}>
                            <PictureWrongOutline fontSize={26} />
                        </Button>
                        <Button className={s.button} shape="rounded" color="primary" onClick={() => navigator("/view")}>
                            <PlayIcon fontSize={26} />
                        </Button>
                    </Space>
                </Space>
            </div>
            <footer style={{ paddingBottom: "24Px" }}>
                达文西Art-sketch <QuestionCircleOutline />
            </footer>
        </Space>
    )
}

export default Home;