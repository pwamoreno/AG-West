"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ForgetPasswordFormModel } from "../config/models";
import AuthModal from "../modal/AuthModal";
import { forgotPassword } from "@utils/endpoints";
import { useMutation } from "react-query";
import { APICall } from "@utils";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";

interface FormValues {
	email: string;
}

const ForgotPasswordForm = () => {
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const initialValues: FormValues = {
		email: "",
	};

	const forgotPasswordMutation = useMutation(
		async (value: FormValues) => {
			const response = await APICall(forgotPassword, value, true, true);
			return response?.data;
		},
		{
			onSuccess: async (data, variable: FormValues) => {
				handleOpenModal();
				formik.resetForm();
			},
			onError: (error: any) => {},
		},
	);

	const handleForgotPassword = async (
		value: FormValues,
		setSubmitting: (val: boolean) => void,
	) => {
		try {
			setSubmitting(true);
			await forgotPasswordMutation.mutateAsync(value);
			setSubmitting(false);
		} catch (error) {
			setSubmitting(false);
		}
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: ForgetPasswordFormModel,
		onSubmit: (values, { setSubmitting }) => {
			handleForgotPassword(values, setSubmitting);
		},
	});

	const AuthModalContent = () => (
		<div className='py-8 space-y-6'>
			<h3 className='text-xs sm:text-base md:text-3xl text-primary text-center'>
				Please check your email to reset password!
			</h3>
			<h3
				className='hover:underline text-sm md:text-base cursor-pointer text-center hover:text-primary'
				onClick={() => router.push("/user/login")}
			>
				Click here to go back to Login page
			</h3>
		</div>
	);

	return (
		<>
			<div className='flex flex-col bg-white w-full md:w-[32rem] pt-5 pb-6 md:pb-10 px-3 md:px-10 shadow-lg rounded-xl'>
				<h4 className='text-base md:text-2xl uppercase font-[500]'>
					Forget Password
				</h4>
				<FormikProvider value={formik}>
					<Form className='flex flex-col gap-2 md:gap-4'>
						<div>
							<label
								htmlFor='email'
								className='block font-[400] text-xs md:text-base text-secondary-400 mt-4 mb-1'
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

						<button
							type='submit'
							className={`w-full flex items-center justify-center py-2 md:py-3 text-xs md:text-base mt-3 md:mt-0 transition text-white rounded-sm mb-2 hover:bg-primaryColor-100 ${
								formik.isValid
									? "bg-primary cursor-pointer"
									: "bg-primary/60 cursor-not-allowed"
							}`}
							disabled={!formik.isValid || formik.isSubmitting}
						>
							{formik.isSubmitting ? (
								<ImSpinner2 className='text-xl animate-spin' />
							) : (
								"Send Mail"
							)}
						</button>

						<div className='flex justify-end text-xs md:text-base mt-2 md:mt-0'>
							<span>Already Have account?&nbsp;</span>
							<Link
								href='/user/login'
								className='text-primary font-semibold hover:underline underline-offset-4 cursor-pointer transition'
							>
								Login Here
							</Link>
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

export default ForgotPasswordForm;
