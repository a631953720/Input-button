import React, { useCallback } from "react";
import { CustomInputNumber } from "./CustomInputNumber";
import { Room } from "../interface/room";

type RoomComponentProps = {
  className?: string;
  room: Room;
  max: number;
  disable?: boolean;
  disableAdd?: boolean;
  disableReduce?: boolean;
  step: number;
  onChange: (room: Room) => void;
};

export const RoomComponent = (props: RoomComponentProps) => {
  const { room, max, step, disable = false, disableAdd = false, disableReduce = false, onChange, className } = props;
  const { adult, child } = room;

  const allCount = useCallback(() => {
    return adult + child;
  }, [adult, child]);

  const handleAdult = useCallback(
    (value: number) => {
      return {
        adult: value,
        child,
      };
    },
    [child]
  );

  const handleChild = useCallback(
    (value: number) => {
      return {
        adult,
        child: value,
      };
    },
    [adult]
  );

  return (
    <div className={className}>
      <div className="room-title">房間: {allCount()} 人</div>
      <div className="room-body">
        <div className="guest-type">大人</div>
        <div>年齡 20+</div>
        <CustomInputNumber
          count={adult}
          step={step}
          max={max - child}
          min={1}
          value={adult}
          disable={disable}
          disableAdd={disableAdd}
          disableReduce={disableReduce}
          onChange={(value) => {
            onChange(handleAdult(value));
          }}
          name="adult"
        />
        <div className="guest-type">小孩</div>
        <CustomInputNumber
          count={child}
          step={step}
          max={max - adult}
          min={0}
          value={child}
          disable={disable}
          disableAdd={disableAdd}
          disableReduce={disableReduce}
          onChange={(value) => {
            onChange(handleChild(value));
          }}
          name="child"
        />
      </div>
    </div>
  );
};
