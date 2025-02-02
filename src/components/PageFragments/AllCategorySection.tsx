"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroImage } from "@public/images";

const AllCategorySection = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const router = useRouter();

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
	const TotalCatgory = Categories?.length - 1;

	useEffect(() => {
		const fetchCategoryProducts = async () => {
			try {
				setIsLoading(true);

				const filteredCategories = categories
					?.filter((category: CategoryType) => category?.count > 0)
					?.slice(0, 5);

				if (filteredCategories) {
					const productsPromises = filteredCategories.map(
						async (category: CategoryType) => {
							const response = await WooCommerce.get(
								`products?category=${category?.id}`,
							);

							// Check if there is at least one product in the category
							const firstProductImage =
								response?.data.length > 0
									? response?.data[0]?.images[0]?.src
									: null;

							return {
								categoryId: category?.id,
								firstProductImage: firstProductImage, // Store the first product's image
							};
						},
					);

					const productsResults = await Promise.all(productsPromises);

					// Update the state with the first product images mapped by category
					const productsMap = productsResults.reduce(
						(acc: any, result: any) => ({
							...acc,
							[result.categoryId]: result.firstProductImage,
						}),
						{},
					);

					setCategoryProductsMap(productsMap);
				}
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (categories?.length) {
			fetchCategoryProducts();
		}
	}, [categories]);

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);

			sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
			setCurrentIndex((prevIndex) =>
				prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
			);
		}
	};

	const handlePrev = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);
			// console.log(scrollLeft);
			if (scrollLeft > 0) {
				sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
				setCurrentIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex,
				);
			}
		}
	};

	// const handleCategoryClick = (index: number) => {
	// 	const categorySlugId = `${
	// 		convertToSlug(Categories[index]?.name) + "-" + Categories[index]?.id
	// 	}`;
	// 	dispatch(updateCategorySlugId({ categorySlugId }));
	// 	router.push(
	// 		`/category/${
	// 			convertToSlug(Categories[index]?.name) + "-" + Categories[index]?.id
	// 		}`,
	// 	);
	// };

	return (
		<>
			{categoryWpIsLoading && (
				<section className='mb-8'>
					<div className='w-full h-[100px] sm:h-[270px] bg-gray-200 rounded-md animate-pulse' />

					<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 overflow-x-auto hide-scrollbar mt-4 md:mt-6 lg:mt-8 pb-4'>
						<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
						<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
						<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
						<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
					</div>
				</section>
			)}

			{Categories && (
				<>
					<section className='mb-2 md:mb-8'>
						{categoryWpIsLoading ? (
							<div className='w-full h-[100px] sm:h-[270px] bg-gray-200 rounded-md animate-pulse'></div>
						) : (
							// <Link
							// 	href={`${
							// 		"/category/" +
							// 		convertToSlug(Categories[0]?.name) +
							// 		"-" +
							// 		Categories[0]?.id
							// 	}`}
							// 	className='mt-10'
							// >
							<Picture
								// src={Categories[0]?.image?.src}
								src={heroImage}
								alt={"hero-image"}
								className='w-full object-fill h-fit sm:h-[270px] bg-primaryColor-300/40'
							/>
							// </Link>
						)}

						<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 overflow-x-auto hide-scrollbar mt-4 md:mt-6 lg:mt-8'>
							{categoryWpIsLoading ? (
								// Loading state for the smaller images in the grid
								<>
									<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
									<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
									<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
									<div className='w-full h-[50px] sm:h-[150px] bg-gray-200 rounded-md animate-pulse'></div>
								</>
							) : (
								<>
									{Categories[0] && Categories[0]?.image?.src && (
										<Link
											href={`${
												"/category/" +
												convertToSlug(Categories[0]?.name) +
												"-" +
												Categories[0]?.id
											}`}
										>
											<Picture
												src={Categories[0]?.image?.src}
												alt={Categories[0]?.image?.alt}
												className='w-full object-contain sm:object-cover h-fit sm:h-[150px] rounded-md bg-yellow-50'
											/>
										</Link>
									)}
									{Categories[1] && Categories[1]?.image?.src && (
										<Link
											href={`${
												"/category/" +
												convertToSlug(Categories[1]?.name) +
												"-" +
												Categories[1]?.id
											}`}
										>
											<Picture
												src={Categories[1]?.image?.src}
												alt={Categories[1]?.image?.alt}
												className='w-full object-contain sm:object-cover h-fit sm:h-[150px] rounded-md bg-yellow-50'
											/>
										</Link>
									)}
									{Categories[2] && Categories[2]?.image?.src && (
										<Link
											href={`${
												"/category/" +
												convertToSlug(Categories[2]?.name) +
												"-" +
												Categories[2]?.id
											}`}
										>
											<Picture
												src={Categories[2]?.image?.src}
												alt={Categories[2]?.image?.alt}
												className='w-full object-contain sm:object-cover h-fit sm:h-[150px] rounded-md bg-yellow-50'
											/>
										</Link>
									)}
									{Categories[3] && Categories[3]?.image?.src && (
										<Link
											href={`${
												"/category/" +
												convertToSlug(Categories[3]?.name) +
												"-" +
												Categories[3]?.id
											}`}
										>
											<Picture
												src={Categories[3]?.image?.src}
												alt={Categories[3]?.image?.alt}
												className='w-full object-contain sm:object-cover h-fit sm:h-[150px] rounded-md bg-yellow-50'
											/>
										</Link>
									)}
								</>
							)}
						</div>
					</section>

					<div
						className='flex w-full gap-3 sm:gap-6 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar'
						ref={sliderRef}
					>
						{Categories?.map((category: CategoryType) => {
							const productImage: any = categoryProductsMap[category?.id]; // Fetch the first product image

							// Only show categories that have a product image
							if (productImage) {
								return (
									<>
										<HomeCard
											key={category?.id}
											id={category?.id.toString()}
											image={productImage} // Use the first product image
											name={category?.name}
										/>
									</>
								);
							}

							return null;
						})}
					</div>
					{/* </Carousel> */}
				</>
			)}
		</>
	);
};

export default AllCategorySection;
