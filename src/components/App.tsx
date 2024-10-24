import { useEffect, useState } from "react";
import "../styles/app.css";
import Header from "./home/Header";
import Menu from "./home/Menu";
import Footer from "./home/Footer";
import Router from "./pages/Router";
import { UserModel } from "@/interfaces/userModel";
import { useGetToken, UserAuthCookie } from "@/hooks/auth/useToken";

const getLocalUser = () => {
    const localUser: UserAuthCookie | undefined = useGetToken();
    if (localUser !== undefined) {
        const user: UserModel = {
            username: localUser.username,
            email: localUser.email,
            created: localUser.joinedAt,
            token: localUser.token,
            avatar: "",
            collectionId: "",
            collectionName: "",
            emailVisibility: true,
            id: "",
            name: "",
            updated: "",
            user_templates: [],
            verified: false,
        };

        return user;
    }

    return undefined;
};

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open/close state
    const [authed, setAuthed] = useState(false);
    const [currentPageName, setCurrentPageName] = useState("main");
    const [userData, setUserData] = useState<UserModel | undefined>(
        getLocalUser(),
    );
    // const [token, setToken] = useState<UserAuthCookie | undefined>(
    //     useGetToken(),
    // );

    useEffect(() => {
        userData?.token !== undefined && setAuthed(true);
    }, [userData]);

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
                token={userData?.token}
                setCurrentPageName={setCurrentPageName}
                // setToken={setToken}
            />

            <Footer isDarkMode={darkMode} isMenuOpen={isMenuOpen} />
        </div>
    );
}

export default App;
