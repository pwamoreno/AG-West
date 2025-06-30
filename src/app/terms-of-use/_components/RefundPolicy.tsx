import { ReturnPolicyDay } from "@constants";
import { useGeneralSettings } from "@src/components/lib/woocommerce";
import React from "react";

const RefundPolicy = () => {
	const { data: generalSettings, isLoading, isError } = useGeneralSettings();

	const GeneralSettings: WooCommerceSetting[] = generalSettings;

	return (
		<div className='text-[#667085]'>
			<h3 className='font-semibold text-sm md:text-base xl:text-lg mb-2'>
				REFUND POLICY OF DUPLY LIMITED
			</h3>
			<p className='text-xs md:text-sm xl:text-base mb-4'>
				Effective Date: 27 May 2025
			</p>

			<p className='text-xs md:text-sm xl:text-base mb-4'>
				Customer satisfaction is our priority in Duply Limited. This Refund
				Policy explains how we handle returns and refunds for purchases made
				through our e-commerce platform, with payments processed by any of our
				payment facilitators.
			</p>

			<ul className='list-disc pl-5 space-y-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
				<li>
					<span className='font-medium'>1. General Refund Terms</span>
					<ul className='list-disc pl-5 mt-1 space-y-1'>
						<li>
							We offer refunds on eligible items under the following conditions:
						</li>
						<ul className='list-circle pl-5 mt-1 space-y-1'>
							<li>The item is defective, damaged, or not as described</li>
							<li>The wrong item was shipped</li>
							<li>The item was not delivered</li>
							<li>
								You request a return within 4 days of delivery for eligible
								products
							</li>
						</ul>
						<li>
							<strong>Note:</strong> Some items may be non-returnable or
							non-refundable due to hygiene, customization, or clearance
							conditions. These exclusions will be clearly stated on the product
							page.
						</li>
					</ul>
				</li>

				<li>
					<span className='font-medium'>2. Return Conditions</span>
					<p className='mt-1'>To qualify for a refund or exchange:</p>
					<ul className='list-disc pl-5 mt-1 space-y-1'>
						<li>
							Items must be returned unused, in original packaging, with all
							tags, accessories, and documentation intact
						</li>
						<li>
							Returns must be initiated within 5-7 days of receiving the order
						</li>
						<li>You must provide a valid receipt or proof of purchase</li>
					</ul>
				</li>

				<li>
					<span className='font-medium'>3. Items Not Eligible for Refund</span>
					<p className='mt-1'>We do not offer refunds for the following:</p>
					<ul className='list-disc pl-5 mt-1 space-y-1'>
						<li>Final sale or clearance items</li>
						<li>Gift cards</li>
						<li>Perishable goods</li>
						<li>Personalized or custom-made items</li>
						<li>Used items or items not returned in original condition</li>
					</ul>
				</li>

				<li>
					<span className='font-medium'>4. How to Request a Refund</span>
					<p className='mt-1'>To initiate a refund or return:</p>
					<ul className='list-disc pl-5 mt-1 space-y-1'>
						<li>Email: info@duply.com.ng</li>
						<li>Phone: 09030954364</li>
						<li>Returns Page: https://www.duply.com.ng/</li>
					</ul>
					<p className='mt-1'>Include the following in your request:</p>
					<ul className='list-disc pl-5 mt-1 space-y-1'>
						<li>Order number</li>
						<li>Item(s) to be returned</li>
						<li>Reason for return</li>
						<li>Supporting photos (for damaged or incorrect items)</li>
					</ul>
				</li>

				<li>
					<span className='font-medium'>5. Refund Processing</span>
					<p className='mt-1'>Once your return is received and inspected:</p>
					<ul className='list-disc pl-5 mt-1 space-y-1'>
						<li>
							We&apos;ll notify you via email of the approval or rejection of
							your refund
						</li>
						<li>
							If approved, your refund will be processed to the original payment
							method via the payment facilitator utilized within 7-14 business
							days
						</li>
					</ul>
				</li>

				<li>
					<span className='font-medium'>6. Return Shipping</span>
					<ul className='list-disc pl-5 mt-1 space-y-1'>
						<li>
							You are responsible for return shipping costs unless the item was
							defective, damaged, or incorrect
						</li>
						<li>
							We recommend using a trackable shipping method and retaining proof
							of postage
						</li>
					</ul>
				</li>

				<li>
					<span className='font-medium'>7. Exchanges</span>
					<p className='mt-1'>
						We only replace items if they are defective or damaged. If you need
						to exchange it for the same item, contact us as outlined above.
					</p>
				</li>

				<li>
					<span className='font-medium'>8. Dispute Resolution</span>
					<p className='mt-1'>
						If you are unsatisfied with the outcome of your refund request, you
						may escalate the issue to the payment facilitator involved or your
						bank for further assistance.
					</p>
				</li>

				<li>
					<span className='font-medium'>9. Policy Updates</span>
					<p className='mt-1'>
						We reserve the right to update or modify this Refund Policy at any
						time. Changes will be posted to our website and will take effect
						immediately.
					</p>
				</li>
			</ul>

			<div className='mt-6 pt-4 border-t border-gray-200'>
				<h4 className='font-semibold text-xs md:text-sm xl:text-base mb-2'>
					Contact Us
				</h4>
				<p className='text-xs md:text-sm xl:text-base'>
					For questions about returns or refunds:
				</p>
				<ul className='list-disc pl-5 mt-2 space-y-1 text-xs md:text-sm xl:text-base'>
					<li>Duply Limited</li>
					<li>Email: info@duply.com.ng</li>
					<li>Phone: 09030954364</li>
				</ul>
			</div>
		</div>
	);
};

export default RefundPolicy;
