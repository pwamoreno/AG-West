"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import { RegisterFormModel } from "../config/models";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useVerifyEmailMutation } from "../config/features/api";
import { verifyEmailPayLoad, verifyEmailResponse } from "@constants";
import FormToast from "../Reusables/Toast/SigninToast";
import { ClipLoader } from "react-spinners";
import { MarkUpIconSvg } from "../SvgIcons";
import AuthModal from "../modal/AuthModal";
import useToken from "../hooks/useToken";
import { useMutation } from "react-query";
import { APICall } from "@utils";
import { register } from "@utils/endpoints";
import { ImSpinner2 } from "react-icons/im";

interface FormValues {
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	password: string;
}

const RegisterForm = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		router.push("/user/register");
	};
	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const signUpMutation = useMutation(
		async (value: FormValues) => {
			const response = await APICall(register, value, true, true);
			return response?.data;
		},
		{
			onSuccess: async (data) => {
				formik.resetForm();
				router.push("/user/login");
			},
			onError: (error: any) => {
				// toast.error(error.message);
			},
		},
	);

	const handleSignUp = async (
		values: FormValues,
		setSubmitting: (val: boolean) => void,
	) => {
		try {
			setSubmitting(true);

			// console.log("values", values);
			await signUpMutation.mutateAsync(values);
			setSubmitting(false);
		} catch (error) {
			setSubmitting(false);
		}
	};

	const initialValues: FormValues = {
		first_name: "",
		last_name: "",
		email: "",
		username: "",
		password: "",
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: RegisterFormModel,
		onSubmit: (values, { setSubmitting }) => {
			handleSignUp(values, setSubmitting);
		},
	});

	const handleVerifyEmailData = (data: verifyEmailResponse) => {
		// console.log(data);
		// router.push("/");
		handleOpenModal();
		formik.resetForm();
		// router.push("/user/register-check-mail");
		FormToast({
			message: data.message,
			success: true,
		});
	};

	const AuthModalContent = () => (
		<>
			<h3 className='text-sm sm:text-base md:text-2xl text-black text-center'>
				Email was sent to your mail to continue registration
			</h3>
			<h3 className='hover:underline text-xs sm:text-sm md:text-base cursor-pointer hover:text-primary'>
				Click here to go back to registration page
			</h3>
		</>
	);

	return (
		<>
			<div className='flex flex-col bg-white w-full max-w-[32rem] pt-3 pb-5 md:pb-10 px-3 md:px-10 shadow-lg rounded-xl'>
				<h4 className='text-base md:text-2xl uppercase font-[500]'>Register</h4>
				<FormikProvider value={formik}>
					<Form className='flex flex-col gap-2 md:gap-3'>
						<div>
							<label
								htmlFor='first_name'
								className='block font-[400] text-xs md:text-base text-secondary-400 mt-2 mb-1'
							>
								First Name <span className='text-red-500'>*</span>
							</label>

							<Field
								type='text'
								id='first_name'
								name='first_name'
								placeholder='Enter your full name'
								className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
									formik.touched.first_name && formik.errors.first_name
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{formik.touched.first_name && formik.errors.first_name && (
								<div className='text-red-500 mt-1 text-xs sm:text-base'>
									{formik.errors.first_name}
								</div>
							)}
						</div>
						<div>
							<label
								htmlFor='last_name'
								className='block font-[400] text-xs md:text-base text-secondary-400 mt-2 mb-1'
							>
								Last Name <span className='text-red-500'>*</span>
							</label>

							<Field
								type='text'
								id='last_name'
								name='last_name'
								placeholder='Enter your full name'
								className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
									formik.touched.last_name && formik.errors.last_name
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{formik.touched.last_name && formik.errors.last_name && (
								<div className='text-red-500 mt-1 text-xs sm:text-base'>
									{formik.errors.last_name}
								</div>
							)}
						</div>
						<div>
							<label
								htmlFor='username'
								className='block font-[400] text-xs md:text-base text-secondary-400 mb-1'
							>
								Username <span className='text-red-500'>*</span>
							</label>

							<Field
								type='text'
								id='username'
								name='username'
								placeholder='Enter username'
								className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
									formik.touched.username && formik.errors.username
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{formik.touched.username && formik.errors.username && (
								<div className='text-red-500 mt-1 text-xs sm:text-base'>
									{formik.errors.username}
								</div>
							)}
						</div>
						<div>
							<label
								htmlFor='email'
								className='block font-[400] text-xs md:text-base text-secondary-400 mb-1'
							>
								Email address <span className='text-red-500'>*</span>
							</label>

							<Field
								type='text'
								id='email'
								name='email'
								placeholder='Enter your email address'
								className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
									formik.touched.email && formik.errors.email
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{formik.touched.email && formik.errors.email && (
								<div className='text-red-500 mt-1 text-xs sm:text-base'>
									{formik.errors.email}
								</div>
							)}
						</div>
						<div>
							<label
								htmlFor='password'
								className='block font-[400] text-xs md:text-base text-secondary-400 mb-1'
							>
								Password <span className='text-red-500'>*</span>
							</label>

							<div className='relative'>
								<Field
									type={showPassword ? "text" : "password"}
									id='password'
									name='password'
									placeholder='Enter your password'
									className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-secondary-800 transition-[.5] ease-in ${
										formik.touched.password && formik.errors.password
											? "border-red-500"
											: "border-gray-300"
									}`}
								/>
								{formik.touched.password && formik.errors.password && (
									<div className='text-red-500 mt-1 text-xs sm:text-base'>
										{formik.errors.password}
									</div>
								)}
								<span
									className='absolute top-4 md:top-6 right-2 transform -translate-y-1/2 cursor-pointer transition'
									onClick={togglePasswordVisibility}
								>
									{showPassword ? (
										<FaEyeSlash className='text-primary' />
									) : (
										<FaEye className='text-primary' />
									)}
								</span>
							</div>
						</div>

						<button
							type='submit'
							className={`w-full flex items-center justify-center py-2 md:py-3 text-sm md:text-base mt-3 md:mt-0 transition text-white rounded-sm mb-2 hover:bg-primaryColor-100 ${
								formik.isValid
									? "bg-primary cursor-pointer"
									: "bg-primary/60 cursor-not-allowed"
							}`}
							disabled={!formik.isValid || formik.isSubmitting}
						>
							{formik.isSubmitting ? (
								<ImSpinner2 className='text-xl animate-spin' />
							) : (
								"Register"
							)}
						</button>

						<div className='flex justify-end text-xs md:text-base'>
							<span>Already Have account?&nbsp;</span>
							<span
								onClick={() => router.push("/user/login")}
								className='text-primary font-semibold hover:underline cursor-pointer transition'
							>
								Login Here
							</span>
						</div>
					</Form>
				</FormikProvider>
			</div>
			<AuthModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				content={<AuthModalContent />}
			/>
		</>
	);
};

export default RegisterForm;
