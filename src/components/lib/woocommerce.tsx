"use client";
import { signOut } from "@utils/lib";
import { WC_ConsumerKey, WC_consumerSecret, WC_URL } from "@utils/lib/data";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useMutation, useQuery } from "react-query";

export const WooCommerce = new WooCommerceRestApi({
	url: WC_URL, // Your store URL
	consumerKey: WC_ConsumerKey, // Your consumer key
	consumerSecret: WC_consumerSecret, // Your consumer secret
	version: "wc/v3", // WooCommerce API version
});

export const useCustomer = (customerId: string | undefined) => {
	return useQuery(
		["customer", customerId],
		async () => {
			const response = await WooCommerce.get(`customers/${customerId}`);
			return response.data;
		},
		{
			onError: (error: any) => {
				if (error.response?.status === 401 || error.response?.status === 403) {
					// Trigger signout if unauthorized
					signOut();
				} else {
					console.error("An error occurred:", error);
				}
			},
			staleTime: Infinity,
		},
	);
};

export const useProduct = (productId: string | undefined) => {
	return useQuery(
		["product", productId],
		async () => {
			const response = await WooCommerce.get(`products/${productId}`);
			return response.data;
		},
		{
			staleTime: Infinity,
		},
	);
};

export const useOrders = (
	id?: string,
	page: number = 1,
	perPage: number = 10,
) => {
	return useQuery(
		["order", id, page, perPage],
		async () => {
			const endpoint = id
				? `orders/${id}`
				: `orders?page=${page}&per_page=${perPage}`;
			const response = await WooCommerce.get(endpoint);

			// Extract total items and total pages from headers
			const totalItems = parseInt(response.headers["x-wp-total"], 10);
			const totalPages = parseInt(response.headers["x-wp-totalpages"], 10);

			return {
				data: response.data,
				totalItems,
				totalPages,
			};
		},
		{
			keepPreviousData: true,
			staleTime: Infinity,
		},
	);
};

export const useProductSearch = (query: string | undefined) => {
	return useQuery(
		["product-search", query],
		async () => {
			const response = await WooCommerce.get(`products?search=${query}`);
			return response.data;
		},
		{
			staleTime: Infinity,
		},
	);
};

export const useGeneralSettings = () => {
	return useQuery("general-settings", async () => {
		const response = await WooCommerce.get("settings/general");
		return response.data;
	});
};

export const useCategories = (categoryId: string | undefined) => {
	return useQuery(
		["categories", categoryId],
		async () => {
			const response = await WooCommerce.get(
				`products/categories/${categoryId}`,
			);
			return response.data;
		},
		{
			staleTime: Infinity,
		},
	);
};

export const useCreateOrder = () => {
	return useMutation(async (orderData: any) => {
		const response = await WooCommerce.post("orders", orderData);
		return response.data;
	});
};

export const useProductsByCategory = (categoryId: string) => {
	return useQuery(["category-products", categoryId], async () => {
		const response = await WooCommerce.get(`products?category=${categoryId}`);
		return response.data;
	});
};

export const useUpdateCustomer = () => {
	return useMutation(async (updatedCustomerData: any) => {
		const { id, ...data } = updatedCustomerData; // Ensure you pass in the customer ID along with the new data
		const response = await WooCommerce.put(`customers/${id}`, data);
		return response.data;
	});
};
