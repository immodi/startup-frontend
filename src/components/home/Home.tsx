import { useState } from "react";
import SideBar from "./Menu";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

const Home: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open/close state
    const [token, setToken] = useState<string>(import.meta.env.VITE_USER_TOKEN);

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            {/* Main Container */}
            <div className="w-screen h-screen flex flex-col bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                <Header
                    setDarkMode={setDarkMode}
                    darkMode={darkMode}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                <SideBar
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                <Main token={token} isDarkMode={darkMode} />

                <Footer />
            </div>
        </div>
    );
};

export default Home;
