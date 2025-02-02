import AppLayout from "@src/components/AppLayout";
import { Back } from "@src/components/Reusables";
import OrderDataContainer from "../_components/OrderDataContainer";
import { WooCommerceServer } from "@utils/endpoints";

export async function generateStaticParams() {
	try {
		// Fetch categories from WooCommerce
		const response = await WooCommerceServer.get("orders");
		const orders = response.data;

		const ordersSorted: string[] = orders?.map(
			(order: { id: number }) => `${order?.id}`,
		);

		return ordersSorted?.map((id) => ({ id }));
	} catch (error) {
		console.error("Error fetching orders:", error);
		return [];
	}
}

// export async function generateStaticParams() {
// 	try {
// 		// Generate static paths using the slug and ID
// 		const paths = [{ id: "id" }];

// 		return paths; // Return the hardcoded paths
// 	} catch (error) {
// 		console.error("Error fetching products in generateStaticParams:", error);
// 		// Return an empty array to avoid breaking the build process
// 		return [];
// 	}
// }

const page = () => {
	return (
		<AppLayout>
			<main className='bg-white mx-auto mt-32 slg:mt-28'>
				<section className='flex w-full flex-col items-center pt-16 slg:px-6 text-center pb-10'>
					<div className='w-full mb-5'>
						<Back />
					</div>
					<OrderDataContainer />
				</section>
			</main>
		</AppLayout>
	);
};

export default page;
