import { useState } from "react";
import { LoginPage } from "./Login";
import SignupPage from "./SignUp";
import { PageProps } from "@/interfaces/pageProp";
import Profile from "../pages/Profile";

export interface AuthPageProps extends PageProps {
    authed?: boolean;
    setAuthed?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthPage: React.FC<AuthPageProps> = ({
    authed,
    setAuthed,
    isMenuOpen,
    isDarkMode,
}) => {
    const [hasAccount, setHasAccount] = useState<boolean>(false);

    const authProps: AuthPageProps & {
        setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
    } = {
        isMenuOpen: isMenuOpen,
        setHasAccount: setHasAccount,
        setAuthed: setAuthed,
        isDarkMode: isDarkMode,
    };

    return authed === false ? (
        hasAccount ? (
            <LoginPage {...authProps} />
        ) : (
            <SignupPage {...authProps} />
        )
    ) : (
        <Profile isMenuOpen={isMenuOpen} isDarkMode={isDarkMode} />
    );
};
