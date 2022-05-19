import React, { useState } from "react";
import { CustomInputNumber } from "./features/CustomInputNumber";

function App() {
  const [count, setCount] = useState(0);
  const [step] = useState(1);
  const [max] = useState(10);
  const [min] = useState(0);
  const [, setName] = useState("");
  const [, setCurrentValue] = useState(0);

  return (
    <CustomInputNumber
      count={count}
      step={step}
      max={max}
      min={min}
      setCount={setCount}
      setName={setName}
      setCurrentValue={setCurrentValue}
    />
  );
}

export default App;
