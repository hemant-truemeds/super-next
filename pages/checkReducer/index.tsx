import { RootState } from "@redux/reducers";
import { fetchUserById } from "@redux/slices/login";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckReducer = () => {
  const state = useSelector<RootState>((state) => state.login);
  const dispatch = useDispatch();
  console.log(state);
  return (
    <div>
      CheckReducer
      <button onClick={() => dispatch(fetchUserById())}>Click me</button>
    </div>
  );
};

export default CheckReducer;
