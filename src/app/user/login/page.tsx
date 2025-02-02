import { SEODATA } from "@constants/seoContants";
import AppLayout from "@src/components/AppLayout";
import LoginForm from "@src/components/Form/LoginForm";
import { Metadata } from "next";
import React from "react";

const { description, title } = SEODATA.login;
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
			<main className='mt-40 md:my-48 mb-20 flex items-center justify-center px-3 md:px-0'>
				<LoginForm />
			</main>
		</AppLayout>
	);
};

export default page;
