import axios from "axios";
import {
	Alliancepay_Checkout_Url,
	Alliancepay_Public_key,
	Encryption_Checkout_Url,
	ENCRYPTION_KEY,
	WC_ConsumerKey,
	WC_consumerSecret,
	WC_URL,
	WP_API_URL,
} from "./lib/data";

export const login = async (data: any) =>
	axios.post(`${WP_API_URL}/custom-login/v1/login`, data);

export const forgotPassword = async (data: any) =>
	axios.post(`${WP_API_URL}/custom-login/v1/forgot-password`, data);

export const register = async (data: any) =>
	axios.post(`${WP_API_URL}/user-registration/v1/register`, data);

export const changeWpPassword = async (data: any) =>
	axios.post(`${WP_API_URL}/custom-login/v1/change-password`, data);

// Test encryption
// export const encryptOrderData = async (data: any) =>
// 	axios.post(`${Alliancepay_Checkout_Url}/checkout/data/encrypt`, data, {
// 		headers: {
// 			"API-Key": Alliancepay_Public_key, // Add API-Key header
// 			"Content-Type": "application/json", // Optionally specify content type
// 		},
// 	});

export const encryptOrderData = async (data: any) =>
	axios.post(
		`${Encryption_Checkout_Url}/Payment/encrypt-data-for-create-order`,
		data,
		{
			headers: {
				"Content-Type": "application/json", // Optionally specify content type
				"api-key": Alliancepay_Public_key, // Add API-Key header
				"encryption-key": ENCRYPTION_KEY, // Add Encryption-Key header
			},
		},
	);

export const createOrderData = async (data: any) =>
	axios.post(`${Alliancepay_Checkout_Url}/checkout/order/create`, data, {
		headers: {
			"api-key": Alliancepay_Public_key, // Add API-Key header
			"encryption-key": ENCRYPTION_KEY, // Add Encryption-Key header
			"Content-Type": "application/json", // Optionally specify content type
		},
	});

export const cardPaymentRedirect = async (data: any) =>
	axios.post(
		`${Encryption_Checkout_Url}/Payment/encrypt-data-for-pay-order`,
		data,
		{
			// axios.post(`${Alliancepay_Checkout_Url}/checkout/data/encrypt`, data, {
			headers: {
				"api-key": Alliancepay_Public_key, // Add API-Key header
				"encryption-key": ENCRYPTION_KEY, // Add Encryption-Key header
				"Content-Type": "application/json", // Optionally specify content type
			},
		},
	);

export const payOrder = async (data: any) =>
	axios.post(`${Alliancepay_Checkout_Url}/checkout/order/pay`, data, {
		headers: {
			"api-key": Alliancepay_Public_key, // Add API-Key header
			"encryption-key": ENCRYPTION_KEY, // Add Encryption-Key header
			"Content-Type": "application/json", // Optionally specify content type
		},
	});

export const WooCommerceServer = axios.create({
	baseURL: `${WC_URL}/wp-json/wc/v3`,
	headers: {
		"Content-Type": "application/json",
	},
	auth: {
		username: WC_ConsumerKey, // Use environment variables
		password: WC_consumerSecret, // Use environment variables
	},
});

export async function fetchExchangeRate(from: string, to: string) {
	const res = await fetch(
		`${Encryption_Checkout_Url}/Payment/get-exchange-rate?baseCurrencyCode=${from}&destinationCurrencyCode=${to}`,
	);
	const data = await res.json();
	return data.rate;
}
