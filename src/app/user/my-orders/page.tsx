"use client";
import AppLayout from "@src/components/AppLayout";
import Dashboard from "@src/components/Dashboard";
import OrderHistory from "@src/components/OrderHistory";
import PaginationComponent from "@src/components/Reusables/PaginationComponent";
import { Skeleton } from "@nextui-org/react";
import { useOrders } from "@src/components/lib/woocommerce";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderSlugId } from "@src/components/config/features/subCategoryId";
import { useRouter } from "next/navigation";

const Page = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const router = useRouter();
	const dispatch = useDispatch();

	const {
		data: ordersData,
		isLoading: isLoadingOrders,
		isError: isErrorOrders,
	} = useOrders(undefined, currentPage, itemsPerPage);

	const OrderData: OrderGetType[] = ordersData?.data;
	const totalItems = ordersData?.totalItems || 0;
	const totalPages = ordersData?.totalPages || 1;

	const handlePageChange = (selected: number) => {
		setCurrentPage(selected);
	};

	// if (ordersData) {
	// 	pageCount = Math.ceil(data?.totalDoc / 8);
	// }

	// const handleOrderClick = (id: number) => {
	// 	dispatch(updateOrderSlugId({ orderSlugId: id.toString() }));
	// 	router.push(`/order/${id}`);
	// };
	return (
		<AppLayout>
			<Dashboard>
				<div className='flex flex-col'>
					<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
						<div className='align-middle inline-block rounded-md min-w-full pb-2 sm:px-6 lg:px-8'>
							<div className='overflow-hidden rounded-md'>
								<table className='table-auto min-w-full'>
									<thead className='bg-gray-50'>
										<tr className='bg-gray-100'>
											<th
												scope='col'
												className='text-left text-xs font-semibold px-4 py-2 text-gray-700 uppercase tracking-wider'
											>
												NO
											</th>
											<th
												scope='col'
												className='text-left text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
											>
												ID
											</th>
											<th
												scope='col'
												className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
											>
												Order Time
											</th>

											<th
												scope='col'
												className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
											>
												Method
											</th>
											<th
												scope='col'
												className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
											>
												Status
											</th>
											<th
												scope='col'
												className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
											>
												Total
											</th>
											<th
												scope='col'
												className='text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider'
											>
												Action
											</th>
										</tr>
									</thead>
									{OrderData && OrderData?.length > 0 ? (
										<tbody className='bg-white border-none'>
											{OrderData?.map((order, i) => (
												<tr
													key={order.id}
													className={i % 2 === 0 ? "bg-[#F9FAFB]" : "bg-white"}
												>
													<OrderHistory
														index={(currentPage - 1) * itemsPerPage + i + 1}
														_id={order?.id}
														pageCount={totalPages}
														createdAt={order?.date_created}
														paymentMethod={order?.payment_method}
														status={order?.status}
														total={parseInt(order?.total)}
														currency={"₦"}
													/>
													<td className='px-5 py-3 whitespace-nowrap text-right text-sm'>
														<Link
															href={`/order/${order.id}`}
															className='px-3 py-1 bg-primaryColor-300 text-xs flex justify-center text-white hover:bg-primary hover:text-white transition-all font-semibold rounded-full cursor-pointer'
														>
															Details
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									) : (
										<tbody>
											<tr>
												<td colSpan={9} className='text-center p-4'>
													<div className='flex flex-col items-center justify-center h-full'>
														{!isLoadingOrders && (
															<div className='grid place-content-center py-10 place-items-center'>
																<div className='text-gray-500 font-bold text-xl'>
																	Sorry, we could not find any results.
																</div>
															</div>
														)}
													</div>
												</td>
											</tr>
										</tbody>
									)}
								</table>

								{isLoadingOrders && (
									<div className='grid w-full place-items-center gap-2 mt-2'>
										<Skeleton className='h-9 w-full rounded-full bg-gray-200 animate-pulse' />
										<Skeleton className='h-9 my-5 w-full rounded-full bg-gray-200 animate-pulse' />
										<Skeleton className='h-9 w-full rounded-full bg-gray-200 animate-pulse' />
										<Skeleton className='h-9 my-5 w-full rounded-xl bg-gray-200 animate-pulse' />
										<Skeleton className='h-9 w-full rounded-full bg-gray-200 animate-pulse' />
										<Skeleton className='h-9 my-5 w-full rounded-full bg-gray-200 animate-pulse' />
									</div>
								)}

								{totalPages > 1 && (
									<PaginationComponent
										pageCount={totalPages}
										onPageChange={handlePageChange}
										forcePage={0}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</Dashboard>
		</AppLayout>
	);
};

export default Page;
