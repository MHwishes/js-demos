import React from 'react';
import { render } from '../index.js';

const states = [];
let cursor = 0;

function useState(initialState) {
  const currenCursor = cursor;

  states[currenCursor] = states[currenCursor] || initialState;

  function setState(newState: T) {
    states[currenCursor] = newState;
    render();
    cursor = 0;
  }

  ++cursor;

  return [states[currenCursor], setState];
}

export const Demo1 = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(10);

  return (
    <div>
      <div>{count1}</div>
      <button
        onClick={() => {
          setCount1(count1 + 1);
        }}
      >
        点击 +1
      </button>

      <div>{count2}</div>
      <button
        onClick={() => {
          setCount2(count2 - 1);
        }}
      >
        点击 -1
      </button>
    </div>
  );
};
