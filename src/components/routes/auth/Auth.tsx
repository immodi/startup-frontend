import { useContext, useState } from "react";
import { LoginPage } from "./Login";
import SignupPage from "./SignUp";
import { PageProps } from "@/interfaces/pageProp";
import { UserModel } from "@/interfaces/userModel";
import Profile from "../home/pages/Profile";
import {
    Context,
    ContextObject,
    GeneratorContext,
    GeneratorContextObject,
} from "@/components/util/context";

export interface AuthPageProps extends PageProps {
    authed?: boolean;
    setUserData?: (userData: UserModel | undefined) => void;
    setAuthed?: (isAuthed: boolean) => void;
    // setToken?: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>;
    goHome?: () => void;
    userData?: UserModel | undefined;
}

export const AuthPage: React.FC = () => {
    const context = useContext(Context) as ContextObject;
    const generatorContext = useContext(
        GeneratorContext,
    ) as GeneratorContextObject;

    const { isDarkMode, userData, setAuthed, setCurrentUserData, authed } =
        context;
    const { isMenuOpen } = generatorContext;

    const [hasAccount, setHasAccount] = useState<boolean>(false);

    const authProps: AuthPageProps & {
        setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
        setUserData?: (userData: UserModel | undefined) => void;
        setAuthed?: (isAuthed: boolean) => void;
        userData?: UserModel | undefined;
    } = {
        isMenuOpen: isMenuOpen,
        userData: userData,
        setHasAccount: setHasAccount,
        setAuthed: setAuthed,
        setUserData: setCurrentUserData,
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
            // setToken={setToken!}
            userData={userData}
            isDarkMode={isDarkMode}
            setUserData={setCurrentUserData!}
        />
    );
};
