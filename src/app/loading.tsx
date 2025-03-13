import React from "react";
import AppLayout from "@src/components/AppLayout";

const page = () => {
	return (
		<AppLayout>
			<div className='grid place-items-center sm:px-6 lg:px-12 pt-32 lg:pt-44 pb-5 lg:py-32 lg:pb-20'>
				<section className='sm:my-24 lg:my-6 w-full sm:px-4'>
					<div className='w-full h-[280px] lg:h-[340px] bg-gray-200 animate-pulse' />
					<div className='mt-5 space-y-4'>
						<div className='w-full h-[80px] lg:h-[100px] bg-gray-200 animate-pulse' />
						<div className='w-[80%] h-[80px] lg:h-[100px] bg-gray-200 animate-pulse' />
						<div className='w-[60%] h-[80px] lg:h-[100px] bg-gray-200 animate-pulse' />
					</div>
				</section>
			</div>
		</AppLayout>
	);
};

export default page;
