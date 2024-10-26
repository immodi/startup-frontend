import React, { useState, FormEvent } from "react";
import { AuthPageProps } from "./Auth";
import useSignup from "@/hooks/auth/useSignup";
import { UserAuthCookie } from "@/hooks/auth/useToken";
import { UserModel } from "@/interfaces/userModel";
import { LoadingSpinner } from "../ui/Spinner";

const SignupPage: React.FC<
    AuthPageProps & {
        setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
        setUserData?: React.Dispatch<
            React.SetStateAction<UserModel | undefined>
        >;
        setAuthed?: React.Dispatch<React.SetStateAction<boolean>>;
        // setToken?: React.Dispatch<
        //     React.SetStateAction<UserAuthCookie | undefined>
        // >;
    }
> = ({ isDarkMode, setHasAccount, isMenuOpen, setAuthed, setUserData }) => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>(""); // State for error message

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); // Clear any previous error messages
        useSignup(
            username,
            email,
            password,
            confirmPassword,
            setUserData,
            setAuthed,
            setIsLoading,
            setErrorMessage,
        );
        // Handle sign-up logic here (e.g., API call)
    };

    const handleGoogleSignIn = () => {
        // Handle Google sign-up logic
        console.log("Google Sign Up");
    };

    return (
        <div
            className={`
            flex ${isMenuOpen && "translate-x-24"}
            bg-gray-100 dark:bg-gray-800 transition-all duration-300
            flex-grow items-center justify-center p-5
            `}
        >
            <div
                className={`bg-white dark:bg-gray-800 p-8 flex flex-col justify-center rounded-lg shadow-lg min-h-fit max-w-md w-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : ""}`}
            >
                <h2 className="text-2xl text-[#4A00E0] dark:text-white font-semibold text-center mb-6">
                    Create an Account
                </h2>

                {errorMessage && (
                    <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                        {errorMessage}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="text-[#4A00E0] dark:text-white space-y-4"
                >
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={`${isDarkMode ? "bg-gray-700 text-white" : "bg-white"} w-full p-2 border  rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`${isDarkMode ? "bg-gray-700 text-white" : "bg-white"} w-full p-2 border  rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`${isDarkMode ? "bg-gray-700 text-white" : "bg-white"} w-full p-2 border  rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={`${isDarkMode ? "bg-gray-700 text-white" : "bg-white"} w-full p-2 border  rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                        />
                    </div>
                    {/* <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="form-checkbox text-purple-500"
                        />
                        <label className="ml-2 text-sm">
                            I agree to the{" "}
                            <a
                                href="#"
                                className="text-purple-500 hover:underline"
                            >
                                Terms and Conditions
                            </a>
                        </label>
                    </div> */}

                    {!isLoading ? (
                        <button
                            type="submit"
                            className={`w-full ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white focus:ring-[#2E073F]" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white focus:ring-[#4A00E0]"} py-2 rounded-md`}
                        >
                            Sign Up
                        </button>
                    ) : (
                        <div className="w-full flex justify-center items-center min-h-fit">
                            <LoadingSpinner
                                className="w-12 h-12"
                                isDarkMode={isDarkMode}
                            />
                        </div>
                    )}
                </form>
                <div className="relative text-center my-4">
                    <span className="absolute inset-x-0 top-1/2 border-t "></span>
                    <span className="relative text-[#000000] dark:text-white bg-white dark:bg-gray-800 px-3 text-sm ">
                        Or sign up with
                    </span>
                </div>
                <button
                    onClick={handleGoogleSignIn}
                    className={`w-full ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white focus:ring-[#2E073F]" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white focus:ring-[#4A00E0]"} py-2 px-4 rounded-md flex items-center justify-center`}
                >
                    <svg
                        className="right-2 relative"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="24"
                        height="24"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                    </svg>
                    Sign up with Google
                </button>
                <p className="text-sm text-black dark:text-white text-center mt-4">
                    Already have an account?{" "}
                    <a
                        href="#"
                        onClick={(e: FormEvent) => {
                            e.preventDefault();
                            setHasAccount?.(true);
                        }}
                        className="text-[#4A00E0] font-bold dark:text-[#7A1CAC] hover:underline"
                    >
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
