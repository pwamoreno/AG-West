import AppLayout from "@src/components/AppLayout";
import Picture from "@src/components/picture/Picture";

const page = () => {
	return (
		<AppLayout>
			<main className='bg-white mx-auto mt-32 md:mt-36 pb-10 slg:pb-32'>
				<section className='flex w-full flex-col items-center pt-7 slg:pt-16 gap-4 px-16 text-center'>
					<h3 className='font-semibold  text-xl md:text-3xl tracking-tighter'>
						About Us
					</h3>
				</section>

				<div className='grid slg:grid-cols-2 mt-2 sm:mt-5 slg:mt-10 px-4 slg:px-16 overflow-hidden'>
					<div className='flex flex-col gap-2'>
						<h3 className='slg:text-2xl text-lg font-semibold text-center slg:text-start'>
							Welcome to our trendhive
						</h3>
						<p className='text-xs sm:text-sm slg:text-base !leading-[180%] text-black'>
							5linx Marts & Services is a distributor of major electronic brands
							in Nigeria. We offer a wide range of high-quality appliances
							designed to meet the diverse needs of our customers. Our products
							include; <br /> Kitchen Appliances, Laundry Appliances, office
							Equipment, Home Comforts such as Air conditioners, heaters, fans
							e.t.c and Home Entertainment Equipment such as TVs, Sound Systems,
							and multimedia devices.
						</p>
						{/* <p className='text-xs sm:text-sm slg:text-base !leading-[180%] text-black'>
							We are a major Distributor to most Manufacturers of FMCG. Our
							Business Model allows you to acquire items to meet urgent and
							medium-term needs, with the option of installment payment. These
							opportunities allow you to purchase your desired products at an
							initial lower cost and pay the balance over a period of time.
							5Linx Marts & Services Ltd. has established relationships with
							some of the top brands that produce Office and Home Appliances and
							allows us the opportunity to provide these appliances to our
							clients at convenient rates spread over a period of time.
						</p> */}
					</div>
					<div className='p-8'>
						<div className='flex gap-4'>
							<div className='flex flex-[.5] flex-col gap-4'>
								<Picture
									src='/images/super-discount-img.png'
									alt=''
									className='rounded-xl object-cover'
								/>
								<Picture
									src='/images/super-discount-img.png'
									alt=''
									className='rounded-xl object-cover'
								/>
							</div>
							<div className='flex-1'>
								<Picture
									src='/images/super-discount-img.png'
									alt=''
									className='rounded-xl object-contain w-full'
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</AppLayout>
	);
};

export default page;
