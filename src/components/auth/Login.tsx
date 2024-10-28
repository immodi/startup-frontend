import React, { useState, FormEvent } from "react";
import { AuthPageProps } from "./Auth";
import useLogin from "@/hooks/auth/useLogin";
import { UserModel } from "@/interfaces/userModel";
import { LoadingSpinner } from "../ui/Spinner";

export const LoginPage: React.FC<
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
> = ({
    setHasAccount,
    isDarkMode,
    isMenuOpen,
    setAuthed,
    setUserData,
    // setToken,
}) => {
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[] | null>(null); // State for error message

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessages(null); // Clear any previous error messages
        useLogin(
            username,
            password,
            rememberMe,
            setUserData,
            setAuthed,
            setIsLoading,
            setErrorMessages,
        );
    };

    const handleGoogleSignIn = () => {
        // Handle Google sign-in logic
        console.log("Google Sign In");
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
                    Welcome Back!
                </h2>

                {errorMessages !== null && (
                    <ul className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
                        <p>{errorMessages[0]}</p>
                        {errorMessages
                            .slice(1, errorMessages.length)
                            .map((error) => {
                                return (
                                    <li className="list-disc mx-6">{error}</li>
                                );
                            })}
                    </ul>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 text-[#000] dark:text-white"
                >
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium"
                        >
                            Username
                        </label>
                        <input
                            type="username"
                            placeholder="Enter your username"
                            id="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`${isDarkMode ? "bg-gray-700 text-white" : "bg-white"} w-full p-2 border  rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                                className="form-checkbox text-purple-500"
                            />
                            <span className="ml-2 text-sm">
                                {isDarkMode ? "Remember me" : "Remember me"}
                            </span>
                        </label>
                        <a
                            href="#"
                            className="text-sm font-bold text-[#4A00E0] dark:text-[#7A1CAC] hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    {!isLoading ? (
                        <button
                            type="submit"
                            className={`w-full ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white focus:ring-[#2E073F]" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white focus:ring-[#4A00E0]"} text-white py-2 px-4 rounded-md`}
                        >
                            Sign In
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
                        Or sign in with
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
                    Log in with Google
                </button>

                <p className="text-sm text-black dark:text-white text-center mt-4">
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="text-[#4A00E0] dark:text-[#7A1CAC] font-bold hover:underline"
                        onClick={(e: FormEvent) => {
                            e.preventDefault();
                            setHasAccount?.(false);
                        }}
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};
