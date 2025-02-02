"use client";
import { RootState } from "@src/components/config/store";
import useToken from "@src/components/hooks/useToken";
import Invoice from "@src/components/invoice/Invoice";
import { useOrders } from "@src/components/lib/woocommerce";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";

const OrderDataContainer = () => {
	const param = useParams();
	const printRef = useRef();

	const {
		data: orderData,
		isLoading: isLoadingOrder,
		isError: isErrorOrder,
	} = useOrders(`${param.id}`);

	const OrderData = orderData?.data;
	return (
		<>
			{OrderData && (
				<>
					<div className='flex w-full bg-primary/30 rounded-md mb-5 px-4 py-3'>
						<label>
							Thank you{" "}
							<span className='font-bold text-primary'>
								{OrderData?.billing?.first_name} {OrderData?.billing?.last_name}
								,{" "}
							</span>
							Your order have been received!
						</label>
					</div>
					<div className='bg-white rounded-lg shadow-sm flex w-full flex-col'>
						<Invoice data={OrderData} printRef={printRef} />
					</div>
				</>
			)}
			{isLoadingOrder && (
				<div className='flex w-full justify-center mt-6 h-[30vh]'>
					<ScaleLoader color='#28CB6D' />
				</div>
			)}
		</>
	);
};

export default OrderDataContainer;
