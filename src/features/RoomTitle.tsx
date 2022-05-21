import React from 'react'

type RoomTitleProps = {
  className?: string;
  guest: number;
  room: number;
  unSelectedGuest: number;
};

export const RoomTitle = (props: RoomTitleProps) => {
  const { guest, room, unSelectedGuest, className } = props;
  return (
    <div className={className}>
      <div>
        住客人數: {guest}人 / {room}房
      </div>
      <div>尚未分配人數: {unSelectedGuest}</div>
    </div>
  );
};
