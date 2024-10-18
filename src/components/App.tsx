import { useState } from "react";
import "../styles/app.css";
import Header from "./home/Header";
import Menu from "./home/Menu";
import Footer from "./home/Footer";
import Router from "./pages/Router";

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open/close state
    const [authed, setAuthed] = useState(true);
    const [currentPageName, setCurrentPageName] = useState("main");
    const [token, setToken] = useState<string>(import.meta.env.VITE_USER_TOKEN);

    return (
        <div
            className={`${darkMode && "dark"} overflow-x-hidden flex w-screen h-screen flex-col`}
        >
            <Header
                setDarkMode={setDarkMode}
                darkMode={darkMode}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            <Menu
                isDarkMode={darkMode}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                setCurrentPageName={setCurrentPageName}
            />

            <Router
                isMenuOpen={isMenuOpen}
                authed={authed}
                setAuthed={setAuthed}
                isDarkMode={darkMode}
                pageName={currentPageName}
                token={token}
                setCurrentPageName={setCurrentPageName}
            />

            <Footer isDarkMode={darkMode} isMenuOpen={isMenuOpen} />
        </div>
    );
}

export default App;
