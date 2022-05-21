import React, { useRef, FocusEventHandler, useCallback } from "react";
import { RefCounter } from "../components/Counter";
import { Button } from "../components/Button";

type CustomInputNumberProps = {
  count: number;
  step: number;
  max: number;
  min: number;
  value: number;
  disable: boolean;
  name: string;
  onChange: (value: number) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const CustomInputNumber = (props: CustomInputNumberProps) => {
  const { name, disable, value, count, step, max, min, onBlur, onChange } = props;
  const inputNumberEl = useRef<HTMLInputElement>(null);

  const onAdd = useCallback(() => {
    onChange(count + step);
  }, [count, onChange, step]);
  const onReduce = useCallback(() => {
    onChange(count - step);
  }, [count, onChange, step]);

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
            }
          }}
        />
      </label>
    </div>
  );
};
