"use client";
import { combineReducers } from "redux";
import authReducer from "../../Redux/Auth";
import currencyReducer from "../../Redux/Currency";

export const rootReducer = combineReducers({
	auth: authReducer,
	currency: currencyReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
