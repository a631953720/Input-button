import React, { useCallback, ChangeEventHandler, FocusEventHandler, MouseEventHandler, useRef, useEffect, useState } from "react";
import { RefCounter } from "../components/Counter";
import { Button } from "../components/Button";

type CustomInputNumberProps = {
  count: number;
  step: number;
  max: number;
  min: number;
  setCount: (updateState: (oldCount: number) => number) => void;
  setName: (name: string) => void;
  setCurrentValue: (value: number) => void;
};

let timer: NodeJS.Timer;

export const CustomInputNumber = (props: CustomInputNumberProps) => {
  const { count, step, max, min, setCount, setName, setCurrentValue } = props;
  const inputNumberEl = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);

  const onStop = useCallback(() => {
    console.log('onStop');
    setIsActive(false);
    clearInterval(timer);
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newCount = Number(e.target.value);
      if (newCount >= min && newCount <= max) {
        setCount(() => newCount);
      }
    },
    [max, min, setCount]
  );

  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setName(e.target.name);
      setCurrentValue(Number(e.target.value));
    },
    [setCurrentValue, setName]
  );

  const onAddStart: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setIsActive(true);
    let _count = count;
    if (_count + step <= max) {
      _count += step;
      setCount((oldCount) => oldCount + step);
    }
    timer = setInterval(() => {
      if (_count + step > max) {
        onStop();
        return;
      }
      _count += step;
      setCount((oldCount) => oldCount + step);
    }, 100);
  }, [count, max, onStop, setCount, step]);

  const onReduceStart: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setIsActive(true);
    let _count = count;
    if (_count - step >= min) {
      _count -= step;
      setCount((oldCount) => oldCount - step);
    }
    timer = setInterval(() => {
      if (_count - step < min) {
        onStop();
        return;
      }
      _count -= step;
      setCount((oldCount) => oldCount - step);
    }, 100);
  }, [count, step, min, setCount, onStop]);

  useEffect(() => {
    if (isActive) inputNumberEl.current?.focus();
    else inputNumberEl.current?.blur();
  }, [isActive])
  

  return (
    <div>
      <label>
        <Button name="reduce" disabled={count <= min} value="-" onMouseDown={onReduceStart} onMouseUp={onStop} />
        <RefCounter ref={inputNumberEl} name="number-input" disabled={false} value={count} onChange={onChange} onBlur={onBlur} min={min} max={max} step={step} />
        <Button name="add" disabled={count >= max} value="+" onMouseDown={onAddStart} onMouseUp={onStop} />
      </label>
    </div>
  );
};
