import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CanvasDraw from "./Drawer";
import s from './DrawingBoard.module.scss';
import { painter as store } from "~/store";
import { Space, Stepper } from 'antd-mobile';
import Pen from './Icons/Pen';
import classNames from 'classnames';
import Delete from './Icons/Delete';
import Saves from './Icons/Save';
import Undo from './Icons/Undo';
import Close from './Icons/Close';
import Color from './Icons/Color';
import Play from './Icons/Play';
import Stop from './Icons/Stop';
import { ColorResult, SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import { useDebounce } from 'use-debounce';
import { Environment, environment } from '~/core/helper';
import Curve from './Icons/Curve';
import Straight from './Icons/Straight';

interface Props {
    visible?: boolean
    bgimg?: { url: string },
    imgDOMRect?: DOMRect
}

const LOCALITEMNAME = 'dwxSavedDrawing';
const DrawingBoard: React.FC<Props> = ({ visible, bgimg, imgDOMRect }) => {
    const storeR = useSnapshot(store);
    const [shoot, setShoot] = useState<string>();
    const painter = useRef<any>();
    const saveCanvasRef = useRef<HTMLCanvasElement>(null);
    const imageContentRef = useRef<HTMLDivElement>(null);
    const imgSaved = useRef<string>();
    const [player, setPlayer] = useState(false);
    const getDataUrlToImg = useCallback((canvas: HTMLCanvasElement) => {
        const dataurl = canvas?.toDataURL();
        const img = new Image();
        img.src = dataurl;
        return img;
    }, []);
    // 保存图片
    const onSave = useCallback(async (alph?: boolean) => {
        if (!saveCanvasRef.current) return;
        const ctx = saveCanvasRef.current?.getContext("2d");
        if (!ctx) return;
        let Width = window.innerWidth;
        let Height = window.innerHeight;
        saveCanvasRef.current.width = Width;
        saveCanvasRef.current.height = Height;

        const gridCvs = painter.current?.canvas.grid;
        const drawCvs = painter.current?.canvas.drawing;
        const gridImg = getDataUrlToImg(gridCvs);
        const drwaImg = getDataUrlToImg(drawCvs);

        imageContentRef.current?.appendChild(gridImg);
        gridImg.onload = () => {
            if (alph !== true) {
                ctx.drawImage(gridImg, 0, 0);
            }
            imageContentRef.current?.appendChild(drwaImg);
            drwaImg.onload = async () => {
                ctx.drawImage(drwaImg, 0, 0);
                imgSaved.current = saveCanvasRef.current!.toDataURL();
                const env = await environment();
                if (env === Environment.Wechat || env === Environment.MiniProgram) {
                    setShowSave(true);
                    return;
                }
                const link = document.createElement('a')
                link.setAttribute('download', `dwx_${Date.now()}.png`)
                link.setAttribute('href', imgSaved.current);
                imageContentRef.current?.appendChild(link);
                link.click()
                link.onerror = () => {
                    setShowSave(true);
                }
                imageContentRef.current?.removeChild(gridImg);
                imageContentRef.current?.removeChild(drwaImg);

            }
        }
    }, [getDataUrlToImg]);

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                const isDataImage = bgimg?.url.indexOf("data:image") === -1;
                const url = `${isDataImage ? import.meta.env.VITE_APP_POSESURL : ''}${bgimg?.url}`
                if (isDataImage) {
                    setShoot(url)
                } else {
                    const img = new Image();
                    img.onload = function () {
                        setShoot(url)
                    }
                    img.src = url;
                }
            }, 50);
        }
        return () => {
            setShoot('')
        }
    }, [bgimg?.url, visible])



    const saveHistory = useCallback(
        () => {
            localStorage.setItem(
                LOCALITEMNAME,
                painter.current?.getSaveData()
            );
        },
        [],
    );

    const playStep = useCallback(
        () => {
            setPlayer(true)
            painter.current?.loadSaveData(
                localStorage.getItem(LOCALITEMNAME)
            );
        },
        [],
    );

    const [showColor, setShowColor] = useState(false);
    const [color, setColor] = useState(storeR.lineColor);
    const [debounceColor] = useDebounce(color, 1000);
    useMemo(() => {
        store.lineColor = debounceColor;
    }, [debounceColor])

    const handleColor = useCallback(
        () => {
            setShowColor(true);
        },
        [],
    );

    const handleChangeColor = useCallback(
        (e: ColorResult) => {
            const { r, g, b, a } = e.rgb
            const res = `rgba(${r},${g},${b},${a})`;
            setColor(res)
        },
        [],
    );

    const [lineWidth, setLineWidth] = useState<number>(storeR.lineWidth || 1);
    const [showLine, setShowLine] = useState(false);
    const [debounceLineWidth] = useDebounce(lineWidth, 1000);
    useMemo(() => {
        store.lineWidth = Number(debounceLineWidth) || 0;
    }, [debounceLineWidth])
    const handleLineWidth = useCallback(
        () => {
            setShowLine(true)
        },
        [],
    );

    const handleClose = useCallback(
        () => {
            // 关闭画板
            store.showPanter = false;
            setPlayer(false);
            setShowColor(false);
            localStorage.removeItem(LOCALITEMNAME)
        },
        [],
    );

    const [showSave, setShowSave] = useState(false);

    const [longTouchTime, setLongTouchTime] = useState(0);
    const onChackLongTouch = useCallback(
        () => {
            const lastTime = Date.now() - longTouchTime;
            if (lastTime >= 2000) {
                onSave(true)
            }
        },
        [longTouchTime, onSave],
    );
    const [straight, setStraight] = useState(false);
    if (!visible) return null;
    return (
        <div className={s.root}>
            <div className={s.toolbar}>
                <div className={s.btns}>
                    <div
                        className={classNames(s.block)}
                        onClick={() => setStraight(v => !v)}
                    >
                        {!straight ? <Curve />
                            : <Straight />}
                    </div>
                    <div
                        className={classNames(s.block)}
                        onClick={handleLineWidth}
                    >
                        <Pen /> &nbsp; <span>{storeR.lineWidth}</span>
                    </div>
                    <div
                        className={classNames(s.block)}
                        onClick={handleColor}
                        style={{ color: storeR.lineColor }}
                    >
                        <Color />
                    </div>
                    <div
                        className={classNames(s.block)}
                        onClick={() => painter.current?.undo()}
                    >
                        <Undo />
                    </div>
                    <div
                        className={classNames(s.block, { [s.act]: false })}
                        onClick={playStep}
                    >
                        <Play />
                    </div>
                    {/* {
                            !player ?
                                <div
                                    className={classNames(s.block, { [s.act]: false })}
                                    onClick={playStep}
                                >
                                    <Play />
                                </div> 
                                :
                                <div
                                    className={classNames(s.block)}
                                    style={{ color: 'red' }}
                                    onClick={() => setPlayer(false)}
                                >
                                    <Stop />
                                </div>
                        } */}
                    <div
                        className={classNames(s.block, { [s.act]: false })}
                        onClick={() => onSave()}
                    // onClick={handleSave}
                    >
                        <Saves />
                    </div>
                    <div
                        className={classNames(s.block, { [s.act]: false })}
                        onClick={() => painter.current?.eraseAll()}
                    >
                        <Delete />
                    </div>

                    <div
                        className={classNames(s.block, { [s.act]: false })}
                        onClick={handleClose}
                    >
                        <Close />
                    </div>
                    <div
                        className={classNames(s.block, { [s.act]: false })}
                        style={{ opacity: 0 }}
                        onPointerDown={() => setLongTouchTime(Date.now())}
                        onPointerUp={onChackLongTouch}
                    >
                        <Saves />
                    </div>
                </div>

            </div>
            {showColor ? <div className={s.colorPick} onClick={() => setShowColor(false)}>
                <div onClick={e => e.stopPropagation()}>
                    <SketchPicker
                        color={color}
                        onChangeComplete={handleChangeColor}
                    />
                </div>
            </div> : null}
            {
                showLine ? <div className={s.linewidthPick} onClick={() => setShowLine(false)}>
                    <Space block onClick={e => e.stopPropagation()} style={{ maxWidth: "300" }} wrap>
                        <Stepper
                            defaultValue={1}
                            value={lineWidth}
                            onChange={value => setLineWidth(value)}
                            min={1}
                            max={100}
                        />
                    </Space>
                </div> : null
            }
            {
                showSave ? <div className={s.savebox} onClick={() => setShowSave(false)}>
                    <img onClick={e => e.stopPropagation()} src={imgSaved.current} alt="t" style={{ width: "80%", background: "#fff", display: 'block' }} />
                </div> : null
            }
            <CanvasDraw
                ref={painter}
                {...{
                    onChange: saveHistory,
                    loadTimeOffset: 5,
                    lazyRadius: storeR.lineWidth,
                    brushRadius: storeR.lineWidth,
                    brushColor: storeR.lineColor,
                    catenaryColor: "#0a0302",
                    // gridColor: "#9d9d9d",
                    backgroundColor: '#777',
                    hideGrid: true,
                    canvasWidth: window.innerWidth,
                    canvasHeight: window.innerHeight,
                    // disabled: player,
                    imgSrc: shoot,
                    saveData: undefined,
                    immediateLoading: false,
                    hideInterface: true,
                    gridSizeX: 25,
                    gridSizeY: 25,
                    gridLineWidth: 0.5,
                    gridColor: '#5e5e5e',
                    hideGridX: false,
                    hideGridY: false,
                    enablePanAndZoom: true,
                    clampLinesToDocument: false,
                    mouseZoomFactor: 0.01,
                    zoomExtents: { min: 0.3, max: 3 },
                    straight,
                    imgDOMRect
                }}
            />
            {
                <canvas
                    ref={saveCanvasRef}
                    className={s.savecvs}
                ></canvas>
            }
            <div ref={imageContentRef} className={s.imagecontent} />
        </div >
    )
}

export default DrawingBoard;