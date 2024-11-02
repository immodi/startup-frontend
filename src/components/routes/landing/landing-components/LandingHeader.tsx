import DarkModeIcon from "@/components/ui/DarkMode";
import LightModeIcon from "@/components/ui/LightMode";

interface LandingPageHeaderProps {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}

const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({
    toggleDarkMode,
    isDarkMode,
}) => {
    return (
        <header
            className={`w-full pl-5 bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center`}
        >
            <h1 className="text-xl font-semibold text-[#4A00E0] dark:text-white transition-colors duration-300">
                Gen PDF
            </h1>
            {/* Dark Mode Toggle */}
            <div>
                <button
                    onClick={toggleDarkMode}
                    className="text-gray-700 dark:text-white focus:outline-none"
                >
                    {/* Dark Mode Icon */}
                    {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </button>
            </div>
        </header>
    );
};

export default LandingPageHeader;
