import { useState } from "react";
import "../styles/app.css";
// import MainComponent from "./home/Home";
import { AuthPage } from "./auth/Auth";
import Header from "./home/Header";
import Menu from "./home/Menu";
import Footer from "./home/Footer";
import Main from "./home/Main";

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open/close state
    const [authed, setAuthed] = useState(true);
    const [token, setToken] = useState<string>(import.meta.env.VITE_USER_TOKEN);

    return (
        <div
            className={`${darkMode && "dark"} flex w-screen h-screen flex-col`}
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
            />

            {authed ? (
                <Main token={token} isDarkMode={darkMode} />
            ) : (
                <AuthPage
                    isDarkMode={darkMode}
                    setIsDarkMode={setDarkMode}
                    setAuthed={setAuthed}
                />
            )}

            <Footer />
        </div>
    );
}

export default App;
