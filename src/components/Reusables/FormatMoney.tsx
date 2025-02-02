export const FormatMoney = (value: number) => {
	const formattedValue = value.toLocaleString("en-NG", {
		style: "currency",
		currency: "NGN",
	});

	const [mainPart, decimalPart] = formattedValue.split(".");

	return (
		<span>
			<span className='text-base sm:text-xl'>{mainPart}</span>
			<span className='text-xs'>{`.${decimalPart}`}</span>
		</span>
	);
};

export const FormatMoney2 = (value: number) => {
	const formattedValue = value?.toLocaleString("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 2, // Adding this option to set minimum fraction digits to 2
		maximumFractionDigits: 2, // Adding this option to set maximum fraction digits to 2
	});

	return <span className=''>{formattedValue}</span>;
};
