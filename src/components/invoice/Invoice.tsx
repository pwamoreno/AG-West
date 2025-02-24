"use client";
import Link from "next/link";
import { formatAmountToCurrency, statusStyles } from "@constants";
import dayjs from "dayjs";
import { LogoImage } from "@utils/function";
import { FormatMoney2 } from "../Reusables/FormatMoney";

interface InvoiceProps {
	data: OrderGetType;
	printRef: any;
}
const Invoice = ({ data, printRef }: InvoiceProps) => {
	const status = data?.status;

	return (
		<div ref={printRef}>
			<div className='bg-primary/10 p-4 rounded-t-xl'>
				<div className='flex lg:flex-row md:flex-row flex-col lg:items-center justify-between'>
					<div>
						<h1 className='font-bold text-2xl uppercase text-start'>Invoice</h1>
						<h6 className='text-gray-700'>
							Status:{" "}
							{status && (
								<span className={`${statusStyles[status]} capitalize`}>
									{status}
								</span>
							)}
						</h6>
					</div>
					<div className='flex flex-col gap-3'>
						<div className='flex justify-end'>
							<LogoImage className='rounded-sm' />
						</div>
						<p className='text-sm text-gray-500 text-start'>
							{data?.billing?.address_1}
						</p>
					</div>
				</div>
				<div className='flex lg:flex-row md:flex-row flex-col justify-between pt-4'>
					<div className='mb-3 md:mb-0 lg:mb-0 flex flex-col'>
						<span className='font-bold text-start text-sm uppercase text-gray-600 block'>
							Date
						</span>
						<span className='text-start text-sm text-gray-500 block'>
							{data?.date_created !== undefined && (
								<span>{dayjs(data?.date_created).format("MMMM D, YYYY")}</span>
							)}
						</span>
					</div>
					<div className='mb-3 md:mb-0 lg:mb-0 flex flex-col'>
						<span className='font-bold text-sm uppercase text-gray-600 block'>
							Customer ID
						</span>
						<span className='text-sm text-gray-500 block'>
							{" "}
							#{data?.customer_id}
						</span>
					</div>
					<div className='flex flex-col lg:text-right text-left'>
						<span className='font-bold text-sm uppercase text-gray-600 block'>
							Customer information
						</span>
						<span className='text-sm text-gray-500 block'>
							<b>Name</b>: {data?.billing?.first_name ?? "N/A"}
							<br />
							<b>Email</b>:{" "}
							{data?.billing?.email && data?.billing?.email?.length > 0
								? data?.billing?.email
								: "n/a"}
							<br />
							<b>Phone No</b>:{" "}
							{data?.billing?.phone && data?.billing?.phone?.length > 0
								? data?.billing?.phone
								: "n/a"}
							<br />
							<b>Address</b>:{" "}
							{data?.billing?.address_1?.length > 0
								? data?.billing?.address_1
								: "n/a"}
							<br />
							<b>City</b>:{" "}
							{data?.billing?.city?.length > 0 ? data?.billing?.city : "n/a"},{" "}
							<b>Country</b>:{" "}
							{data?.billing?.country?.length > 0
								? data?.billing?.country
								: "n/a"}
						</span>
					</div>
				</div>
			</div>

			<div className='border-t border-b border-gray-100 pt-4 pb-10 px-5 bg-primary/10'>
				<div className='flex lg:flex-row md:flex-row flex-col justify-between pt-4'>
					<div className='mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap'>
						<span className='mb-1 font-bold text-sm uppercase text-gray-600 block'>
							Payment Method
						</span>
						<span className='text-start text-sm text-gray-500 font-semibold  block'>
							{data?.payment_method ?? "N/A"}
						</span>
					</div>

					<div className='flex flex-col sm:flex-wrap'>
						<span className='mb-1 font-bold  text-sm uppercase text-gray-600 block'>
							Total Amount
						</span>
						<span className='text-2xl  font-bold text-red-500 block'>
							<FormatMoney2 value={Number(data?.total)} />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Invoice;
