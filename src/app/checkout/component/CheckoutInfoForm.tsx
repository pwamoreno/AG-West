"use client";
import {
	UserInfo,
	deliveryPaymentResponse,
	filterCustomersByEmail,
	generateUniqueReference,
	initializeOrderPaymentPayLoad,
	initializeOrderPaymentResponse,
	isValidEmail,
} from "@constants";
import {
	maestroImageNameImg1,
	mastercardImageNameImg1,
	visaImg1,
} from "@public/images";
import {
	FormatMoney,
	FormatMoney2,
} from "@src/components/Reusables/FormatMoney";
import FormToast from "@src/components/Reusables/Toast/SigninToast";
import { PaymentOptButton } from "@src/components/buttons";
import {
	useGetUserAccountQuery,
	useInitializeOrderPaymentMutation,
	useOnDeliveryPaymentMutation,
} from "@src/components/config/features/api";
import {
	cardPaymentFormModel,
	checkoutFormModel,
} from "@src/components/config/models";
import { RootState } from "@src/components/config/store";
import useToken from "@src/components/hooks/useToken";
import { useCreateOrder, useCustomer } from "@src/components/lib/woocommerce";
import AuthModal from "@src/components/modal/AuthModal";
import SignupModal from "@src/components/modal/SignupModal";
import Picture from "@src/components/picture/Picture";
import { APICall } from "@utils";
import {
	cardPaymentRedirect,
	createOrderData,
	encryptOrderData,
	payOrder,
} from "@utils/endpoints";
import { City, ICity, State } from "country-state-city";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { SlArrowDown } from "react-icons/sl";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useCart } from "react-use-cart";

interface PaymentFormValues {
	cardNumber: string; // The card number as a string
	expiryMonth: string; // The expiry month as a string
	expiryYear: string; // The expiry year as a string
	cvv: string; // The CVV as a string
}

interface FormValues {
	firstName: string;
	lastName: string;
	email?: string;
	houseAddress?: string;
	phone?: string;
	orderNotes: string;
	city?: string;
	state?: string;
}

