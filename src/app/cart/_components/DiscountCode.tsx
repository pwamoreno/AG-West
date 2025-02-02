"use client";
import CheckoutSummarySection from "@src/components/PageFragments/CheckoutSummarySection";
import { useGetCouponQuery } from "@src/components/config/features/api";
import useToken from "@src/components/hooks/useToken";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useCart } from "react-use-cart";

const DiscountCode = () => {
	const [discountCode, setDiscountCode] = useState("");
	const [discount, setDiscount] = useState(0);
	const { token } = useToken();
	const { items } = useCart();

	const calculateSubtotal = () => {
		return items.reduce(
			(total, item: any) => total + item.price * item.quantity,
			0,
		);
	};

	// console.log(userCoupon)
	const handleApplyCoupon = () => {
		if (userCoupon) {
			setDiscount(userCoupon.value);
		}
	};

	const { data: userCoupon, isLoading } = useGetCouponQuery({
		token: token,
		code: discountCode,
		price: calculateSubtotal(),
	});

	// console.log(userCoupon, "userCoupon");
	return <CheckoutSummarySection calculateSubtotal={calculateSubtotal} />;
};

export default DiscountCode;
