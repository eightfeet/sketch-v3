import React, { useRef, useEffect } from "react";
import { hex2rgba } from "./help";

interface CanvasProps {
  lineColor: string;
  eraser: boolean;
  lineWidth: number;
  eraserWidth: number;
  bgColor?: string;
  bgAlph?: number;
  lineAlph?: number;
  eraserAlph?: number;
  onStartDraw?: (canvas: HTMLCanvasElement) => void;
  onEndDraw?: (canvas: HTMLCanvasElement) => void;
  getCanvas?: (canvas: HTMLCanvasElement) => void;
}

const isMobileDevice = typeof window.ontouchstart !== "undefined";
const dpr = window.devicePixelRatio || 1.0;
const Canvas: React.FC<CanvasProps> = ({
  lineColor = "#f00",
  eraser = false,
  eraserAlph = 100,
  lineWidth = 20,
  eraserWidth = 20,
  bgColor = "#fff",
  bgAlph = 100,
  lineAlph = 100,
  onStartDraw,
  onEndDraw,
  getCanvas,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      getCanvas?.(canvasRef.current);
      if (dpr !== 1.0) {
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.width = window.innerWidth * dpr;
        const ctx = canvasRef.current.getContext("2d");
        ctx?.scale(dpr, dpr)
      }
    }
  }, [getCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    
    const ctx = canvas.getContext("2d");

    let isDrawing = false;

    function startDraw(e: any) {
      e.preventDefault();
      let x = 0;
      let y = 0;
      if (isMobileDevice) {
        // 获取第一个触点的坐标
        x = e.touches[0].clientX - e.target.offsetLeft;
        y = e.touches[0].clientY - e.target.offsetTop;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      // 开始绘制
      isDrawing = true;
      onStartDraw?.(canvas!);
      ctx!.beginPath();
      ctx!.moveTo(x, y);
    }

    function stopDraw() {
      isDrawing = false;
      onEndDraw?.(canvas!)
    }

    function draw(e: any) {
      e.preventDefault();
      if (!isDrawing) {
        return;
      }
      if (eraser) {
        ctx!.globalCompositeOperation = "destination-out";
        ctx!.lineWidth = eraserWidth * dpr;
        ctx!.globalAlpha = (eraserAlph / 500) * 0.5;
      } else {
        ctx!.globalCompositeOperation = "source-over";
        ctx!.lineWidth = lineWidth * dpr;
        ctx!.strokeStyle = lineColor;
        ctx!.globalAlpha = (lineAlph / 500) * 0.5;
      }

      let x = 0;
      let y = 0;
      if (isMobileDevice) {
        // 获取第一个触点的坐标
        x = e.touches[0].clientX - e.target.offsetLeft;
        y = e.touches[0].clientY - e.target.offsetTop;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.lineTo(x, y);
      ctx!.stroke();
    }

    if (isMobileDevice) {
      canvas.addEventListener("touchstart", startDraw);
      canvas.addEventListener("touchend", stopDraw);
      canvas.addEventListener("touchmove", draw);
    } else {
      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mouseup", stopDraw);
      canvas.addEventListener("mousemove", draw);
    }

    return () => {
      if (isMobileDevice) {
        canvas.removeEventListener("touchstart", startDraw);
        canvas.removeEventListener("touchend", stopDraw);
        canvas.removeEventListener("touchmove", draw);
      } else {
        canvas.removeEventListener("mousedown", startDraw);
        canvas.removeEventListener("mouseup", stopDraw);
        canvas.removeEventListener("mousemove", draw);
      }
    };
  }, [lineColor, eraser, lineWidth, lineAlph, eraserWidth, eraserAlph, onStartDraw, onEndDraw]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ backgroundColor: hex2rgba(bgColor, bgAlph / 100) }}
    />
  );
};

export default Canvas;
