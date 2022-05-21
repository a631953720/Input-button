import React, { useCallback } from "react";
import { CustomInputNumber } from "./CustomInputNumber";
import { Room } from "../interface/room";

type RoomComponentProps = {
  room: Room;
  max: number;
  disable?: boolean;
  disableAdd?: boolean;
  disableReduce?: boolean;
  step: number;
  onChange: (room: Room) => void;
};

export const RoomComponent = (props: RoomComponentProps) => {
  const { room, max, step, disable = false, disableAdd = false, disableReduce = false, onChange } = props;
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
    <div className="room-list-item">
      <div className="room-body">
        <div className="room-title">房間: {allCount()} 人</div>
        <div className="guest-counter-wrapper">
          <div className="custom-counter-with-title">
            <div className="guest-type">
              <span>大人</span>
              <div>年齡 20+</div>
            </div>
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
          </div>
          <div className="custom-counter-with-title">
            <div className="guest-type">
              <span>小孩</span>
            </div>
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
      </div>
    </div>
  );
};
