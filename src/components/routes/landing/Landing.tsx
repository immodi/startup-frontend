import { Context, ContextInterface } from "@/components/util/context";
import { isFirstTimeUser } from "@/helpers/auth/isFirstTimeUser";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingFeatures from "./landing-components/LandingFeatures";
import LandingPageHeader from "./landing-components/LandingHeader";
import LandingSummary from "./landing-components/LandingSummary";
import LandingTitle from "./landing-components/LandingTitle";

const LandingPage: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const navigate = useNavigate();
    const { toggleDarkMode } = context;
    const isDarkMode = context.localState.isDarkMode;

    useEffect(() => {
        if (!isFirstTimeUser()) {
            navigate("/home", { replace: true });
        }
    }, []);

    return (
        <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
            <div className="bg-gray-100 dark:bg-gray-800 transition-all duration-300">
                <LandingPageHeader
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                <main className="container mx-auto px-6 py-12">
                    <LandingTitle />

                    <LandingFeatures />

                    <LandingSummary />
                </main>
            </div>
            <footer
                className={`w-full bg-white dark:bg-gray-900 shadow p-4 text-center text-gray-700 dark:text-gray-300 transition duration-300`}
            >
                <p>
                    © {new Date().getFullYear()} GenPDF. All Rights Reserved.
                </p>
                <div className="mt-2">
                    <a
                        href="/privacy-policy"
                        className="text-blue-500 dark:text-blue-400 hover:underline mx-2"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="/terms-of-service"
                        className="text-blue-500 dark:text-blue-400 hover:underline mx-2"
                    >
                        Terms of Service
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
