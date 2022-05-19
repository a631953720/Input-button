import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import './Counter.css';

type CounterProps = {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
};

export const Counter = (props: CounterProps) => {
  const { min, max, step, name, value, disabled, onChange, onBlur } = props;
  return (
    <input
      className="style-counter"
      type="number"
      min={min}
      max={max}
      step={step}
      name={name}
      value={value}
      disabled={disabled}
      onChange={(e)=>{
        console.log(123);
        onChange(e);
      }}
      onBlur={onBlur}
    />
  );
};
