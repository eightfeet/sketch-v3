import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Space } from 'antd-mobile';
import { useSnapshot } from 'valtio';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { runningTime } from '~/store';

dayjs.extend(duration)

interface Props {
    name?: string
}

const Home: React.FC<Props> = ({ name = "home" }) => {
    useDocumentTitle(name)
    const { selected = [], duration = 0 } = useSnapshot(runningTime);
    console.log(333, selected, duration);

    return (
        <Space block direction="vertical" align="center" justify="between" style={{ height: "100vh"}}>
            <Space style={{padding: "24Px" }} direction="vertical">
                <header>dwx-Art</header>
                <Space>
                    <Link to="/" >首页</Link>
                    <Link to="/list" >列表</Link>
                    <Link to="/view" >详情</Link>
                </Space>
            </Space>
            <footer style={{paddingBottom: "24Px" }}>
                {selected.length ? <>
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
                </> : "达文西Art-sketch"}
            </footer>
        </Space>
    )
}

export default Home;