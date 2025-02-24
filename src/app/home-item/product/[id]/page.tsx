import AppLayout from "@src/components/AppLayout";
import ProductDisplaySection from "@src/components/PageFragments/ProductDisplaySection";
import { Back } from "@src/components/Reusables";
import { WooCommerceServer } from "@utils/endpoints";

import React from "react";

interface ProductIdProps {
	params: { id: string };
}

// export async function generateStaticParams() {
// 	try {
// 		// Generate static paths using the slug and ID
// 		const paths = [
// 			{ id: "id" },
// 			{ id: "2" },
// 			{ id: "3" }, // Add as many IDs as you need
// 		];

// 		return paths; // Return the hardcoded paths
// 	} catch (error) {
// 		console.error("Error fetching products in generateStaticParams:", error);
// 		// Return an empty array to avoid breaking the build process
// 		return [];
// 	}
// }
export async function generateStaticParams() {
	try {
		// Fetch products from WooCommerce
		const response = await WooCommerceServer.get("products");
		const products = response?.data || [];

		// Generate static paths using the slug and ID
		const paths = products.map((product: { id: number; slug: string }) => ({
			id: `${product.slug}-${product.id}`,
		}));

		return paths;
	} catch (error) {
		console.error("Error fetching products in generateStaticParams:", error);
		// Return an empty array to avoid breaking the build process
		return [];
	}
}

const page = async ({ params: { id } }: ProductIdProps) => {
	const lastPart = id.split("/").pop();
	const formatedId = lastPart?.match(/-(\w+)$/)?.[1];

	return (
		<AppLayout className='pt-40 slg:pt-44 mx-auto max-w-[1156px]'>
			<Back />
			<ProductDisplaySection FormatedId={formatedId} />
		</AppLayout>
	);
};

export default page;
