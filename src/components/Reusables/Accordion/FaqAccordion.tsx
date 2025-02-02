"use client";
import React, { useState } from "react";
import * as Icons1 from "react-icons/sl";

interface FaqAccordionItemProps {
	id?: number;
	title: string;
	description: string;
}

const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
	title,
	description,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleAccordionToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className='text-[#263646] bg-[#fff] shadow-md transition'>
			<div
				className='flex justify-between items-center shadow-sm py-5 px-4 sm:px-8 text-xs xs:text-sm sm:text-base font-[500] cursor-pointer'
				onClick={handleAccordionToggle}
			>
				<span>{title}</span>
				<div
					style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
					className='transition'
				>
					{isExpanded ? (
						<Icons1.SlArrowUp className='text-sm sm:text-xl transition' />
					) : (
						<Icons1.SlArrowRight className='text-sm sm:text-xl transition' />
					)}
				</div>
			</div>
			<div
				className='px-4 sm:px-8 text-sm sm:text-base text-start'
				style={{
					paddingTop: isExpanded ? "10px" : "0",
					height: isExpanded ? "8rem" : 0,
					opacity: isExpanded ? 1 : 0,
					transition: "height 0.3s, opacity 0.3s",
					overflow: "hidden",
				}}
			>
				{description}
			</div>
		</div>
	);
};

const faqItems: FaqAccordionItemProps[] = [
	{
		id: 1,
		title: "How much is the interest rate?",
		description:
			"Our interest rate ranges from 3% to 5% for items payable in instalments.",
	},
	{
		id: 2,
		title: "How long does it take to receive my order?",
		description:
			"Orders are typically fulfilled within 24 to 48 hours after documentation is completed.",
	},
	{
		id: 3,
		title: "What is the required down payment?",
		description:
			"The down payment varies between 20% to 40% based on the total amount. For items below 200k, a 40% down payment is required, while items 500k and above require a 20-30% down payment.",
	},
	{
		id: 4,
		title: "Do you offer delivery?",
		description:
			"Yes, we provide delivery services nationwide. The delivery cost is determined by the distance to your location.",
	},
	{
		id: 5,
		title: "What are the requirements for purchasing?",
		description:
			"You'll need to provide a completed company form, one guarantor, a valid means of ID, activate your remitter account, and provide a postdated cheque and bank statement.",
	},
	{
		id: 6,
		title: "How can I make payments?",
		description:
			"You can make payments to our company account and share proof of payment with your designated account officer.",
	},
	{
		id: 7,
		title: "Can I make payments in Bits or Incrementally?",
		description:
			"Certainly, payments can be made on a daily, weekly, or monthly basis.",
	},
	{
		id: 8,
		title: "Can I receive my goods after making a payment?",
		description:
			"Yes, you can receive your goods once the initial deposit has been made.",
	},
	{
		id: 9,
		title: "Do your products come with warranty?",
		description:
			"Yes, all of our products include warranty coverage in accordance with the manufacturer's agreement.",
	},
	{
		id: 10,
		title: "Can I pay off my balance early?",
		description:
			"Absolutely, you can pay off your balance early, and you may even receive compensation for early payment.",
	},
	{
		id: 11,
		title: "Is there post-sales support?",
		description:
			"Yes, we provide 100% post-sales support to assist you with any issues or inquiries.",
	},
	// Add more items as needed
];

const FaqAccordion: React.FC = () => {
	return (
		<section className='min-h-screen px-2 xs:px-8 sm:px-16 md:px-32 pt-6 sm:pt-8 pb-6 sm:pb-8 xl:pb-0 xl:pt-10 overflow-hidden'>
			<div className='grid gap-6 mb-12 lg:px-16'>
				{faqItems.map((item) => (
					<FaqAccordionItem
						key={item.id}
						title={item.title}
						description={item.description}
					/>
				))}
			</div>
		</section>
	);
};

export default FaqAccordion;
