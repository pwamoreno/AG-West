import React from "react";
import { IconType } from "react-icons/lib";

interface DashboardCardProps {
    title: string;
    Icon: IconType;
    quantity?: number;
    className: string;
}

const DashboardCard = ({ title, Icon, quantity, className }: DashboardCardProps) => {
	return (
		<div className='flex h-full'>
			<div className='flex items-center border border-[#E4E7EC] gap-2 min-w-[12rem] w-full rounded-lg px-4 py-2'>
				<div
					className={`flex items-center justify-center p-2 rounded-full h-12 w-12 text-xl text-center ${className}`}
				>
					<Icon />
				</div>
				<div>
					<h5 className='leading-none mb-2 text-xs slg:text-base font-[400] text-secondary-300'>
						{title}
					</h5>
					<p className='text-xs slg:text-sm font-semibold leading-none text-secondary-200'>
						{quantity}
					</p>
				</div>
			</div>
		</div>
	);
};

export default DashboardCard;
