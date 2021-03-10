import React from 'react';
import { render } from '../index.js';

let state;
const useState = (initialValue) => {
  state = state || initialValue;
  // let state = initialValue;
  function setState(newState) {
    console.log(
      '%c 🥪 newState: ',
      'font-size:20px;background-color: #93C0A4;color:#fff;',
      newState
    );
    state = newState;
    render(); // 模拟 reRender，这一行不需要关心
  }
  console.log(
    '%c 🥟 state: ',
    'font-size:20px;background-color: #F5CE50;color:#fff;',
    state
  );
  return [state, setState];
};

export const Demo1 = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点击
      </button>
    </div>
  );
};
