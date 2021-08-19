import React from 'react'
import './App.css';
import ExampleSetState from './components/ExampleSetState'
import { Demo1 as FakeUseState } from './components/FakeUseStateAndUseEffect.jsx'

function App() {
  return (
    <div>
      <FakeUseState />
      <ExampleSetState />
    </div>
  );
}

export default App;
