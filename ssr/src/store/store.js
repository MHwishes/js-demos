import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducer/reducer";

const store = createStore(userReducer, applyMiddleware(thunk));

export default store;

export const getClientStore = () => {
  // 从服务器端输出的页面上拿到脱水的数据
  const defaultState = window.context.state;
  // 当做 store的初始数据（即注水）
  return createStore(userReducer, defaultState, applyMiddleware(thunk));
};
