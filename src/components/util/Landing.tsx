import { useEffect, useState } from "react";
import LandingPageHeader from "./landing-components/LandingHeader";
import LandingSummary from "./landing-components/LandingSummary";
import LandingFeatures from "./landing-components/LandingFeatures";
import LandingTitle from "./landing-components/LandingTitle";
import useLocalStorageState from "@/hooks/local-data/useLocalData";

export default function LandingPage() {
    const [localState, setLocalState, clearLocalState] = useLocalStorageState();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (localState.isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        setIsDarkMode(localState.isDarkMode);
    }, [localState.isDarkMode]);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        setLocalState((prev) => ({ ...prev, isDarkMode: newDarkMode }));
        document.documentElement.classList.toggle("dark", newDarkMode);
    };

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
}
