import LandingPageHeader from "./landing-components/LandingHeader";
import LandingSummary from "./landing-components/LandingSummary";
import LandingFeatures from "./landing-components/LandingFeatures";
import LandingTitle from "./landing-components/LandingTitle";
import { useContext } from "react";
import { Context, ContextObject } from "@/components/util/context";

const LandingPage: React.FC = () => {
    const context = useContext(Context) as ContextObject;
    const { isDarkMode, toggleDarkMode } = context;

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
