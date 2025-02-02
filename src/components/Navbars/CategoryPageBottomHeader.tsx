"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { RootState } from "../config/store";
import { useSelector } from "react-redux";

const CategoryPageBottomHeader = () => {
	const router = useRouter();
	const pathname = usePathname();
	const match = pathname.match(/\/category\/([^-]+)/);
	let usedWord = null;
	// const usedWord = pathname.split("/").pop();
	if (match && match[1]) {
		usedWord = match[1];
	}

	const capitalizeFirstLetter = (word: string | null) => {
		if (word) {
			// Decode the URL-encoded characters
			const decodedWord = decodeURIComponent(word);

			// Capitalize the first letter and convert the rest to lowercase
			return (
				decodedWord.charAt(0).toUpperCase() + decodedWord.slice(1).toLowerCase()
			);
		}
		return "";
	};

	const formattedLastWord = capitalizeFirstLetter(usedWord);

	return (
		<nav
			className={
				"hidden slg:flex gap-24 justify-center items-center w-full py-4 bg-gray-100 px-32"
			}
		>
			<div className='flex w-full max-w-[1156px] gap-2 text-sm capitalize leading-[1.4] px-36'>
				<h4
					className='text-primary font-[400] cursor-pointer hover:text-primaryColor-100'
					onClick={() => router.push("/")}
				>
					Home
				</h4>
				<span className='text-black'>&gt;</span>
				<h4 className='font-semibold text-secondary-300'>
					All Category &gt; {formattedLastWord}
				</h4>
			</div>
		</nav>
	);
};

export default CategoryPageBottomHeader;
