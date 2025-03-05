"use client";
import React, { useState } from "react";
import { Form, Field, FormikProvider, useFormik } from "formik";
import { LoginFormModel } from "../config/models";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AUTH_EMAIL, AUTH_TOKEN_KEY } from "@constants";
import Cookies from "js-cookie";
import { GoUnlock } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";
import { useMutation } from "react-query";
import { login } from "@utils/endpoints";
import { toast } from "react-toastify";
import { APICall } from "@utils";
import { useAppDispatch } from "../hooks";
import { authLogin } from "../Redux/Auth";
import Link from "next/link";
import FormToast from "../Reusables/Toast/SigninToast";

interface FormValues {
	email: string;
	password: string;
}

const LoginForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const initialValues: FormValues = {
		email: "",
		password: "",
	};

	const loginMutation = useMutation(
		async (value: FormValues) => {
			const response = await APICall(login, value, true, true);
			return response?.data;
		},
		{
			onSuccess: async (data, variable: FormValues) => {
				const { email, password } = variable;
				const accessToken = data?.data?.token;
				const userData: UserType = data?.data?.user;
				if (accessToken && userData?.roles[0] === "customer") {
					Cookies.set(AUTH_TOKEN_KEY, accessToken);
					Cookies.set(AUTH_EMAIL, userData?.email);
					dispatch(
						authLogin({
							token: accessToken,
							user: userData,
						}),
					);
					router.push("/");
				} else {
					FormToast({
						message: "You can only be a customer to login to this platform.",
						success: false,
					});
				}
			},
			onError: (error: any) => {
				console.error("Login Error:", error);
			},
		},
	);

	const handleLogin = async (
		value: FormValues,
		setSubmitting: (val: boolean) => void,
	) => {
		try {
			setSubmitting(true);
			await loginMutation.mutateAsync(value);
			setSubmitting(false);
		} catch (error) {
			setSubmitting(false);
		}
	};

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: LoginFormModel,
		onSubmit: (values, { setSubmitting }) => {
			handleLogin(values, setSubmitting);
		},
	});

	return (
		<div className='flex flex-col bg-white w-full max-w-[32rem] pt-5 pb-6 md:pb-10 px-3 md:px-10 shadow-lg rounded-xl'>
			<h4 className='text-base md:text-2xl uppercase font-[500]'>Login</h4>
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
							className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none transition-[.5] ease-in focus:border-transparent focus:ring-1 focus:ring-primaryColor-100 ${
								formik.touched.email && formik.errors.email
									? "border-red-500"
									: "border-gray-300"
							}`}
						/>
						{formik.touched.email && formik.errors.email && (
							<div className='text-red-500 mt-1 text-xs sm:text-sm'>
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
								className={`w-full px-2 py-2 md:py-3 font-[400] text-xs md:text-sm rounded-md border border-secondary-800 outline-none focus:border-transparent transition-[.5] ease-in focus:ring-1 focus:ring-primaryColor-100 ${
									formik.touched.password && formik.errors.password
										? "border-red-500"
										: "border-gray-300"
								}`}
							/>
							{formik.touched.password && formik.errors.password && (
								<div className='text-red-500 mt-1 text-xs sm:text-sm'>
									{formik.errors.password}
								</div>
							)}
							<span
								className='absolute top-4 md:top-6 right-2 transform -translate-y-1/2 cursor-pointer transition'
								onClick={togglePasswordVisibility}
							>
								{showPassword ? (
									<FaEye className='text-primary' />
								) : (
									<FaEyeSlash className='text-primary' />
								)}
							</span>
						</div>
					</div>

					<div className='flex w-full'>
						<Link
							href='/user/forget-password'
							className='text-secondary-200 text-xs md:text-[15px] hover:underline underline-offset-4 transition cursor-pointer'
						>
							Forgot Password
						</Link>
					</div>

					<button
						type='submit'
						className={`flex items-center justify-center border relative bg-black2-100 text-white border-transparent hover:border-primary-100 hover:bg-primary-100 hover:text-white hover:border-transparent text-xs sm:text-sm leading-[1.4] font-semibold py-2.5 sm:py-3 w-full rounded-md gap-1.5 transition ${
							formik.isValid
								? "bg-primary cursor-pointer"
								: "bg-primary/60 cursor-not-allowed"
						} ${
							formik.isSubmitting
								? "bg-primary/60 cursor-not-allowed"
								: "bg-primary cursor-pointer"
						}`}
					>
						<GoUnlock
							className={`text-xl ${formik.isSubmitting && "animate-pulse"}`}
						/>
						{formik.isSubmitting ? (
							<ImSpinner2 className='text-xl animate-spin' />
						) : (
							"Login"
						)}
					</button>

					<div className='flex justify-end text-xs md:text-base'>
						<span>Don&rsquo;t Have account?&nbsp;</span>
						<span
							onClick={() => router.push("/user/register")}
							className='text-primary font-semibold hover:underline cursor-pointer transition underline-offset-4'
						>
							Signup Here
						</span>
					</div>
				</Form>
			</FormikProvider>
		</div>
	);
};

export default LoginForm;
