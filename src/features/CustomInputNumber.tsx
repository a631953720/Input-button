import React, { useRef, FocusEventHandler, useCallback, useEffect } from "react";
import { RefCounter } from "../components/Counter";
import { Button } from "../components/Button";

type CustomInputNumberProps = {
  count: number;
  step: number;
  max: number;
  min: number;
  value: number;
  disable?: boolean;
  disableAdd?: boolean;
  disableReduce?: boolean;
  name: string;
  onChange: (value: number) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

let timer: NodeJS.Timer;

export const CustomInputNumber = (props: CustomInputNumberProps) => {
  const { name, value, step, max, min, disable = false, disableAdd = false, disableReduce = false, onBlur, onChange } = props;
  const inputNumberEl = useRef<HTMLInputElement>(null);

  const onAdd = useCallback(
    (v: number) => {
      onChange(v + step);
    },
    [onChange, step]
  );

  const onReduce = useCallback(
    (v: number) => {
      onChange(v - step);
    },
    [onChange, step]
  );

  const isOverThanMax = useCallback(
    (v: number) => {
      return v + step > max;
    },
    [max, step]
  );

  const isLessThanMin = useCallback(
    (v: number) => {
      return v - step < min;
    },
    [min, step]
  );

  const checkAddOrReduceIsDisable = useCallback(
    (type: "add" | "reduce") => {
      if (type === "add") return isOverThanMax(value) || disable || disableAdd;
      if (type === "reduce") return isLessThanMin(value) || disable || disableReduce;
      return false;
    },
    [disable, disableAdd, disableReduce, isLessThanMin, isOverThanMax, value]
  );

  const onAddStart = useCallback(() => {
    let copyValue = value;
    timer = setInterval(() => {
      if (isOverThanMax(copyValue)) return clearInterval(timer);
      copyValue += step;
      onChange(copyValue);
    }, 100);
  }, [isOverThanMax, onChange, step, value]);

  const onReduceStart = useCallback(() => {
    let copyValue = value;
    timer = setInterval(() => {
      if (isLessThanMin(copyValue)) return clearInterval(timer);
      copyValue -= step;
      onChange(copyValue);
    }, 100);
  }, [value, step, onChange, isLessThanMin]);

  useEffect(() => {
    if (disable || disableAdd || disableReduce) clearInterval(timer);
  }, [disable, disableAdd, disableReduce]);

  return (
    <div>
      <label>
        <Button
          name="reduce"
          disabled={checkAddOrReduceIsDisable("reduce")}
          value="-"
          onClick={() => {
            if (!checkAddOrReduceIsDisable("reduce")) onReduce(value);
          }}
          onMouseDown={() => onReduceStart()}
          onMouseUp={() => clearInterval(timer)}
        />
        <RefCounter
          ref={inputNumberEl}
          name={name}
          disabled={disable}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onBlur={onBlur}
          min={min}
          max={max}
          step={step}
        />
        <Button
          name="add"
          disabled={checkAddOrReduceIsDisable("add")}
          value="+"
          onClick={() => {
            if (!checkAddOrReduceIsDisable("add")) onAdd(value);
          }}
          onMouseDown={() => onAddStart()}
          onMouseUp={() => clearInterval(timer)}
        />
      </label>
    </div>
  );
};
