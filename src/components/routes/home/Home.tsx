import { useContext, useEffect, useState } from "react";
import "../../../styles/app.css";
import { UserModel } from "@/interfaces/userModel";
import { useGetToken, UserAuthCookie } from "@/hooks/auth/useToken";
import Header from "./Header";
import Menu from "./Menu";
import Router from "../../util/Router";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { Context, ContextObject } from "@/components/util/context";
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

const Home: React.FC = () => {
    const path = useLocation();
    const context = useContext(Context) as ContextObject;
    const { isDarkMode, toggleDarkMode } = context;

    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open/close state
    const [authed, setAuthed] = useState(false);
    const [currentPageName, setCurrentPageName] = useState(
        path.pathname.slice(1, path.pathname.length),
    );
    const [userData, setUserData] = useState<UserModel | undefined>(
        getLocalUser(),
    );

    useEffect(() => {
        userData?.token !== undefined && setAuthed(true);
    }, [userData]);

    return (
        <div
            className={`${isDarkMode && "dark"} overflow-x-hidden flex w-screen h-screen flex-col`}
        >
            <Header
                darkMode={isDarkMode}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                toggleDarkMode={toggleDarkMode}
            />

            <Menu
                currentPageName={currentPageName}
                isDarkMode={isDarkMode}
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
                isDarkMode={isDarkMode}
                pageName={currentPageName}
                token={userData?.token}
                setCurrentPageName={setCurrentPageName}
            />

            <Footer isDarkMode={isDarkMode} isMenuOpen={isMenuOpen} />
        </div>
    );
};

export default Home;
