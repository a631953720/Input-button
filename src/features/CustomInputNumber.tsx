import React, { ChangeEventHandler, MouseEventHandler, useRef, useEffect, FocusEventHandler, useCallback } from "react";
import { RefCounter } from "../components/Counter";
import { Button } from "../components/Button";

type CustomInputNumberProps = {
  isFocus: boolean;
  count: number;
  step: number;
  max: number;
  min: number;
  value: number;
  disable: boolean;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onAdd: MouseEventHandler<HTMLInputElement>;
  onReduce: MouseEventHandler<HTMLInputElement>;
  setIsFocus: (v: boolean) => void;
};

export const CustomInputNumber = (props: CustomInputNumberProps) => {
  const { isFocus, name, disable, value, count, step, max, min, onAdd, onBlur, onChange, onReduce, setIsFocus } = props;
  const inputNumberEl = useRef<HTMLInputElement>(null);

  const focusEvent = useCallback(() => {
    setIsFocus(true);
    setTimeout(() => {
      setIsFocus(false);
    }, 50);
  }, [setIsFocus]);

  useEffect(() => {
    if (isFocus) inputNumberEl.current?.focus();
    else inputNumberEl.current?.blur();
  }, [isFocus, value]);

  return (
    <div>
      <label>
        <Button
          name="reduce"
          disabled={count - step < min || disable}
          value="-"
          onClick={(e) => {
            if (!disable) {
              onReduce(e);
              focusEvent();
            }
          }}
        />
        <RefCounter
          ref={inputNumberEl}
          name={name}
          disabled={disable}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          min={min}
          max={max}
          step={step}
        />
        <Button
          name="add"
          disabled={count + step > max || disable}
          value="+"
          onClick={(e) => {
            if (!disable) {
              onAdd(e);
              focusEvent();
            }
          }}
        />
      </label>
    </div>
  );
};
