import React, { ChangeEventHandler, FocusEventHandler } from "react";
import "../css/components.css";

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
    // label warning: Form <input> elements must have labels
    <label>
      <input
        className="style-counter"
        type="number"
        min={min}
        max={max}
        step={step}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  );
};
