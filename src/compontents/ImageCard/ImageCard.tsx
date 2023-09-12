import React, { useCallback } from "react";
import s from "./ImageCard.module.scss";
import { CheckCircleFill, CloseCircleFill } from "antd-mobile-icons";
import { Image } from "antd-mobile";
import classNames from "classnames";

interface Props {
  selected?: boolean;
  onToggle?: (currentSelectedStatus: boolean) => void;
  toggleType?: ("block" | "icon")[];
  src?: string;
}

const ImageCard: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  selected,
  className,
  onToggle,
  onClick,
  src,
  toggleType = ["icon"],
  ...divProps
}) => {
  const handleClick = useCallback(() => {
    console.log(!!selected);
    onToggle?.(!!selected);
  }, [onToggle, selected]);

  const iconClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      e.stopPropagation();
      if (toggleType.includes("icon")) {
        handleClick();
      }
    },
    [handleClick, toggleType]
  );

  const blockClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (toggleType.includes("block")) {
        handleClick();
      }
      onClick?.(e);
    },
    [handleClick, onClick, toggleType]
  );

  return (
    <div
      className={classNames(s.img_box, className)}
      {...divProps}
      onClick={blockClick}
    >
      <div className={s.content}>
        <Image
          className={s.imgcove}
          src={`${import.meta.env.VITE_APP_POSESURL}${src}`}
          fit="fill"
          style={{
            background: "#eee",
          }}
        />
      </div>
      {!selected ? (
        <CheckCircleFill onClick={iconClick} className={classNames(s.icon)} />
      ) : (
        <CloseCircleFill
          onClick={iconClick}
          className={classNames(s.icon, s.selected)}
        />
      )}
    </div>
  );
};

export default ImageCard;
