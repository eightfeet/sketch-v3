import React, { useCallback } from "react";
import s from "./Timer.module.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration'
import classNames from "classnames";
import { useSnapshot } from 'valtio';
import { runningTime } from "~/store";

dayjs.extend(duration);



interface Props {
  onComplete: () => void;
  info?: string;
  onUpdate?: (remainingTime: number) => void;
  wranTime: boolean;
  isPlaying: boolean;
}

const Timer: React.FC<Props> = ({
  onComplete,
  info,
  onUpdate,
  wranTime,
  isPlaying,
}) => {
  const runningTimeR = useSnapshot(runningTime);
  const handleUpdate = useCallback(
    (remainingTime: number) => {
      onUpdate?.(remainingTime);
    },
    [onUpdate]
  );

  const getCurrentTime = useCallback((time: number) => {
    const result = dayjs.duration(time * 1000);
    if (result.hours() <= 0 && result.minutes() <= 0 && result.seconds() <= 0) {
      return null;
    } else {
      return result.format("HH:mm:ss");
    }
  }, []);

  const renderTime = useCallback(
    ({ remainingTime }: { remainingTime: number }) => {
      if (remainingTime === 0) {
        return <div className={s.timercount}>next</div>;
      }
      return (
        <div className={classNames(s.timercount, { [s.wrantime]: wranTime })}>
          <div className={s.index}>{info}</div>
          <div className={s.time}>{getCurrentTime(remainingTime)}</div>
        </div>
      );
    },
    [wranTime, info, getCurrentTime]
  );

  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={(runningTimeR.duration || 0) * 60}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[60, 30, 20, 0]}
      trailColor={"rgba(144,144,144,0.5)"}
      size={70}
      strokeWidth={2}
      onComplete={onComplete}
      onUpdate={handleUpdate}
    >
      {renderTime}
    </CountdownCircleTimer>
  );
};

export default Timer;
