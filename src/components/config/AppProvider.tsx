"use client";
import { Provider } from "react-redux";
import React, { ReactNode } from "react";
import { store } from "./store";
import { CartProvider } from "react-use-cart";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import * as _redux from "../../components/set-up";
import axios from "axios";

_redux.setupAxios(axios, store);
export const loadingBarRef = React.createRef<LoadingBarRef | null>();

const queryClient = new QueryClient();

interface AppProviderProps {
	children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<LoadingBar
					color='#28CB6D'
					ref={loadingBarRef as React.RefObject<LoadingBarRef>}
					height={5}
				/>
				<ToastContainer />
				<CartProvider>
					<Provider store={store}>{children}</Provider>
				</CartProvider>
			</QueryClientProvider>
		</>
	);
};

export default AppProvider;
