import { PageProps } from "@/interfaces/pageProp";
import Main from "./Main";
import React from "react";
import NotFound from "./404";
import SignupPage from "../auth/SignUp";
import { AuthPage } from "../auth/Auth";

const elements: Map<string, React.FC<PageProps>> = new Map([
    ["main", Main],
    ["profile", AuthPage],
]);

interface RouterProps extends PageProps {
    pageName: string;
    setCurrentPageName: React.Dispatch<React.SetStateAction<string>>;
}

const Router: React.FC<RouterProps> = ({
    pageName,
    isDarkMode,
    token,
    setCurrentPageName,
}) => {
    const Component = elements.get(pageName);

    if (!Component) {
        return (
            <NotFound
                isDarkMode={isDarkMode}
                goHome={() => {
                    setCurrentPageName("main");
                }}
            />
        );
    }

    return <Component isDarkMode={isDarkMode} token={token} />;
};

export default Router;
