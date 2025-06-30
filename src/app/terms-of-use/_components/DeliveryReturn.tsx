import React from "react";

const DeliveryReturn = () => {
	return (
		<div className='text-[#667085]'>
			<h3 className='font-semibold text-sm md:text-base xl:text-lg mb-2'>
				DELIVERY, SHIPPING AND RETURN POLICY
			</h3>

			<p className='text-xs md:text-sm xl:text-base mb-4'>
				Delivering your goods to you swiftly and safely is so important to us.
				We value every single customer and that&apos;s why we trust our
				deliveries to our carefully selected courier. That is also why we
				require that your orders be received and signed for by you, but if you
				will not be there personally, then please let us know if you have an
				alternative (e.g., colleague, neighbors etc.) who will take delivery on
				your behalf.
			</p>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
				<div>
					<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
						Orders Below ₦2,000,000
					</h4>
					<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
						<li>
							Standard Delivery Method costs ₦7,000.00 within Lagos, but may
							vary depending on the size of items purchased
						</li>
						<li>Onforward Delivery Method costs ₦10,000.00 within Lagos</li>
						<li>Order Arrival is (2 - 4 business days) within Lagos</li>
						<li>The cost of Delivery outside Lagos is negotiable</li>
						<li>Order Arrival is (5 - 7 business days) outside Lagos</li>
						<li>
							Orders placed after 12pm will begin processing the next business
							day
						</li>
					</ul>
				</div>

				<div>
					<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
						Orders Above ₦2,000,000
					</h4>
					<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
						<li>Standard Delivery Method is free within Lagos</li>
						<li>Onforward Delivery Method is free within Lagos</li>
						<li>Order Arrival is (2 - 4 business days) within Lagos</li>
						<li>Standard Delivery Method outside Lagos is negotiable</li>
						<li>Order Arrival is (5 - 7 business days) outside Lagos</li>
						<li>
							Orders placed after 12pm will begin processing the next business
							day
						</li>
					</ul>
				</div>
			</div>

			<div className='mb-6'>
				<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
					Other Delivery Information
				</h4>
				<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
					<li>
						Duply is not responsible for any damages caused after delivery
					</li>
					<li>
						Duply bears no responsibility for goods signed by an alternative
						person
					</li>
					<li>
						All claims for shortages or damages must be reported to customer
						service on the day of delivery
					</li>
					<li>We are unable to redirect orders once items have been shipped</li>
					<li>
						If you have any further queries regarding delivery, kindly contact
						our customer service representative through email to{" "}
						<span className='font-medium'>IgweBlessing@duply.com.ng</span>
					</li>
				</ul>
			</div>

			<div>
				<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
					Return Policy
				</h4>
				<p className='text-xs md:text-sm xl:text-base'>
					Our policy includes replacement of factory-defective products.
					However, we want to emphasize that:
				</p>
				<ul className='list-disc pl-5 mt-1 space-y-1 text-xs md:text-sm xl:text-base'>
					<li>We do not assume responsibility for damaged goods after use</li>
					<li>
						We do not take responsibility for damaged products after delivery
						has been confirmed
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DeliveryReturn;
