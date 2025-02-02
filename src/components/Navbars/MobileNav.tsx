"use client";
import React, { useState } from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { convertToSlug, headerNavLinks } from "@constants";
import { usePathname, useRouter } from "next/navigation";
import { useGetMainCategoryQuery } from "../config/features/api";
import { useCategories } from "../lib/woocommerce";

interface MobileNavProps {
	closeDrawer: () => void;
	drawerVisible: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
	closeDrawer,
	drawerVisible,
}) => {
	// State to hold products by category
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories;
	const [activeTab, setActiveTab] = useState<string>("allCategory");
	const pathname = usePathname();
	const router = useRouter();

	console.log("object Categories", Categories);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<AnimatePresence>
			{drawerVisible && (
				<motion.div
					initial={{ x: "-100%" }}
					animate={{ x: 0 }}
					exit={{ x: "-100%" }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					<Drawer
						width='100%'
						open={drawerVisible}
						onClose={closeDrawer}
						placement={"left"}
					>
						<div className='flex flex-col gap-2 py-4 px-8 items-center'>
							<button onClick={closeDrawer} className='self-end'>
								<IoMdClose
									size={34}
									className='hover:scale-125 transition text-primary'
								/>
							</button>
							<div className='flex w-fit gap-2 mt-4 text-base leading-[140%] bg-[#F5F5F5] p-1 rounded-md transition'>
								<motion.button
									initial={{ scale: 1 }}
									whileHover={{ scale: 1.05 }}
									className={`px-4 py-2 rounded-md ${
										activeTab === "allCategory"
											? "bg-white text-black"
											: "bg-[#F5F5F5] text-[#667085]"
									}`}
									onClick={() => handleTabClick("allCategory")}
								>
									All Category
								</motion.button>
								<motion.button
									initial={{ scale: 1 }}
									whileHover={{ scale: 1.05 }}
									className={`px-4 py-2 rounded-md ${
										activeTab === "others"
											? "bg-white text-black"
											: "bg-[#F5F5F5] text-[#667085]"
									}`}
									onClick={() => handleTabClick("others")}
								>
									Others
								</motion.button>
							</div>
							<div className='flex w-full flex-col gap-4 text-lg px-3 pt-3'>
								{activeTab === "allCategory" && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className='flex flex-col gap-4 mt-3 text-base font-semibold text-secondary-200'
									>
										{Categories &&
											Categories.filter(
												(item) => item.name.toLowerCase() !== "uncategorized",
											).map((item) => {
												return (
													<span
														onClick={() =>
															router.push(
																`${
																	"/category/" +
																	convertToSlug(item?.name) +
																	"-" +
																	item?.id
																}`,
															)
														}
														key={item?.id}
														className='cursor-pointer hover:text-primary transition'
														dangerouslySetInnerHTML={{ __html: item?.name }}
													/>
												);
											})}
									</motion.div>
								)}
								{activeTab === "others" && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className='flex flex-col gap-4 mt-3 text-base font-semibold text-secondary-200'
									>
										{headerNavLinks.map((link) => (
											<Link
												key={link.id}
												href={link.href}
												className={`text-base w-fit font-[500] leading-[1.8] transition hover:text-primary relative group ${
													pathname === link.href
														? "text-primary"
														: "text-secondary-400"
												}`}
											>
												{link.text}
												<span
													className={`h-[1px] inline-block bg-effect absolute left-0 -bottom-0 group-hover:w-full transition-width ease duration-300 ${
														pathname === link.href ? "w-full" : "w-0"
													}`}
												>
													&nbsp;
												</span>
											</Link>
										))}
									</motion.div>
								)}
							</div>
						</div>
					</Drawer>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MobileNav;
