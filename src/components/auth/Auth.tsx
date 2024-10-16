import { useState } from "react";
import { LoginPage } from "./Login";
import SignupPage from "./SignUp";

export interface AuthPageProps {
    setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
    setHasAccount?: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthPage: React.FC<AuthPageProps> = ({
    setAuthed,
    isDarkMode,
    setIsDarkMode,
}) => {
    const [hasAccount, setHasAccount] = useState<boolean>(false);

    const authProps: AuthPageProps = {
        setAuthed: setAuthed,
        setHasAccount: setHasAccount,
        isDarkMode: isDarkMode,
        setIsDarkMode: setIsDarkMode,
    };

    return hasAccount ? (
        <LoginPage {...authProps} />
    ) : (
        <SignupPage {...authProps} />
    );
};
