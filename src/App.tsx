import React, { useCallback, ChangeEventHandler, FocusEventHandler, useState } from 'react';
import { Button } from './components/Button';

function App() {
  const [count, setCount] = useState(0);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setCount(Number(e.currentTarget.value));
    console.log(e.currentTarget.value);
  }, []);

  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    console.log(e.currentTarget.value);
  }, []);

  return (
    <div>
      <h2>Welcome to React App</h2>
      <h3>Date : {new Date().toDateString()}</h3>
      <Button onChange={onChange} onBlur={onBlur} min={0} max={10} step={0} name="sss" value={count} disabled={false} />
    </div>
  );
}

export default App;
