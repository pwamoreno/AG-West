import { SEODATA } from "@constants/seoContants";
import AppLayout from "@src/components/AppLayout";
import RegisterForm from "@src/components/Form/RegisterForm";
import { Metadata } from "next";
import React from "react";

const { description, title } = SEODATA.register;
export const metadata: Metadata = {
	title: title,
	description: description,
	icons: SEODATA.defaultOGImage,
	openGraph: {
		images: [
			{
				url: SEODATA.defaultOGImage,
			},
		],
	},
};

const page = () => {
	return (
		<AppLayout>
			<main className='mt-40 mb-20 md:my-44 flex items-center justify-center px-3 md:px-0'>
				<RegisterForm />
			</main>
		</AppLayout>
	);
};

export default page;
