import React, { useCallback } from "react";
import s from "./ColorAndAlph.module.scss";

interface Props {
  alph?: number;
  size?: number;
  color?: string;
  onChange: (data: { alph?: number; color?: string; size?: number }) => void;
}

const ColorAndAlph: React.FC<Props> = ({ alph, color, size, onChange }) => {
  const onColor = useCallback(
    (e: any) => {
      const color = e.target.value;
      onChange?.({
        color,
      });
    },
    [onChange]
  );

  const onAlph = useCallback(
    (e: any) => {
      const alph = e.target.value;
      onChange?.({
        alph,
      });
    },
    [onChange]
  );

  const onSize = useCallback(
    (e: any) => {
      const size = e.target.value;
      onChange?.({
        size,
      });
    },
    [onChange]
  );

  return (
    <div className={s.wrap}>
      {color !== undefined && (
        <>
          <span className={s.ml}>颜色</span>
          <input
            className={s.color}
            type="color"
            value={color}
            onChange={onColor}
          />
        </>
      )}
      {size !== undefined && (
        <>
          <span className={s.ml}>粗细</span>
          <input
            className={s.slider}
            type="range"
            min="1"
            max="60"
            value={size}
            onChange={onSize}
          />
          <span className={s.sliderblock} style={{ width: "1.5rem" }}>
            ({size})
          </span>
        </>
      )}
      {alph !== undefined && (
        <>
          <span className={s.ml}>不透明度</span>
          <input
            className={s.slider}
            type="range"
            min="0"
            step={1}
            max="100"
            value={alph}
            onChange={onAlph}
          />
          <span className={s.block} style={{ width: "1.5rem" }}>
            ({alph})
          </span>
        </>
      )}
    </div>
  );
};

export default ColorAndAlph;
