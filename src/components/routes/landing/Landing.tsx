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
        </div>
    );
};

export default LandingPage;
