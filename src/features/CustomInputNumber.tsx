import React, { useRef, useEffect, FocusEventHandler, useCallback } from "react";
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
  onChange: (value: number) => void;
  onBlur: FocusEventHandler<HTMLInputElement>;
  setIsFocus: (v: boolean) => void;
};

export const CustomInputNumber = (props: CustomInputNumberProps) => {
  const { isFocus, name, disable, value, count, step, max, min, onBlur, onChange, setIsFocus } = props;
  const inputNumberEl = useRef<HTMLInputElement>(null);

  const onAdd = useCallback(() => {
    onChange(count + step);
  }, [count, onChange, step]);
  const onReduce = useCallback(() => {
    onChange(count - step);
  }, [count, onChange, step]);

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
          onClick={() => {
            if (!disable) {
              onReduce();
              focusEvent();
            }
          }}
        />
        <RefCounter
          ref={inputNumberEl}
          name={name}
          disabled={disable}
          value={value}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
          onBlur={onBlur}
          min={min}
          max={max}
          step={step}
        />
        <Button
          name="add"
          disabled={count + step > max || disable}
          value="+"
          onClick={() => {
            if (!disable) {
              onAdd();
              focusEvent();
            }
          }}
        />
      </label>
    </div>
  );
};
