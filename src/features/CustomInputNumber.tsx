import React, { useCallback, ChangeEventHandler, FocusEventHandler, MouseEventHandler } from "react";
import { Counter } from "../components/Counter";
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
    let _count = count;
    if (_count + step <= max) {
      _count += step;
      setCount((oldCount) => oldCount + step);
    }
    timer = setInterval(() => {
      if (_count + step > max) {
        clearInterval(timer);
        return;
      }
      _count += step;
      setCount((oldCount) => oldCount + step);
    }, 100);
  }, [count, max, setCount, step]);

  const onReduceStart: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    let _count = count;
    if (_count - step >= min) {
      _count -= step;
      setCount((oldCount) => oldCount - step);
    }
    timer = setInterval(() => {
      if (_count - step < min) {
        clearInterval(timer);
        return;
      }
      _count -= step;
      setCount((oldCount) => oldCount - step);
    }, 100);
  }, [count, step, min, setCount]);

  const onStop: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    console.log("onStop");
    clearInterval(timer);
  }, []);

  return (
    <div>
      <Button name="reduce" disabled={false} value="-" onMouseDown={onReduceStart} onMouseUp={onStop} />
      <Counter name="number-input" value={count} disabled={false} onChange={onChange} onBlur={onBlur} min={min} max={max} step={step} />
      <Button name="add" disabled={false} value="+" onMouseDown={onAddStart} onMouseUp={onStop} />
    </div>
  );
};
