import React, { MouseEventHandler } from "react";
import "./Counter.css";

type ButtonProps = {
  name: string;
  disabled: boolean;
  value: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const Button = (props: ButtonProps) => {
  const { name, disabled, value, onClick } = props;
  return <input type="button" value={value} className="style-button" name={name} disabled={disabled} onClick={onClick} />;
};
