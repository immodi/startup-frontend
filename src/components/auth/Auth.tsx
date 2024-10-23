import { useState } from "react";
import { LoginPage } from "./Login";
import SignupPage from "./SignUp";
import { PageProps } from "@/interfaces/pageProp";
import Profile from "../pages/Profile";
import { UserModel } from "@/interfaces/userModel";
import { UserAuthCookie } from "@/hooks/auth/useToken";

export interface AuthPageProps extends PageProps {
    authed?: boolean;
    setUserData?: React.Dispatch<React.SetStateAction<UserModel | undefined>>;
    setAuthed?: React.Dispatch<React.SetStateAction<boolean>>;
    setToken?: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>;
    goHome?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
    authed,
    setAuthed,
    setToken,
    setUserData,
    isMenuOpen,
    isDarkMode,
}) => {
    const [hasAccount, setHasAccount] = useState<boolean>(false);

    const authProps: AuthPageProps & {
        setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
        setUserData?: React.Dispatch<
            React.SetStateAction<UserModel | undefined>
        >;
        setAuthed?: React.Dispatch<React.SetStateAction<boolean>>;
        setToken?: React.Dispatch<
            React.SetStateAction<UserAuthCookie | undefined>
        >;
    } = {
        isMenuOpen: isMenuOpen,
        setToken: setToken,
        setHasAccount: setHasAccount,
        setAuthed: setAuthed,
        setUserData: setUserData,
        isDarkMode: isDarkMode,
    };

    return authed === false ? (
        hasAccount ? (
            <LoginPage {...authProps} />
        ) : (
            <SignupPage {...authProps} />
        )
    ) : (
        <Profile
            isMenuOpen={isMenuOpen}
            setAuthed={setAuthed!}
            setToken={setToken!}
            isDarkMode={isDarkMode}
            setUserData={setUserData!}
        />
    );
};
