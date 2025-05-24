import { ReturnPolicyDay } from "@constants";
import { useGeneralSettings } from "@src/components/lib/woocommerce";
import React from "react";

const RefundPolicy = () => {
	const { data: generalSettings, isLoading, isError } = useGeneralSettings();

	const GeneralSettings: WooCommerceSetting[] = generalSettings;

	return (
		<div className='text-[#667085]'>
			<h3 className='font-semibold text-sm md:text-base xl:text-lg mb-2'>
				Refund & Replacement Policy
			</h3>
			<ul className='list-disc pl-5 space-y-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
				<li>
					<span className='font-medium'>Damaged or Defective Products:</span> We
					replace items with verified
					<strong> factory defects</strong> upon proof (e.g., photos/videos).
					Claims must be submitted within
					<strong> {ReturnPolicyDay} days</strong> of delivery.
				</li>
				<li>
					<span className='font-medium'>Post-Delivery Responsibility:</span>{" "}
					Once delivery is confirmed, we cannot accept responsibility for
					damages during/after use. Inspect orders upon arrival.
				</li>
				<li>
					<span className='font-medium'>Non-Refundable:</span> Damage from
					misuse, accidents, or environmental factors is not eligible for
					refunds/replacements.
				</li>
				<li>
					<span className='font-medium'>Replacement Requests:</span> Email{" "}
					<strong>{GeneralSettings ? GeneralSettings[0]?.value : "N/A"}</strong>
					within <strong>{ReturnPolicyDay} days</strong> with your order number
					and proof of defect.
				</li>
			</ul>
		</div>
	);
};

export default RefundPolicy;
