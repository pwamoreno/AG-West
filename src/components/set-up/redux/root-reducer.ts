"use client";
import { combineReducers } from "redux";
import authReducer from "../../Redux/Auth";

export const rootReducer = combineReducers({
	auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
