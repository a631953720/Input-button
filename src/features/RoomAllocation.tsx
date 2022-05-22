import React, { useState, useCallback, useEffect } from "react";
import { Room } from "../interface/room";
import { RoomComponent } from "./RoomComponent";
import { RoomTitle } from "../components/RoomTitle";

type RoomAllocationProps = {
  guest: number;
  room: number;
  onChange: (results: Room[]) => void;
};

export const RoomAllocation = (props: RoomAllocationProps) => {
  const { guest, room, onChange } = props;
  const [result, setResult] = useState<Room[]>([]);

  const getAllGuestCount = useCallback(() => {
    let count = 0;
    result.forEach((v) => {
      count += v.adult;
      count += v.child;
    });
    return count;
  }, [result]);

  const handleUnselectedGuest = useCallback(() => {
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

  useEffect(() => {
    const initRoomState: Room[] = [];
    for (let i = 0; i < room; i++) {
      initRoomState.push({ adult: 1, child: 0 });
    }
    setResult(initRoomState);
  }, [room]);

  return (
    <div className="room-list-wrapper">
      <RoomTitle guest={guest} room={room} unSelectedGuest={handleUnselectedGuest()} />
      <div className="room-list-body">
        {result.map((v, i) => {
          return (
            <RoomComponent
              key={`room-list-${i}`}
              max={4}
              disable={isAllGuestSelectedRoom()}
              // can choose only disable add or reduce button
              // disableAdd={isAllGuestSelectedRoom()}
              step={1}
              room={v}
              onResultUpdate={(_room) => {
                updateResult(_room, i);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
