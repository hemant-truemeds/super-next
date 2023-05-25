import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import login from "@redux/slices/login";

const rootReducer = combineReducers({ counter, login });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
