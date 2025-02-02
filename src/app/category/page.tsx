"use client";
import AppLayout from "@src/components/AppLayout";
import MainCategoryContent from "@src/components/PageFragments/MainCategoryContent";
import MainCategorySection from "@src/components/PageFragments/MainCategorySection";
import PriceRangeSection from "@src/components/PageFragments/PriceRangeSection";
import SearchNSortSection from "@src/components/PageFragments/SearchNSortSection";
import React from "react";

const page = () => {
	return (
		<AppLayout>
			<main className='flex flex-col slg:flex-row gap-4 w-full mt-40 slg:mt-44 px-2 sm:px-6 mx-auto'>
				<MainCategoryContent />
			</main>
		</AppLayout>
	);
};

export default page;
