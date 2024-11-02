import { PageProps } from "@/interfaces/pageProp";
import React from "react";
import { UserModel } from "@/interfaces/userModel";
import Main from "../routes/home/pages/Main";
import { AuthPage } from "../routes/auth/Auth";
import NotFound from "../routes/home/pages/404";
import { useNavigate } from "react-router-dom";

const elements: Map<string, React.FC<PageProps>> = new Map([
    ["home", Main],
    ["profile", AuthPage],
]);

interface RouterProps extends PageProps {
    authed: boolean;
    setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
    setUserData: React.Dispatch<React.SetStateAction<UserModel | undefined>>;
    // setToken: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>;

    pageName: string;
    setCurrentPageName: React.Dispatch<React.SetStateAction<string>>;
    userData: UserModel | undefined;
}

const Router: React.FC<RouterProps> = ({
    pageName,
    authed,
    setAuthed,
    setUserData,
    // setToken,
    userData,
    isDarkMode,
    token,
    isMenuOpen,
    setCurrentPageName,
}) => {
    const Component = elements.get(pageName);
    const navigate = useNavigate();
    const navigateTo = (route: string) => {
        navigate(`/${route}`, { replace: true });
    };

    if (!Component) {
        return (
            <NotFound
                isMenuOpen={isMenuOpen}
                isDarkMode={isDarkMode}
                goHome={() => {
                    setCurrentPageName("home");
                    navigateTo("home");
                }}
            />
        );
    }

    return pageName === "profile" ? (
        <AuthPage
            setUserData={setUserData}
            isMenuOpen={isMenuOpen}
            authed={authed}
            userData={userData}
            // setToken={setToken}
            isDarkMode={isDarkMode}
            setAuthed={setAuthed}
            token={token}
        />
    ) : (
        <Component
            isMenuOpen={isMenuOpen}
            isDarkMode={isDarkMode}
            token={token}
        />
    );
};

export default Router;
