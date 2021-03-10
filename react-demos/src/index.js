import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

const rootElement = document.getElementById("root");

export const render=()=> {
  ReactDOM.render(<App />, rootElement);
}
render();

