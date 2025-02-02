import { SEODATA } from "@constants/seoContants";
import AppLayout from "@src/components/AppLayout";
import ForgotPasswordForm from "@src/components/Form/ForgotPasswordForm";
import LoginForm from "@src/components/Form/LoginForm";
import { Metadata } from "next";
import React from "react";

const { description, title } = SEODATA.forgot_password;
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
				<ForgotPasswordForm />
			</main>
		</AppLayout>
	);
};

export default page;