const CheckoutInfoForm = () => {
	const { token, email } = useToken();
	const router = useRouter();
	const [citiesForSelectedCountry, setCitiesForSelectedCountry] = useState<
		ICity[]
	>([]);
	const [state, setState] = useState("");
	const [iframeUrl, setIframeUrl] = useState(null);
	const states = State.getStatesOfCountry("NG");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [paymentRef, setPaymentRef] = useState("");
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

	const {
		mutate: createOrder,
		isLoading: isLoadingCreateOrder,
		isError: isErrorCreateOrder,
		data: CreateOrderData,
	} = useCreateOrder();
	const {
		data: customer,
		isLoading: isLoadingCustomer,
		isError: isErrorCustomer,
	} = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer;
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, email);

	const handleClosePaymentModal = () => {
		setIsPaymentModalOpen(false);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
		router.push("/user/login");
	};

	const handleStateChange = (stateCode: string) => {
		const cities = City.getCitiesOfState("NG", stateCode);
		setCitiesForSelectedCountry(cities);
	};
	const { items, emptyCart } = useCart();
	const calculateSubtotal = () => {
		return items.reduce(
			(total, item: any) => total + item?.price * item?.quantity,
			0,
		);
	};
	const calculateTotal = () => {
		return calculateSubtotal();
		// You can add any additional charges or discounts here if needed.
	};

	useEffect(() => {
		if (calculateSubtotal() <= 0) {
			router.push("/");
		}
	}, [calculateSubtotal]);

	const AuthModalContent = () => (
		<>
			<h3 className='text-sm sm:text-base md:text-2xl md:px-12 text-black text-center'>
				Sorry! You have to login to make a request.
			</h3>
		</>
	);

	const orderData = {
		customer_id: wc_customer_info?.id,
		payment_method: "alliance-payment-card",
		payment_method_title: "alliance-payment",
		set_paid: false,
		billing: {
			first_name: wc_customer_info?.first_name,
			last_name: wc_customer_info?.last_name,
			address_1: wc_customer_info?.billing?.address_1,
			city: wc_customer_info?.billing?.city,
			state: wc_customer_info?.billing?.state,
			postcode: wc_customer_info?.billing?.postcode,
			country: wc_customer_info?.billing?.country,
			email: wc_customer_info?.email,
			phone: wc_customer_info?.billing?.phone,
		},
		line_items: items.map((item) => ({
			product_id: item.id,
			quantity: item.quantity,
			price: item.price, // Or any other property required by WooCommerce
		})),
	};

	const payOrderMutation = useMutation(
		async (encryptedPaymentOrder: any) => {
			const response = await APICall(
				payOrder,
				encryptedPaymentOrder,
				true,
				true,
			);
			return response?.data;
		},
		{
			onSuccess: async (data, variable) => {
				const redirectUrl = data?.data?.payment_detail?.redirect_url;
				createOrder(orderData);

				if (redirectUrl) {
					setIframeUrl(redirectUrl); // Set URL to open in iframe
				}
			},
			onError: (error) => {
				console.error("Payment failed:", error);
			},
		},
	);

	const cardPaymentOrderMutation = useMutation(
		async (orderReferenceData: any) => {
			const response = await APICall(
				cardPaymentRedirect,
				orderReferenceData,
				false,
				true,
			);
			return response?.data;
		},
		{
			onSuccess: async (data, variable) => {
				const payOrderRef = {
					data: data,
				};

				await payOrderMutation.mutateAsync(payOrderRef);
			},
			onError: (error: any) => {
				let errorMessage = "An unexpected error occurred. Please try again.";

				// Attempt to extract a more specific error message if available
				if (error?.response?.data?.message) {
					errorMessage = error.response.data.message;
				} else if (error?.message) {
					errorMessage = error.message;
				}

				// Display the error message in the toast notification
				FormToast({
					message: errorMessage,
					success: false, // Set to false since this is an error
				});
			},
		},
	);

	const createdOrderMutation = useMutation(
		async (encrytedData: any) => {
			const response = await APICall(
				createOrderData,
				encrytedData,
				false,
				true,
			);
			return response?.data;
		},
		{
			onSuccess: async (data: OrderPaymentResponse, variable) => {
				setPaymentRef(data?.data?.order?.reference);
				setIsPaymentModalOpen(true);
			},
			onError: (error: any) => {
				let errorMessage = "An unexpected error occurred. Please try again.";

				// Attempt to extract a more specific error message if available
				if (error?.response?.data?.message) {
					errorMessage = error.response.data.message;
				} else if (error?.message) {
					errorMessage = error.message;
				}

				// Display the error message in the toast notification
				FormToast({
					message: errorMessage,
					success: false, // Set to false since this is an error
				});
			},
		},
	);

	const encryptedMutation = useMutation(
		async (data: any) => {
			const response = await APICall(encryptOrderData, data, false, true);
			return response?.data;
		},
		{
			onSuccess: async (data, variable) => {
				const dataPassed = {
					data: data,
				};
				await createdOrderMutation.mutateAsync(dataPassed);
			},
			onError: (error: any) => {
				let errorMessage = "An unexpected error occurred. Please try again.";

				// Attempt to extract a more specific error message if available
				if (error?.response?.data?.message) {
					errorMessage = error.response.data.message;
				} else if (error?.message) {
					errorMessage = error.message;
				}

				FormToast({
					message: errorMessage,
					success: false, // Set to false since this is an error
				});
			},
		},
	);

	const handleFormSubmit = async (
		value: FormValues,
		setSubmitting: (val: boolean) => void,
	) => {
		const dataPayload = {
			Customer: {
				first_name: value?.firstName,
				last_name: value?.lastName,
				mobile: value?.phone?.toString(),
				country: "NG",
				email: value?.email,
			},
			Order: {
				amount: calculateSubtotal(),
				reference: generateUniqueReference(),
				description: value?.orderNotes,
				currency: "NGN",
			},
		};

		if (token) {
			await encryptedMutation.mutateAsync(dataPayload);
		} else {
			setIsModalOpen(true);
		}
	};

	const handleCreateOrder = async (
		value: PaymentFormValues,
		setSubmitting: (val: boolean) => void,
	) => {
		const orderPaymentData = {
			reference: paymentRef,
			payment_option: "C",
			country: "NG",
			card: {
				cvv: value.cvv,
				card_number: value.cardNumber,
				expiry_month: value.expiryMonth,
				expiry_year: value.expiryYear,
			},
		};
		await cardPaymentOrderMutation.mutateAsync(orderPaymentData);
	};

	const initialValues: FormValues = {
		firstName: wc_customer_info?.first_name || "",
		lastName: wc_customer_info?.last_name || "",
		email: wc_customer_info?.email || "",
		houseAddress: wc_customer_info?.billing?.address_1 || "",
		phone: wc_customer_info?.billing?.phone || "",
		orderNotes: "",
		city: wc_customer_info?.billing?.city || "",
		state: state || "",
	};

	// console.log("initialValues", initialValues);
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: checkoutFormModel,
		enableReinitialize: true,
		onSubmit: (values, { setSubmitting }) => {
			handleFormSubmit(values, setSubmitting);
		},
	});

	const paymentInitialValues: PaymentFormValues = {
		cardNumber: "",
		expiryMonth: "",
		expiryYear: "",
		cvv: "",
	};

	const paymentFormik = useFormik({
		initialValues: paymentInitialValues,
		validationSchema: cardPaymentFormModel,
		validateOnChange: false,
		validateOnBlur: true, // validate only on blur
		onSubmit: (values, { setSubmitting }) => {
			handleCreateOrder(values, setSubmitting);
		},
	});

	return (
		<>
			<FormikProvider value={formik}>
				<Form className='flex flex-col xl:flex-row w-full gap-4 mt-3 max-w-[1440px] mx-auto mb-16 slg:mb-64'>
					<div className='mt-2 bg-white px-2 py-4 slg:p-8 flex-1 flex flex-col gap-4 rounded-xl'>
						<h3 className='text-base sm:text-2xl font-[500] text-secondary-400 mb-5'>
							Delivery Information
						</h3>
						<div className='grid md:grid-cols-2 gap-3 sm:gap-8'>
							<div>
								<label
									htmlFor='firstName'
									className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
								>
									First Name <span className='text-red-500'>*</span>
								</label>

								<Field
									type='text'
									id='firstName'
									name='firstName'
									placeholder='Enter first name'
									required
									className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
								/>

								<ErrorMessage
									name={"firstName"}
									component={"div"}
									className='text-red-600 text-xs text-left'
								/>
							</div>
							<div>
								<label
									htmlFor='lastName'
									className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
								>
									Last Name <span className='text-red-500'>*</span>
								</label>

								<Field
									type='text'
									id='lastName'
									placeholder='Enter last name'
									name='lastName'
									required
									className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
								/>

								<ErrorMessage
									name={"lastName"}
									component={"div"}
									className='text-red-600 text-xs text-left'
								/>
							</div>
						</div>

						<div className='grid mt-4 gap-4'>
							<div>
								<label
									htmlFor='state'
									className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
								>
									State
								</label>

								<div className='relative'>
									<Field
										as='select'
										name='state'
										className='w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in appearance-none cursor-pointer'
										onChange={(event: any) => {
											const selectedValue = event.target.value;
											setState(selectedValue);
											handleStateChange(
												event.target.selectedOptions[0].dataset.isocode,
											);
										}}
									>
										<option value='' data-isocode=''>
											Select State
										</option>
										{states.map((stateName: any, index: number) => (
											<option
												key={index}
												value={stateName.name}
												data-isocode={stateName.isoCode}
											>
												{stateName.name}
											</option>
										))}
									</Field>
									<span className='absolute inset-y-0 right-2 flex items-center pr-2 pointer-events-none'>
										<SlArrowDown className='cursor-pointer z-4' />
									</span>
								</div>
								<ErrorMessage
									name={"state"}
									component={"div"}
									className='text-red-600 text-xs text-left'
								/>
							</div>
							<div>
								<label
									htmlFor='city'
									className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
								>
									Select City
								</label>
								<div className='relative'>
									<Field
										as='select'
										name='city'
										className='w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in appearance-none cursor-pointer'
									>
										<option value=''>Select your city</option>
										{citiesForSelectedCountry.map((cityName, index) => (
											<option key={index} value={cityName.name}>
												{cityName.name}
											</option>
										))}
									</Field>

									<span className='absolute inset-y-0 right-2 flex items-center pr-2 pointer-events-none'>
										<SlArrowDown className='cursor-pointer z-4' />
									</span>
								</div>
								<ErrorMessage
									name={"city"}
									component={"div"}
									className='text-red-600 text-xs text-left'
								/>
							</div>
							<div>
								<label
									htmlFor='email'
									className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
								>
									Email Address <span className='text-red-500'>*</span>
								</label>

								<Field
									type='text'
									id='email'
									name='email'
									placeholder='Enter email address'
									required
									className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
								/>
								<ErrorMessage
									name={"email"}
									component={"div"}
									className='text-red-600 text-xs text-left'
								/>
							</div>
							<div>
								<label
									htmlFor='houseAddress'
									className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
								>
									House Address <span className='text-red-500'>*</span>
								</label>
								<Field
									type='text'
									id='houseAddress'
									name='houseAddress'
									placeholder='Enter street address'
									className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
								/>
								<ErrorMessage
									name={"houseAddress"}
									component={"div"}
									className='text-red-600 text-xs text-left'
								/>
							</div>
							<div>
								<label
									htmlFor='phone'
									className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
								>
									Phone <span className='text-red-500'>*</span>
								</label>
								<Field
									type='number'
									id='phone'
									name='phone'
									placeholder='Enter Phone Number'
									className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
								/>
								<ErrorMessage
									name={"phone"}
									component={"div"}
									className='text-red-600 text-xs text-left'
								/>
							</div>

							<div>
								<label
									htmlFor='orderNotes'
									className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
								>
									Order notes <span className='text-red-500'>*</span>
								</label>

								<Field
									type='textArea'
									id='orderNotes'
									name='orderNotes'
									placeholder='Notes about your order, e.g. special notes for delivery.'
									rows={5}
									className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
								/>
								<ErrorMessage
									name={"orderNotes"}
									component={"div"}
									className='text-red-600 text-xs text-left'
								/>
							</div>
						</div>
					</div>

					<div className='flex-[.4] flex flex-col'>
						<div className='mt-2 bg-white px-3 sm:px-8 py-5 rounded-xl'>
							<h4 className='font-semibold text-base sm:text-lg text-secondary-400'>
								Payment Method -{" "}
								<span className='text-primary'>Alliancepay</span>
							</h4>
						</div>
						<div className='mt-2 bg-white px-4 py-6 sm:py-12 rounded-xl'>
							<h5 className='text-base sm:text-2xl font-semibold mb-3 sm:mb-6'>
								Your Order
							</h5>
							<div className='flex justify-between items-center text-sm sm:text-base font-[400] pb-4'>
								<h4>Subtotal</h4>
								<h4>{FormatMoney2(calculateSubtotal())}</h4>
							</div>

							<div className='flex justify-between items-center mt-3 pb-4'>
								<h4 className='text-sm sm:text-base font-bold text-secondary-400'>
									Total
								</h4>
								<h4 className='text-base sm:text-xl font-bold text-secondary-400'>
									{FormatMoney(calculateTotal())}
								</h4>
							</div>
							<button
								type='submit'
								className={`flex w-full justify-center items-center py-2 sm:py-3 px-14 mt-2 sm:mt-4 rounded-md text-white transition font-bold text-base ${
									formik.isValid
										? "bg-primaryColor-100 cursor-pointer"
										: "cursor-not-allowed bg-primary/60"
								}`}
								disabled={encryptedMutation?.isLoading || !formik.isValid}
								// onClick={handleFormSubmit}
							>
								{encryptedMutation?.isLoading ? (
									<ClipLoader color='#d4d3d3' size={20} />
								) : (
									"Place Order"
								)}
							</button>
						</div>
					</div>
				</Form>
			</FormikProvider>

			<SignupModal
				isOpen={isModalOpen ? true : false}
				onClose={handleCloseModal}
				setIsOpen={setIsModalOpen}
				content={<AuthModalContent />}
				buttonText='Login'
			/>

			<AuthModal
				isOpen={isPaymentModalOpen}
				onClose={handleClosePaymentModal}
				content={
					<FormikProvider value={paymentFormik}>
						<Form className='flex flex-col xl:flex-row w-full gap-4 mt-3 max-w-[1440px] mx-auto mb-3'>
							<div className='px-2 py-4 slg:p-5 flex-1 flex flex-col gap-4 rounded-xl'>
								<h3 className='text-xs sm:text-base md:text-lg text-primary text-center'>
									Please input card information
								</h3>
								<div className='grid md:grid-cols-2 gap-3 sm:gap-8'>
									{/* Card Number Field */}
									<div>
										<label
											htmlFor='cardNumber'
											className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
										>
											Card Number <span className='text-red-500'>*</span>
										</label>
										<Field
											type='tel' // Use tel for numeric input
											id='cardNumber'
											name='cardNumber'
											placeholder='Enter card number'
											required
											maxLength={16} // Restrict length for card number
											className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
										/>
										<ErrorMessage
											name={"cardNumber"}
											component={"div"}
											className='text-red-600 text-xs text-left'
										/>
									</div>

									{/* Expiry Month Field */}
									<div>
										<label
											htmlFor='expiryMonth'
											className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
										>
											Expiry Month <span className='text-red-500'>*</span>
										</label>
										<Field
											type='text'
											id='expiryMonth'
											name='expiryMonth'
											placeholder='MM'
											required
											maxLength={2} // Limit length to 2 digits
											className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
										/>
										<ErrorMessage
											name={"expiryMonth"}
											component={"div"}
											className='text-red-600 text-xs text-left'
										/>
									</div>

									{/* Expiry Year Field */}
									<div>
										<label
											htmlFor='expiryYear'
											className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
										>
											Expiry Year <span className='text-red-500'>*</span>
										</label>
										<Field
											type='text'
											id='expiryYear'
											name='expiryYear'
											placeholder='YY'
											required
											maxLength={2} // Limit length to 2 digits
											className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
										/>
										<ErrorMessage
											name={"expiryYear"}
											component={"div"}
											className='text-red-600 text-xs text-left'
										/>
									</div>

									{/* CVV Field */}
									<div>
										<label
											htmlFor='cvv'
											className='block font-[500] text-xs sm:text-base text-secondary-400 mb-2'
										>
											CVV <span className='text-red-500'>*</span>
										</label>
										<Field
											type='password' // Use password for CVV
											id='cvv'
											name='cvv'
											placeholder='Enter CVV'
											required
											maxLength={4} // CVV can be 3 or 4 digits
											className={`w-full p-2 sm:py-3 font-[400] text-xs sm:text-base rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in`}
										/>
										<ErrorMessage
											name={"cvv"}
											component={"div"}
											className='text-red-600 text-xs text-left'
										/>
									</div>
								</div>

								<button
									type='submit'
									className={`bg-primary px-8 mt-4 md:px-0 md:w-4/5 max-w-[11rem] py-2 mx-auto text-white rounded-md hover:bg-primaryColor-100 text-xs md:text-base`}
								>
									{payOrderMutation.isLoading ? (
										<ImSpinner2 className='text-xl animate-spin mx-auto' />
									) : (
										"Proceed to Payment"
									)}
								</button>
							</div>
						</Form>
					</FormikProvider>
				}
			/>

			{/* Conditionally render the iframe modal */}
			{iframeUrl && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-md w-11/12 max-w-2xl p-4'>
						<iframe
							src={iframeUrl}
							width='100%'
							height='600px'
							title='Payment'
							className='rounded-md'
						/>
						<button
							onClick={() => {
								emptyCart();
								setIframeUrl(null);
								setIsPaymentModalOpen(false);
							}}
							className='mt-4 bg-red-500 text-white py-1 px-4 rounded'
						>
							Close
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default CheckoutInfoForm;
