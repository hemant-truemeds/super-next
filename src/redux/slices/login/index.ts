import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { userAPI } from './userAPI'
// First, create the thunk
export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const myPromise = new Promise((res, rej) => {
      setTimeout(() => res("timeout complete"), 3000);
    });
    // const response = await axios.get("https://api.publicapis.org/entries");
    const response = await myPromise;
    return response;
  }
);

interface UsersState {
  entities: [];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  entities: [],
  loading: "idle",
} as UsersState;

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.type as never);
      state.entities.push(action.payload as never);
    });
  },
});
export const {} = usersSlice.actions;

export default usersSlice.reducer;

// Later, dispatch the thunk as needed in the app
