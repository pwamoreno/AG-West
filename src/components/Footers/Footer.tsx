"use client";
import React from "react";
import * as Iconbi from "react-icons/bi";
import { motion } from "framer-motion";
import FooterCard from "../Cards/FooterCard";
import Link from "next/link";
import { ChatServiceIconSvg, FileIconSvg, RocketIconSvg } from "../SvgIcons";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";

interface footerDataProps {
	title: string;
	links: {
		label: string;
		href: string;
		function?: () => void;
	}[];
}

const Footer = () => {
	const { email } = useToken();
	const currentYear = new Date().getFullYear();
	const { data: customer, isLoading, isError } = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer;
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, email);
	const firstName = wc_customer_info?.first_name;
	const footer1socialMediaIcons = [
		{
			id: 1,
			icon: (
				<Iconbi.BiLogoFacebook className='text-lg sm:text-2xl text-white' />
			),
			link: "http://facebook.com/duply/",
			backgroundColor: "bg-[#365493]",
		},
		// {
		// 	id: 2,
		// 	icon: <Iconbi.BiLogoTwitter className='text-lg sm:text-2xl text-white' />,
		// 	link: "#",
		// 	backgroundColor: "bg-[#3CF]",
		// },
		{
			id: 3,
			icon: (
				<Iconbi.BiLogoLinkedin className='text-lg sm:text-2xl text-white' />
			),
			link: "http://instagram.com/duply/",
			backgroundColor: "bg-[#0274B3]",
		},
	];

	const footerCardData = [
		{
			icon: <RocketIconSvg />,
			name: "Delivery Assistance",
			description: "Seller Online Delivery",
		},
		{
			icon: <FileIconSvg />,
			name: "Secure Purchase",
			description: "100% Secure Payment",
		},
		{
			icon: <ChatServiceIconSvg />,
			name: "Unmatched Service",
			description: "Dedicated Support",
		},
	];

	const footerData: footerDataProps[] = [
		{
			title: "Account",
			links: [
				{
					label: firstName ? "Update Account" : "Create Account",
					href: firstName ? "/user/account-details" : "/user/register",
				},
				{
					label: firstName ? "Log Out" : "Login",
					href: firstName ? "" : "/user/login",
					function: firstName ? signOut : () => {},
				},
				{
					label: firstName ? "Change Password" : "Forget Password",
					href: firstName ? "/user/change-password" : "/user/forget-password",
				},
			],
		},
		{
			title: "Information",
			links: [
				{ label: "FAQ", href: "/faq" },
				{ label: "Support", href: "/contact-us" },
			],
		},
		{
			title: "Legal",
			links: [
				{ label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
				{ label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
				{ label: "Delivery & Shipping", href: "/terms-of-use?delivery-return" },
				{ label: "Refund Policy", href: "/terms-of-use?refund-policy" },
			],
		},
	];

	const productCards = footerCardData.map((item, index) => (
		<FooterCard
			key={index}
			icon={item.icon}
			name={item.name}
			description={item.description}
			borderRight={index !== footerCardData.length - 1}
		/>
	));

	const staggerDelay = 0.2;

	return (
		<footer className='bg-white w-full py-2 flex flex-col item-center border-t-[3px] border-primary'>
			<div className='mx-auto max-w-[1400px] w-full hidden slg:block'>
				<section className='flex justify-center gap-16 mt-2'>
					<div className='flex flex-col gap-4 w-[80%]'>
						<LogoImage className='rounded-sm' />
						<span className='text-secondary-300 text-base leading-[1.6] font-[400]'>
							The best store for you!
						</span>

						<div className='flex gap-1'>
							{footer1socialMediaIcons.map((item, index) => (
								<motion.a
									href={item.link}
									key={index}
									className={`p-1 rounded-full ${item.backgroundColor} transition-[.5] hover:!-translate-y-1 hover:scale-110`}
									initial={{ opacity: 0, scale: 1 }} // Initial position (opacity 0, y-axis offset 20px, and slightly smaller)
									animate={{ opacity: 1, scale: 0.8 }} // Target position (fully opaque, no offset, and original size)
									transition={{ delay: index * staggerDelay, duration: 0.5 }} // Stagger the animation delay based on index and set duration
								>
									{item.icon}
								</motion.a>
							))}
						</div>
					</div>

					<div className='flex gap-4 w-full pt-3'>
						{footerData.map((section, index) => (
							<div key={index} className='flex flex-col gap-4 lg:gap-5 w-full'>
								<span className='text-secondary-400 font-[500] text-base leading-[1.6]'>
									{section.title}
								</span>
								{section.links.map((link, linkIndex) => (
									<Link
										key={linkIndex}
										href={link.href}
										onClick={link.function}
										className='text-secondary-500 text-sm font-[400] leading-[1.3] hover:text-primary transition-[.3]'
									>
										{link.label}
									</Link>
								))}
							</div>
						))}
					</div>
				</section>
			</div>

			<div className='justify-center mt-8 mb-2 hidden slg:flex'>
				<hr className='w-full text-[#0000003d]' />
			</div>

			<div className='mx-auto flex w-full flex-col slg:hidden mb-4'>
				<section className='flex flex-col justify-between gap-1 sm:gap-6 mt-2 px-2 xs:px-6 sm:px-10'>
					<div className='flex w-full justify-between items-end gap-4'>
						<div className=''>
							<LogoImage className='w-[100px] lg:w-[120px]' />
							<span className='text-secondary-300 text-xs sm:text-base leading-[1.6] font-[400]'>
								..The best store for you!
							</span>
						</div>

						<div className='flex gap-1 h-fit'>
							{footer1socialMediaIcons.map((item, index) => (
								<motion.a
									href={item.link}
									key={index}
									className={`p-1 rounded-full ${item.backgroundColor} transition-[.5] hover:!-translate-y-1 hover:scale-110`}
									initial={{ opacity: 0, scale: 1 }} // Initial position (opacity 0, y-axis offset 20px, and slightly smaller)
									animate={{ opacity: 1, scale: 0.8 }} // Target position (fully opaque, no offset, and original size)
									transition={{ delay: index * staggerDelay, duration: 0.5 }} // Stagger the animation delay based on index and set duration
								>
									{item.icon}
								</motion.a>
							))}
						</div>
					</div>

					<div className='flex lg:gap-8 w-full pt-3'>
						{footerData.map((section, index) => (
							<div key={index} className='flex flex-col gap-2 sm:gap-5 w-full'>
								<span className='text-secondary-400 font-[500] text-sm sm:text-base leading-[1.6]'>
									{section.title}
								</span>

								{section.links.map((link, linkIndex) => (
									<Link
										key={linkIndex}
										href={link.href}
										className='text-secondary-500 text-xs sm:text-sm font-[400] hover:text-primary transition-[.3] leading-6'
									>
										{link.label}
									</Link>
								))}
							</div>
						))}
					</div>
				</section>
			</div>

			<div className='mx-auto max-w-[1156px]'>
				<div className='flex items-center justify-center py-2'>
					<div className='text-secondary-500 text-[8px] sm:text-[10px] slg:text-xs font-[400] leading-[1.2]'>
						Copyright&nbsp;@ {currentYear}&nbsp;{CompanyName} Alright Reserved.
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
