import React, { useCallback } from "react";
import { CustomInputNumber } from "./CustomInputNumber";
import { Room } from "../interface/room";

type RoomComponentProps = {
  room: Room;
  max: number;
  disable: boolean;
  step: number;
  onChange: (room: Room) => void;
};

export const RoomComponent = (props: RoomComponentProps) => {
  const { room, max, disable, step, onChange } = props;
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
    <div>
      <div>房間: {allCount()} 人</div>
      <div>
        <div>大人</div>
        <div>年齡 20+</div>
        <CustomInputNumber
          count={adult}
          step={step}
          max={max - child}
          min={1}
          value={adult}
          disable={disable}
          onChange={(value) => {
            onChange(handleAdult(value));
          }}
          name="adult"
        />
        <div>小孩</div>
        <CustomInputNumber
          count={child}
          step={step}
          max={max - adult}
          min={0}
          value={child}
          disable={disable}
          onChange={(value) => {
            onChange(handleChild(value));
          }}
          name="child"
        />
      </div>
    </div>
  );
};