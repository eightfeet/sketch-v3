import React, { useCallback, useRef, useState } from "react";
import Canvas from "./Canvas";
import Eraser from "./Icons/Eraser";
import Pen from "./Icons/Pen";
import Fill from "./Icons/Fill";
import s from "./Painter.module.scss";
import Clear from "./Icons/Clear";
import ColorAndAlph from "./ColorAndAlph";
import Undo from "./Icons/Undo";
import Redo from "./Icons/Redo";
import Close from "./Icons/Close";
import { PlayOutline } from "antd-mobile-icons";
import { sleep } from "~/core/helper";
import PainterModel from "./PainterModel/PainterModel";
import { Save } from "./Icons/Save";
import { useDeviceDetect } from "./useDeviceDetect";

interface changeProps {
  color?: string;
  alph?: number;
  size?: number;
}

export interface onChangeParams {
  lineColor?: string;
  lineWidth?: number;
  eraserWidth?: number;
  bgColor?: string;
  bgAlph?: number;
  eraserAlph?: number;
  lineAlph?: number;
}

interface Props {
  visible?: boolean;
  onClose?: () => void;
  onChange?: (data: onChangeParams) => void;
  lineColor?: string;
  lineWidth?: number;
  eraserWidth?: number;
  bgAlph?: number;
  bgColor?: string;
  eraserAlph?: number;
  lineAlph?: number;
  historyRecords?: number;
  auth?: boolean;
}

const isDev = import.meta.env.DEV;
const saveScale = 2;

