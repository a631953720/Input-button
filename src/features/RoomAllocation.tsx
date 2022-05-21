import React, { useState, useCallback } from "react";
import { Room } from "../interface/room";
import { RoomComponent } from "./RoomComponent";

type RoomAllocationProps = {
  guest: number;
  room: number;
  onChange: (results: Room[]) => void;
};

export const RoomAllocation = (props: RoomAllocationProps) => {
  const { guest, room, onChange } = props;
  const [result, setResult] = useState<Room[]>([
    { adult: 1, child: 0 },
    { adult: 1, child: 0 },
    { adult: 1, child: 0 },
  ]);

  const getAllGuestCount = useCallback(() => {
    let count = 0;
    result.forEach((v) => {
      count += v.adult;
      count += v.child;
    });
    return count;
  }, [result]);

  const handleSelected = useCallback(() => {
    return guest - getAllGuestCount();
  }, [getAllGuestCount, guest]);

  const isAllGuestSelectedRoom = useCallback(() => {
    return getAllGuestCount() >= guest;
  }, [getAllGuestCount, guest]);

  const updateResult = useCallback(
    (newRoomResult: Room, index: number) => {
      const newResult = result.map((v, i) => {
        if (i !== index) return v;
        return newRoomResult;
      });
      setResult(newResult);
      onChange(newResult);
    },
    [onChange, result]
  );

  return (
    <div>
      <div>
        住客人數: {guest}人 / {room}房
      </div>
      <div>尚未分配人數: {handleSelected()}</div>
      <hr></hr>
      <div>
        {result.map((v, i) => {
          return (
            <RoomComponent
              key={i}
              max={4}
              disable={isAllGuestSelectedRoom()}
              // can choose only disable add or reduce button
              // disableAdd={isAllGuestSelectedRoom()}
              step={1}
              room={v}
              onChange={(_room) => {
                updateResult(_room, i);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
