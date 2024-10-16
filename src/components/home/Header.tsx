import DarkModeIcon from "../ui/DarkMode";
import LightModeIcon from "../ui/LightMode";

interface HeaderProps {
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMenuOpen: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
    setIsMenuOpen,
    isMenuOpen,
    setDarkMode,
    darkMode,
}) => {
    return (
        <header className="w-full bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center transition-colors duration-300">
            <div>
                {/* Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-700 dark:text-white focus:outline-none"
                >
                    {/* Menu Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>
            <h1 className="text-lg font-semibold text-gray-700 dark:text-white transition-colors duration-300">
                Document Generator
            </h1>
            {/* Dark Mode Toggle */}
            <div>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="text-gray-700 dark:text-white focus:outline-none"
                >
                    {/* Dark Mode Icon */}
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </button>
            </div>
        </header>
    );
};

export default Header;
