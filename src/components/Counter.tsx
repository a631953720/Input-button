import React, { InputHTMLAttributes, Ref, forwardRef } from "react";

const Counter = (props: InputHTMLAttributes<HTMLInputElement>, ref?: Ref<HTMLInputElement>) => {
  const { min, max, step, name, value, disabled, onChange, onBlur } = props;
  return (
    // label warning: Form <input> elements must have labels
    <input
      ref={ref}
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
  );
};

export const RefCounter = forwardRef(Counter);
