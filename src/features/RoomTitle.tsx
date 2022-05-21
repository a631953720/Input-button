import React from 'react'

type RoomTitleProps = {
  guest: number;
  room: number;
  unSelectedGuest: number;
};

export const RoomTitle = (props: RoomTitleProps) => {
  const { guest, room, unSelectedGuest } = props;
  return (
    <div className="all-room-list-title">
      <div className="all-guest-status">
        住客人數: {guest}人 / {room}房
      </div>
      <div className="all-guest-unselected">尚未分配人數: {unSelectedGuest} 人</div>
    </div>
  );
};
