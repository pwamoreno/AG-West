import { loadingBarRef } from "@src/components/config/AppProvider";
import FormToast from "@src/components/Reusables/Toast/SigninToast";
import { toast } from "react-toastify";

type voidFn = () => void;
let resetState: voidFn = () => {};

export const APICall = async (
	fn: (...args: any) => Promise<any>,
	args?: any,
	showSuccessToast?: boolean,
	showLoadingBar: boolean = true,
) => {
	try {
		showLoadingBar && loadingBarRef.current?.continuousStart();
		const response = Array.isArray(args) ? await fn(...args) : await fn(args);

		if (showSuccessToast) {
			const message =
				response?.payload ||
				response?.data?.message ||
				response?.data?.payload?.message ||
				response?.data?.payload;
			if (message) {
				FormToast({
					message: message,
					success: true,
				});
			}
		}

		showLoadingBar && loadingBarRef.current?.complete();
		return response;
	} catch (error: any) {
		if (error.response) {
			// if (showSuccessToast)
			// 	toast(error.response.data.payload ?? "", { type: "error" });

			const errorMessage =
				error.response.data?.payload ||
				error.response.data?.message ||
				"An unexpected error occurred";

			if (showSuccessToast) {
				FormToast({
					message: errorMessage,
					success: false,
				});
			}

			if (error.response.status == 401) {
				resetState();
			}
		}
		showLoadingBar && loadingBarRef.current?.complete();
		throw error;
	}
};

export function formatDate(dateString: string): string {
	const [year, month, day] = dateString.split("-");
	return `${day}-${month}-${year}`;
}
export function formatDate2(dateString: string): string {
	const [year, month, day] = dateString.split("-");
	return `${year}-${month}-${day}`;
}

export function getDateFromTimestamp(timestamp: string | number | Date) {
	const date = new Date(timestamp);
	return date.toISOString().split("T")[0];
}