const Painter: React.FC<Props> = ({
  visible,
  onClose,
  lineColor = "#ff0000",
  lineWidth = 2,
  eraserWidth = 2,
  bgColor = "#ffffff",
  bgAlph = 0,
  onChange,
  eraserAlph = 50,
  lineAlph = 50,
  historyRecords = 1000,
  auth = false
}) => {
  const [currentMode, setCurrentMode] = useState<"pen" | "eraser" | "fill">();
  const canvasRef = useRef<HTMLCanvasElement>();
  const [undoStack, setUndoStack] = useState<HTMLImageElement[]>([]);
  const [redoStack, setRedoStack] = useState<HTMLImageElement[]>([]);
  const [showClean, setShowClean] = useState(false);
  const count = useRef(0);
  const logo192 = useRef<HTMLImageElement>(null);
  const paperwhiteRef = useRef<HTMLImageElement>(null);
  
  const currentStatus = useRef<"draw" | "undo" | "redo">("draw");
  const viewRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetect()

  const handleView = useCallback((img: HTMLImageElement) => {
    if (!isDev) return;
    if (viewRef.current) {
      viewRef.current.innerHTML = "";
      viewRef.current.append(img);
    }
  }, []);

  const handletestSel = useCallback(
    (index: number, type: "undo" | "redo") => {
      const img = type === "undo" ? undoStack[index] : redoStack[index];
      handleView(img);
    },
    [handleView, redoStack, undoStack]
  );

  const getCanvas = useCallback((cvs: HTMLCanvasElement) => {
    canvasRef.current = cvs;
  }, []);

  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const onChangeBg = useCallback(
    ({ color, alph }: changeProps) => {
      onChange?.({ bgAlph: alph, bgColor: color });
    },
    [onChange]
  );

  const onChangePen = useCallback(
    ({ color, alph, size }: changeProps) => {
      onChange?.({ lineAlph: alph, lineColor: color, lineWidth: size });
    },
    [onChange]
  );

  const onChangeEraser = useCallback(
    ({ size, alph }: changeProps) => {
      onChange?.({ eraserAlph: alph, eraserWidth: size });
    },
    [onChange]
  );

  const onChangeMode = useCallback(
    (mode: "pen" | "eraser" | "fill") => {
      if (currentMode === mode) {
        setCurrentMode(undefined);
      } else {
        setCurrentMode(mode);
      }
    },
    [currentMode]
  );

  const getDataUrlToImg = useCallback((canvas: HTMLCanvasElement) => {
    const dataurl = canvas?.toDataURL();
    const img = new Image();
    img.src = dataurl;
    img.alt = `${count.current}`;
    return img;
  }, []);

  const handleRecord = useCallback(
    (cvs?: HTMLCanvasElement) => {
      if (!cvs) return;
      const img = getDataUrlToImg(cvs);
      setUndoStack((undoStack) => [
        ...undoStack.slice(
          undoStack.length > historyRecords
            ? undoStack.length - historyRecords
            : 0,
          undoStack.length
        ),
        img,
      ]);
      setRedoStack([]);
      handleView(img);
    },
    [getDataUrlToImg, handleView, historyRecords]
  );

  const onStartDraw = useCallback(
    (canvas: HTMLCanvasElement) => {
      handleRecord(canvas);
    },
    [handleRecord]
  );

  const [lastImg, setLastImg] = useState<HTMLImageElement>();
  const onEndDraw = useCallback(
    (canvas: HTMLCanvasElement) => {
      count.current = count.current + 1;
      currentStatus.current = "draw";
      if (!canvas) return;
      const img = getDataUrlToImg(canvas);
      setLastImg(img);
      setRedoStack([img]);
    },
    [getDataUrlToImg]
  );

  const clean = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 10000, 10000);
  }, []);

  const drawImg = useCallback(
    (img: HTMLImageElement) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !img) return;
      clean();
      ctx.globalAlpha = 1;
      ctx.drawImage(img, 0, 0);
      count.current = Number(img.alt);
    },
    [clean]
  );

  const splitRecords = useCallback((records: HTMLImageElement[]) => {
    const record = records.slice(records.length - 1, records.length)[0];
    const restRecords = records.slice(0, records.length - 1);
    return {
      record,
      restRecords,
    };
  }, []);

  const undo = useCallback(
    async (e: any) => {
      e.stopPropagation();
      const undoStackCopy = [...undoStack];
      currentStatus.current = "undo";
      const { record, restRecords } = splitRecords(undoStackCopy);
      if (!record) return;
      setUndoStack([...restRecords]);
      setRedoStack([record, ...redoStack]);
      drawImg(record);
    },
    [drawImg, redoStack, splitRecords, undoStack]
  );

  const redo = useCallback(
    (e: any) => {
      e.stopPropagation();
      currentStatus.current = "redo";
      const record = redoStack[0];
      const restRecords = redoStack.slice(1, redoStack.length);
      if (!record) return;
      setRedoStack([...restRecords]);
      setUndoStack([...undoStack, record]);
      drawImg(record);
    },
    [drawImg, redoStack, undoStack]
  );

  const [showPlayer, setShowPlayer] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<number | undefined>(200);
  const [isPlaying, setIsPlaying] = useState(false);
  const play = useCallback(async () => {
    setShowPlayer(false);
    setIsPlaying(true);
    drawImg(undoStack[1]);

    const playArray = [...undoStack];
    if (lastImg) {
      playArray.push(lastImg);
    }

    for (let index = 0; index < playArray.length; index++) {
      const eachone = playArray[index];
      drawImg(eachone);
      if (index === 0) {
        await sleep(1000);
      }
      await sleep(playSpeed);
      if (playArray.length === index + 1) {
        await sleep(1000);
        setIsPlaying(false);
      }
    }
  }, [drawImg, lastImg, playSpeed, undoStack]);
  const onPlay = useCallback(() => {
    setShowPlayer(true);
  }, []);

  const handleClean = useCallback(() => {
    setShowClean(true);
  }, []);

  const onClean = useCallback(() => {
    clean();
    setUndoStack([]);
    setRedoStack([]);
    setShowClean(false);
  }, [clean]);

  const [showSave, setShowSave] = useState(false);
  const [saveImg, setSaveImg] = useState<string>();
  const saveCanvasRef = useRef<HTMLCanvasElement>(null);
  const onSave = useCallback(async () => {
    if (!lastImg) return;
    
    setShowSave(true);
    const ctx = saveCanvasRef.current?.getContext("2d");
    
    if (!ctx) return;
    ctx.fillStyle = bgColor;
    ctx.fillRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    if (paperwhiteRef.current) {
      ctx.drawImage(paperwhiteRef.current, 0, 0);
    }
    if (logo192.current && !auth) {
      ctx.drawImage(logo192.current, 10, 10);
    }
    ctx.scale(saveScale,saveScale);
    ctx.drawImage(lastImg, 0, 0);
    setSaveImg(saveCanvasRef.current?.toDataURL());
  }, [auth, bgColor, lastImg]);

  return (
    <div className={s.root} style={{ display: visible ? "block" : "none" }}>
      {!isPlaying ? (
        <div className={s.toolbar}>
          <div className={s.switch}>
            <div className={`${s.icon}`} onClick={close}>
              <Close />
            </div>
            <div
              className={`${s.icon} ${currentMode === "pen" ? s.iconact : ""}`}
              onClick={() => onChangeMode("pen")}
            >
              <Pen />
            </div>
            <div
              className={`${s.icon} ${
                currentMode === "eraser" ? s.iconact : ""
              }`}
              onClick={() => onChangeMode("eraser")}
            >
              <Eraser />
            </div>
            <div
              className={`${s.icon} ${currentMode === "fill" ? s.iconact : ""}`}
              onClick={() => onChangeMode("fill")}
            >
              <Fill />
            </div>
            <div
              style={{ opacity: undoStack.length ? 1 : 0.2 }}
              className={`${s.icon}`}
              onClick={undo}
            >
              <Undo />
            </div>
            <div
              style={{ opacity: redoStack.length >= 1 ? 1 : 0.2 }}
              className={`${s.icon}`}
              onClick={redo}
            >
              <Redo />
            </div>
            <div
              style={{ opacity: undoStack.length >= 1 ? 1 : 0.2 }}
              className={`${s.icon}`}
              onClick={onPlay}
            >
              <PlayOutline />
            </div>
            <div
              style={{ opacity: undoStack.length >= 1 ? 1 : 0.2 }}
              className={`${s.icon}`}
              onClick={onSave}
            >
              <Save />
            </div>
            <div className={`${s.icon}`} onClick={handleClean}>
              <Clear />
            </div>
          </div>
          <div className={s.handlebar}>
            {currentMode === "pen" ? (
              <div className={s.setbar}>
                <ColorAndAlph
                  color={lineColor}
                  size={lineWidth}
                  alph={lineAlph}
                  onChange={onChangePen}
                />
              </div>
            ) : null}
            {currentMode === "eraser" ? (
              <div className={s.setbar}>
                <ColorAndAlph
                  size={eraserWidth}
                  alph={eraserAlph}
                  onChange={onChangeEraser}
                />
              </div>
            ) : null}
            {currentMode === "fill" ? (
              <div className={s.setbar}>
                <ColorAndAlph
                  color={bgColor}
                  alph={bgAlph}
                  onChange={onChangeBg}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <PainterModel
        maskStyle={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        visiable={showSave}
        title= {isMobile ? "长按保存到相册" : "右键保存图片"}
        cancelText="关闭"
        onCancel={() => setShowSave(false)}
      >
        <div className={s.saveimgbox}>
          <img src={saveImg} alt="t" />
        </div>
      </PainterModel>
      <PainterModel
        visiable={showPlayer}
        title="记录回放"
        onOk={play}
        onCancel={() => setShowPlayer(false)}
      >
        <div className={s.playcontent}>
          <label>播放速度</label>
          <input
            value={playSpeed}
            min="1"
            max="2000"
            type="number"
            onChange={(val) =>
              setPlaySpeed(Number(val.target.value) || undefined)
            }
          />
          <span>毫秒</span>
        </div>
      </PainterModel>
      {isPlaying ? (
        <div className={s.playmask}>
          {/* <span
            className={s.icon}
            onClick={() => {
              setIsPlaying(false);
            }}
          >
            <Stop />
          </span> */}
        </div>
      ) : null}
      <PainterModel
        visiable={showClean}
        title="清除画布"
        onOk={onClean}
        onCancel={() => setShowClean(false)}
      />
      {isDev && (
        <div className={s.viewwrap}>
          <div className={s.sel}>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handletestSel(Number(e.target.value), "undo")
              }
            >
              <option>undo</option>
              {undoStack.map((item, index) => (
                <option value={index} key={index}>
                  {index}
                </option>
              ))}
            </select>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handletestSel(Number(e.target.value), "redo")
              }
            >
              <option>redo</option>
              {redoStack.map((item, index) => (
                <option value={index} key={index}>
                  {index}
                </option>
              ))}
            </select>
          </div>
          <div ref={viewRef} className={s.blocktest}></div>
        </div>
      )}
      <Canvas
        lineColor={lineColor}
        eraser={currentMode === "eraser"}
        lineWidth={lineWidth}
        lineAlph={lineAlph}
        eraserWidth={eraserWidth}
        bgColor={bgColor}
        bgAlph={bgAlph}
        eraserAlph={eraserAlph}
        onStartDraw={onStartDraw}
        onEndDraw={onEndDraw}
        getCanvas={getCanvas}
      />
      {
        <canvas
          key={lastImg?.src}
          width={window.innerWidth*saveScale}
          height={window.innerHeight*saveScale}
          ref={saveCanvasRef}
          className={s.savecvs}
        ></canvas>
      }
      <div className={s.logo}>
        <img ref={logo192} src="./entrance/masklogo.png" alt="logo" />
        <img ref={paperwhiteRef} src="./entrance/white_paper.jpg"alt="bg" />
      </div>
    </div>
  );
};

export default Painter;
