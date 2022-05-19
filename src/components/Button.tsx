import React, { MouseEventHandler } from "react";
import "./Counter.css";

type ButtonProps = {
  name: string;
  disabled: boolean;
  value: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseUp?: MouseEventHandler<HTMLInputElement>;
  onMouseDown?: MouseEventHandler<HTMLInputElement>;
};

export const Button = (props: ButtonProps) => {
  const { name, disabled, value, onClick, onMouseDown, onMouseUp } = props;
  return (
    <input
      type="button"
      value={value}
      className="style-button"
      name={name}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};
