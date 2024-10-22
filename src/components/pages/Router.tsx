import { PageProps } from "@/interfaces/pageProp";
import Main from "./Main";
import React from "react";
import NotFound from "./404";
import { AuthPage } from "../auth/Auth";
import { User } from "@/interfaces/userModel";

const elements: Map<string, React.FC<PageProps>> = new Map([
    ["main", Main],
    ["profile", AuthPage],
]);

interface RouterProps extends PageProps {
    authed: boolean;
    setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
    setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;

    pageName: string;
    setCurrentPageName: React.Dispatch<React.SetStateAction<string>>;

    userData: User | undefined;
}

const Router: React.FC<RouterProps> = ({
    pageName,
    authed,
    setAuthed,
    setUserData,
    isDarkMode,
    token,
    isMenuOpen,
    setCurrentPageName,
}) => {
    const Component = elements.get(pageName);

    if (!Component) {
        return (
            <NotFound
                isMenuOpen={isMenuOpen}
                isDarkMode={isDarkMode}
                goHome={() => {
                    setCurrentPageName("main");
                }}
            />
        );
    }

    return pageName === "profile" ? (
        <AuthPage
            setUserData={setUserData}
            isMenuOpen={isMenuOpen}
            authed={authed}
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
