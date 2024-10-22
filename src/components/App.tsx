import { useEffect, useState } from "react";
import "../styles/app.css";
import Header from "./home/Header";
import Menu from "./home/Menu";
import Footer from "./home/Footer";
import Router from "./pages/Router";
import { User } from "@/interfaces/userModel";
import { useGetToken, UserAuthCookie } from "@/hooks/auth/useGetToken";

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open/close state
    const [authed, setAuthed] = useState(false);
    const [currentPageName, setCurrentPageName] = useState("main");
    const [userData, setUserData] = useState<User>();
    const [token, setToken] = useState<UserAuthCookie | undefined>(
        useGetToken(),
    );

    useEffect(() => {
        (token !== undefined || userData?.token !== undefined) &&
            setAuthed(true);
    }, [token]);

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
                setUserData={setUserData}
                userData={userData}
                isMenuOpen={isMenuOpen}
                authed={authed}
                setAuthed={setAuthed}
                isDarkMode={darkMode}
                pageName={currentPageName}
                token={token?.token}
                setCurrentPageName={setCurrentPageName}
                setToken={setToken}
            />

            <Footer isDarkMode={darkMode} isMenuOpen={isMenuOpen} />
        </div>
    );
}

export default App;
