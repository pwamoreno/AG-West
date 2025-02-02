"use client";
import React, { useEffect, useState } from "react";
import AppLayout from "@src/components/AppLayout";
import { useSearchParams } from "next/navigation";
import { CompanyName } from "@constants";

const Page = () => {
	const searchParams = useSearchParams().toString();
	const search = searchParams.replace(/=$/, "");
	const [activeTab, setActiveTab] = useState<string>("termsOfUse");

	useEffect(() => {
		if (search === "terms-of-use") {
			setActiveTab("termsOfUse");
		} else if (search === "privacy-policy") {
			setActiveTab("privacyPolicy");
		} else if (search === "delivery-return") {
			setActiveTab("deliveryReturn");
		}
	}, [search]);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<AppLayout>
			<main className='bg-white mx-auto mt-32 pb-24'>
				<section className='flex w-full flex-col items-center pt-8 xl:pt-16 gap-2 sm:gap-3 px-4 sm:px-8 md:px-16 text-center'>
					<h4 className='text-black text-base sm:text-xl font-semibold leading-[120%]'>
						Our Policies
					</h4>
					<h3 className='font-semibold text-xl sm:text-2xl md:text-3xl leading-[150%]'>
						{CompanyName} Policies
					</h3>
					<span className='text-xs sm:text-sm xl:text-base leading-[150%] text-gray-400 sm:max-w-3xl slg:max-w-2xl'>
						Your privacy is important to us at {CompanyName}. We respect your
						privacy regarding any information we may collect from you across our
						website.
					</span>
					<div className='flex gap-2 mt-3 xl:mt-8 text-[10px] xs:text-xs sm:text-sm slg:text-base leading-[140%] bg-[#F5F5F5] p-1 rounded-md transition'>
						<button
							className={`px-2 xl:px-4 py-2 rounded-md ${
								activeTab === "termsOfUse"
									? "bg-white text-black"
									: "bg-[#F5F5F5] text-[#667085]"
							}`}
							onClick={() => handleTabClick("termsOfUse")}
						>
							Terms of use
						</button>
						<button
							className={`px-2 xl:px-4 py-2 rounded-md ${
								activeTab === "privacyPolicy"
									? "bg-white text-black"
									: "bg-[#F5F5F5] text-[#667085]"
							}`}
							onClick={() => handleTabClick("privacyPolicy")}
						>
							Privacy Policy
						</button>
						<button
							className={`px-2 xl:px-4 py-2 rounded-md ${
								activeTab === "deliveryReturn"
									? "bg-white text-black"
									: "bg-[#F5F5F5] text-[#667085]"
							}`}
							onClick={() => handleTabClick("deliveryReturn")}
						>
							Delivery & Return
						</button>
					</div>
				</section>
				<div className='flex mx-auto w-full mt-4 md:mt-8 text-base leading-[155%] px-5 sm:px-0 sm:max-w-xl slg:max-w-2xl pb-20'>
					{activeTab === "termsOfUse" && (
						<div id='termsOfUse' className='text-[#667085]'>
							<h4 className='text-base sm:text-xl xl:text-2xl font-semibold text-black capitalize'>
								Our Terms
							</h4>
							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								By using our buy now pay later installment service, you agree to
								the following terms and conditions: You must be at least 18
								years old to use our service. You must have a valid bank account
								or credit/debit card to set up your repayment payment plan.
								Complete compliance with our KYC, including valid means of ID
								and one guarantor. You agree to pay the amount specified in your
								payment plan as at when due.
							</p>
							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								Failure to make a payment as at when due attracts a penalty of
								10%. We do not take responsibility for payment failed or
								declined by the third party. Kindly contact you bank for
								declined or failed payment. We reserve the right to repossess
								the items financed after two consecutive failed payments
								according to the payment plan.
							</p>
						</div>
					)}
					{activeTab === "privacyPolicy" && (
						<div id='privacyPolicy' className='text-[#667085]'>
							<h4 className='text-sm sm:text-xl xl:text-2xl font-semibold text-black'>
								THE DATA WE COLLECT ABOUT YOU
							</h4>
							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								We gather your personal information to tailor our products and
								services to your needs and to analyze and enhance them
								continuously. For marketing and personal data optimization
								purposes, we may acquire, utilize, store, and transfer various
								types of personal data. We collect and retain information you
								provide us with, encompassing identity data, contact data,
								biometric data, delivery address, and financial data.
							</p>
							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								This include:
							</p>
							<ul className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base list-decimal pl-4'>
								<li>
									Contact details (e.g., name, postal addresses, phone numbers,
									and email addresses)
								</li>
								<li>
									Demographic information (e.g., date of birth, age, or age
									range, and gender)
								</li>
								<li>
									Online registration details (e.g., password and authentication
									information)
								</li>
								<li>
									Payment particulars (e.g., credit card details and billing
									address)
								</li>
								<li>
									Information supplied in online questionnaires (e.g., responses
									to customer satisfaction surveys or market research)
								</li>
								<li>Entries/submissions for competitions</li>
								<li>
									In specific instances, your preferences regarding marketing
								</li>
							</ul>

							<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-2'>
								COOKIES
							</h4>
							<p className='mt-1 leading-[1.8] text-xs md:text-sm xl:text-base'>
								We may use cookies and similar technologies to improve your
								experience on our site, personalize content and ads, and analyze
								how our site is used.
							</p>
							<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-2'>
								HOW WE USE YOUR PERSONAL DATA
							</h4>
							<p className='mt-1 leading-[1.8] text-xs md:text-sm xl:text-base'>
								We also use your personal data to develop and improve the
								products and services we offer. We may share your personal
								information with third-party service providers who help us
								process payments, ship orders, and provide customer support.
							</p>
							<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-2'>
								DATA SECURITY
							</h4>
							<p className='mt-1 leading-[1.8] text-xs md:text-sm xl:text-base'>
								We take appropriate measures to protect your personal
								information from unauthorized access, misuse or disclosure. You
								can opt-out of receiving marketing correspondence from us at any
								time by clicking the &quot;unsubscribe&quot; link at the bottom
								of the email. By using our site and services, you consent to our
								privacy policy. If you have any questions or concerns, please
								contact us.
							</p>
						</div>
					)}
					{activeTab === "deliveryReturn" && (
						<div className='text-[#667085]'>
							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								We want to emphasize that we do not assume responsibility for
								damaged goods after use. We also do not take responsibility for
								damage products after delivery has been confirmed. Our policy
								includes replacement of factory-defective products.
							</p>
						</div>
					)}
				</div>
			</main>
		</AppLayout>
	);
};

export default Page;
