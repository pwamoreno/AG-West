import React from "react";
import AppLayout from "@src/components/AppLayout";
import Dashboard from "@src/components/Dashboard";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";

const { description, title } = SEODATA.user_dashboard;
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
			<Dashboard />
		</AppLayout>
	);
};

export default page;
