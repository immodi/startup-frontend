import React, { FormEvent } from "react";
import LandingPageHeader from "../routes/landing/landing-components/LandingHeader";
import { Link } from "react-router-dom";

const ErrorPage: React.FC<{
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}> = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <div className="w-dvw h-dvh">
            <LandingPageHeader
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />
            <div
                className={`
                flex w-full h-full
                transition-all
                bg-gray-100 dark:bg-gray-800 duration-300
                flex-grow items-center justify-center p-5
        `}
            >
                <div
                    className={`bg-white relative bottom-8 dark:bg-gray-800 p-8 flex flex-col justify-center rounded-lg shadow-lg min-h-fit max-w-md w-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
                >
                    <h2
                        className={`text-3xl font-semibold ${isDarkMode ? "text-white" : "text-[#4A00E0]"} mb-4 text-center`}
                    >
                        404 - Page Not Found
                    </h2>
                    <p
                        className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} text-center mb-6`}
                    >
                        Sorry, the page you're looking for doesn't exist.
                    </p>
                    <div className="w-full flex justify-center mt-4">
                        <Link
                            to={`/home`}
                            className={`font-bold py-2 px-5 rounded-md focus:outline-none focus:ring-2 transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white focus:ring-[#2E073F]" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white focus:ring-[#4A00E0]"}`}
                        >
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
