"use client";
import React from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { HiShoppingBag } from "react-icons/hi";
import { useCart } from "react-use-cart";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import Picture from "../picture/Picture";

interface Product {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

const ProductTable = () => {
	const { items, updateItem, removeItem, emptyCart } = useCart();

	const handleMinusClick = (product: any) => {
		if (product.quantity > 1) {
			updateItem(product.id, { quantity: product.quantity - 1 });
		}
	};

	const handlePlusClick = (e: React.MouseEvent, product: any) => {
		e.stopPropagation();
		updateItem(product.id, { quantity: product.quantity + 1 });
	};

	const calculateSubtotal = (product: Product) => {
		return product.price * product.quantity;
	};
	// console.log(calculateSubtotal(product))

	const handleRemoveClick = (e: React.MouseEvent, productId: string) => {
		e.stopPropagation();
		removeItem(productId);
	};

	const handleEmptyCartClick = () => {
		emptyCart();
	};
	return (
		<div className='bg-white w-full px-3 sm:px-6 mt-3 pb-6 rounded-t-md'>
			{items.length <= 0 ? (
				<div className='flex w-full flex-col gap-1 sm:gap-2 items-center justify-center py-6 sm:py-12'>
					<div className=' bg-primary/10 p-3 sm:p-4 rounded-full'>
						<HiShoppingBag className='text-xl sm:text-3xl text-primary' />
					</div>
					<span className='font-semibold text-sm sm:text-lg text-center'>
						Your cart is empty
					</span>
					<span className='text-xs sm:text-sm font-light text-center'>
						No items added in your cart. Please add product to your cart list.
					</span>
				</div>
			) : (
				<>
					<ul className='flex flex-col w-full rounded-lg border border-r-0 border-l-0 border-t-0 border-[#E4E4E4] overflow-x-auto'>
						<li className='flex w-[550px] md:w-full items-center justify-between py-3 sm:pt-7 sm:pb-5 text-sm sm:text-base font-[400] border border-r-0 border-l-0 border-t-0 border-[#E4E4E4]'>
							<span className='w-[40%] lg:w-3/6'>Product</span>
							<span className='w-1/6'>Price</span>
							<span className='w-1/6'>Quantity</span>
							<span className='w-1/6'>Subtotal</span>
							<span className='w-[8%]'></span>
						</li>
						<ul className='py-3'>
							{items?.map((product: any) => (
								<li
									className='flex w-[550px] md:w-full items-center justify-between py-2'
									key={product?.id}
								>
									<div className='w-[40%] lg:w-3/6 flex items-center gap-1 slg:gap-4'>
										<Picture
											src={product?.image}
											alt='shopping-cart-img'
											className='h-20 w-20 object-contain'
											priority
										/>

										<span
											className='text-xs sm:text-sm font-[400] text-secondary-200 truncate w-[70%]'
											title={product?.name}
										>
											{product?.name}
										</span>
									</div>
									<span className='w-1/6 text-sm sm:text-base'>
										<FormatMoney2 value={product?.price} />
									</span>
									<div className='w-1/6 flex items-center gap-2'>
										<AiOutlineMinusCircle
											className='text-black/70 text-base sm:text-xl cursor-pointer'
											onClick={() => handleMinusClick(product)}
										/>
										<span className='font-[500] text-secondary-400 text-base sm:text-lg'>
											{product?.quantity}
										</span>
										<AiOutlinePlusCircle
											className='text-black/70 text-base sm:text-xl cursor-pointer'
											onClick={(e) => handlePlusClick(e, product)}
										/>
									</div>
									<span className='w-1/6 text-sm sm:text-lg font-semibold text-primary'>
										<FormatMoney2 value={calculateSubtotal(product)} />
									</span>
									<span className='w-[8%]'>
										<BsTrash
											className='text-primary text-lg sm:text-2xl cursor-pointer hover:scale-105 transition'
											onClick={(e) => handleRemoveClick(e, product?.id)}
										/>
									</span>
								</li>
							))}
						</ul>
					</ul>
					<div className='px-6 pt-5 pb-3 flex w-full justify-end '>
						<button
							type='button'
							onClick={handleEmptyCartClick}
							className='flex justify-center items-center py-2 sm:py-3 px-8 sm:px-14 text-sm sm:text-base border border-secondary-400 rounded-md hover:text-white hover:bg-primary transition hover:border-transparent'
						>
							Empty cart
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductTable;
