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
    effectCursor = 0;
  }

  ++cursor;

  return [states[currenCursor], setState];
}

const allDeps = [];
let effectCursor = 0;

function useEffect(callback, deps) {
  if (!allDeps[effectCursor]) {
    allDeps[effectCursor] = deps;
    ++effectCursor;
    callback();
    return;
  }

  const currenEffectCursor = effectCursor;
  const rawDeps = allDeps[currenEffectCursor];
  const isChanged = rawDeps.some((dep, index) => dep !== deps[index]);
  if (isChanged) {
    callback();
  }
  ++effectCursor;
}

export const Demo1 = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(10);
  const [count3, setCount3] = useState(100);

  useEffect(() => {
    console.log('count1 update: ', count1);
  }, [count1]);

  // 只会在compoentDidMount时，触发一次
  // 副作用函数不会多次执行
  useEffect(() => {
    console.log('count3 update: ', count3);
  }, [count3]);

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
