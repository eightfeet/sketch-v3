import React, { useState } from "react";
import "wc-waterfall";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { Button, Image, JumboTabs, NavBar, Popup } from "antd-mobile";
import { CheckCircleFill } from "antd-mobile-icons";
import s from "./List.module.scss";
import { useMediaQuery } from "~/hooks/useMediaQuery";
// import loading from '~/compontents/Loading';

interface Props {
    name?: string;
}

const List: React.FC<Props> = ({ name = "list" }) => {
    useDocumentTitle(name);
    const [popupVisible, setPopupVisible] = useState(false)
    const matches768 = useMediaQuery('(min-width: 768px)');
    const matches1024 = useMediaQuery('(min-width: 1024px)');
    const mainwf = { cols: 3, gap: 10 }
    const displaywf = { cols: 4, gap: 10 }
    if (matches768) { mainwf.cols = 6; displaywf.cols = 12; }
    if (matches1024) { mainwf.cols = 8; displaywf.cols = 14; }

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const selected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const tags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    // loading.show()
    return (
        <div className={s.root}>
            <div className={s.nav}>
                <NavBar onBack={() => { }} right={
                    <>
                        <Button fill="none" size="mini" onClick={() => setPopupVisible(true)}>已选</Button>
                    </>
                }>标题</NavBar>
                <JumboTabs className={s.subnav} defaultActiveKey='1'>
                    {
                        tags.map(item => <JumboTabs.Tab title={null} description='描述文案' key={item} />)
                    }
                </JumboTabs>
            </div>

            <wc-waterfall {...mainwf}>
                {data.map((item) => (
                    <div key={item} className={s.img_box} onClick={() => console.log(item)}>
                        <div className={s.content}>
                            <Image
                                className={s.imgcove}
                                src=""
                                fit="fill"
                                style={{
                                    background: "#eee",
                                    minHeight: Math.floor(Math.random() * (300 - 100) + 100),
                                }}
                            />
                        </div>
                        <CheckCircleFill className={s.icon} />
                    </div>
                ))}
            </wc-waterfall>
            <Popup
                visible={popupVisible}
                onMaskClick={() => {
                    setPopupVisible(false)
                }}
                onClose={() => {
                    setPopupVisible(false)
                }}
                bodyStyle={{ height: '40vh', overflowY: "auto" }}
            >
                <div className={s.pupup}>
                    <wc-waterfall {...displaywf}>
                        {
                            selected.map((item) => (
                                <div key={item} className={s.img_box} onClick={() => console.log(item)}>
                                    <div className={s.content}>
                                        <Image
                                            className={s.imgcove}
                                            src=""
                                            fit="fill"
                                            style={{
                                                background: "#eee",
                                                minHeight: Math.floor(Math.random() * (300 - 100) + 100),
                                            }}
                                        />
                                    </div>
                                    <CheckCircleFill className={s.icon} />
                                </div>
                            ))
                        }
                    </wc-waterfall>
                </div>
            </Popup>
        </div>
    );
};

export default List;
