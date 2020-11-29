import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../actions/action";

const PageA = () => {
  //   const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  //   useEffect(() => {
  //     dispatch(fetchUsers());
  //   }, []);
  // 使用服务端的数据，前端不需要再发请求了
  return (
    <div>
      <h1>I am the A page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.first_name} </li>
        ))}
      </ul>
    </div>
  );
};

PageA.getInitialData = async (store) => {
  return store.dispatch(fetchUsers());
};

export default PageA;
