import { useState } from "react";
import { LoginPage } from "./Login";
import SignupPage from "./SignUp";

export interface AuthPageProps {
    setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
    setHasAccount?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthPage: React.FC<AuthPageProps> = ({ setAuthed }) => {
    const [hasAccount, setHasAccount] = useState<boolean>(false);

    const authProps: AuthPageProps = {
        setAuthed: setAuthed,
        setHasAccount: setHasAccount,
    };

    return hasAccount ? (
        <LoginPage {...authProps} />
    ) : (
        <SignupPage {...authProps} />
    );
};
