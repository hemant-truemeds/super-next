import { useEffect } from "react";
import Modal from "@components/modal";
import { RootState } from "@redux/reducers";
import { fetchUserById } from "@redux/slices/login";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "@redux/store";

const CheckReducer = () => {
  const loginState = useSelector<RootState>((state) => state.login);
  const dispatch = useAppDispatch();
  // console.log(dispatch(fetchUserById()).unwrap());
  useEffect(() => {
    (async () => {
      const data = await dispatch(fetchUserById());

      console.log({ data: data, loginState });
    })();
  }, []);

  return (
    <div>
      CheckReducer
      <button onClick={() => dispatch(fetchUserById())}>Click me</button>
      <Modal>
        <h1>This is portal</h1>
      </Modal>
    </div>
  );
};

export default CheckReducer;
