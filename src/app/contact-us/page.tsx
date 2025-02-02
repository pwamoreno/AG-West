import AppLayout from "@src/components/AppLayout";
import ContactCards from "./_components/ContactCards";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";

const { description, title } = SEODATA.contact_us;
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
			<main className='bg-white mx-auto w-full mt-32 md:mt-36 min-h-screen pt-4'>
				<h3 className='font-semibold text-xl sm:text-2xl slg:text-3xl tracking-tighter text-center mt-10'>
					Contact Us
				</h3>

				<div className='flex flex-wrap w-full justify-center gap-8 mt-10 px-4 slg:px-0'>
					<ContactCards />
				</div>
			</main>
		</AppLayout>
	);
};

export default page;
