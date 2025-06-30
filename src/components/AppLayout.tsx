import { ReactNode } from "react";
import Header from "./Navbars/Header";
import Footer from "./Footers/Footer";

interface AppLayoutProps {
	children: ReactNode;
	className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
	return (
		<main className={`relative`}>
			<Header />
			<div className={`min-h-screen px-2 sm:px-4 md:px-0 ${className}`}>
				{children}
			</div>
			<Footer />
		</main>
	);
};

export default AppLayout;
