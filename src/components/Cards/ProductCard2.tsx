"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "react-use-cart";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { RiShoppingBagFill } from "react-icons/ri";
import Picture from "../picture/Picture";
import Link from "next/link";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
	id: string | number;
	image: string;
	oldAmount?: string;
	newAmount: string;
	description: string;
	boxShadow?: boolean;
}

const ProductCard2 = ({
	id,
	image,
	oldAmount,
	newAmount,
	description,
	boxShadow,
}: ProductCard2Props) => {
	const router = useRouter();
	const { addItem, removeItem, updateItem, getItem } = useCart();
	const [count, setCount] = useState(0);
	const ID = id.toString();
	const cartItem = getItem(ID);
	const cartItemCount = cartItem ? cartItem.quantity : 0;
	const NewAmount = parseInt(newAmount);
	// const OldAmount = parseInt(oldAmount)
	// const handleClick = () => {
	// 	router.push(`/home-item/product/${description}-${id}`);
	// };

	const handleCartClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCount(count + 1);
		// Adding the first product from the `products` array to the cart
		addItem({
			id: ID,
			name: description,
			price: NewAmount,
			quantity: count,
			image: image,
		});
	};

	const handleMinusCartClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevents the event from propagating further

		const newCount = Math.max(count - 1, 0);

		if (newCount === 0) {
			// If count becomes 0, remove the item from the cart
			removeItem(ID);
		} else {
			// Update the cart item with the new quantity
			updateItem(ID, {
				quantity: newCount,
			});
		}

		setCount(newCount);
	};

	const handlePlusCartClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevents the event from propagating further

		const newCount = count + 1;

		// Adding the product to the cart with the updated quantity
		addItem({
			id: ID,
			name: description,
			price: NewAmount,
			quantity: newCount,
			image: image,
		});

		setCount(newCount);
	};

	const slugDesc = convertToSlug(description);

	return (
		<div
			className={`flex flex-col gap-2 justify-center items-center min-w-[150px] md:min-w-[180px] slg:min-w-[180px] slg:max-w-[180px] h-[200px] sm:h-[230px] slg:h-[260px] cursor-pointer rounded-sm ${
				boxShadow ? "shadow-lg bg-white" : "border-[1px] border-[#bfbfbf4f]"
			} hover:shadow-lg hover:scale-105 transition`}
		>
			<div className='flex-[.8] w-full relative flex items-center justify-center overflow-hidden rounded-t-sm'>
				<Link href={`/home-item/product/${slugDesc}-${id}`} className='w-full'>
					<Picture
						src={image || ""}
						alt={`${description}-image`}
						className='absolute top-0 object-contain object-center h-full w-full'
						loading='eager'
					/>
				</Link>
			</div>
			<div className='flex-[.2] flex w-full flex-col px-2 pb-1'>
				<div className='flex items-center justify-between'>
					<h4 className='text-xs sm:text-base text-primary font-[400] leading-[1.8]'>
						{NewAmount ? <FormatMoney2 value={NewAmount} /> : "Out of Stock"}
					</h4>
					<div
						className={`flex items-center gap-1 rounded-md text-white p-1 text-xs sm:text-sm transition ${
							cartItemCount !== 0 && "bg-primary"
						}`}
					>
						{cartItemCount === 0 ? (
							<RiShoppingBagFill
								className='fill-primary text-2xl'
								onClick={handleCartClick}
							/>
						) : (
							<>
								<AiOutlineMinus onClick={handleMinusCartClick} />
								<span className=''>{cartItemCount}</span>
								<AiOutlinePlus onClick={handlePlusCartClick} />
							</>
						)}
					</div>
				</div>

				<Link
					href={`/home-item/product/${slugDesc}-${id}`}
					dangerouslySetInnerHTML={{ __html: description }}
					className='line-clamp-2 text-xs sm:text-sm text-text_color font-semibold leading-[1.3] w-[8rem]'
				/>
			</div>
		</div>
	);
};

export default ProductCard2;
