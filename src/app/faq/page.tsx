import AppLayout from "@src/components/AppLayout";
import FaqAccordion from "@src/components/Reusables/Accordion/FaqAccordion";

const page = () => {
	return (
		<AppLayout>
			<main className='bg-white mx-auto mt-32 md:mt-36'>
				<section className='flex w-full flex-col items-center pt-16 slg:px-16 text-center'>
					<h3 className='font-semibold text-xl sm:text-2xl slg:text-4xl tracking-tighter'>
						Frequently Asked Question
					</h3>
					<FaqAccordion />
				</section>
			</main>
		</AppLayout>
	);
};

export default page;
