import getLocalUser from "@/helpers/auth/getLocalUser";
import {
    LocalState,
    useLocalStorageState,
} from "@/hooks/local-data/useLocalData";
import { UserModel } from "@/interfaces/auth/userModel";
import {
    PayPalScriptProvider,
    ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "./routes/auth/Auth";
import Billing from "./routes/billing/Billing";
import Designer from "./routes/designer/Designer";
import Home from "./routes/home/Home";
import Main from "./routes/home/pages/Main";
import LandingPage from "./routes/landing/Landing";
import PrivacyPolicy from "./routes/policy/Privacy";
import TermsOfService from "./routes/policy/Terms";
import { Context, ContextInterface } from "./util/context";
import ErrorPage from "./util/Error";

const App: React.FC = () => {
    const [localState, setLocalState] = useLocalStorageState();
    const [userData, setUserData] = useState<UserModel | undefined>(
        getLocalUser(),
    );

    useEffect(() => {
        if (localState.isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        setLocalState((prev) => ({
            ...prev,
            isDarkMode: localState.isDarkMode,
        }));
    }, [localState.isDarkMode]);

    useEffect(() => {
        if (userData?.token) {
            setCurrentUserAuthed(true);
        }
    }, [userData]);

    function toggleDarkMode() {
        const newDarkMode = !localState.isDarkMode;
        setLocalState((prev) => ({ ...prev, isDarkMode: newDarkMode }));
        document.documentElement.classList.toggle("dark", newDarkMode);
    }

    function cacheLocalState(newState: LocalState) {
        setLocalState((prev) => ({ ...prev, ...newState }));
    }

    function setCurrentUserData(userData: UserModel | undefined) {
        setUserData(userData);
    }

    function setCurrentUserAuthed(isAuthed: boolean) {
        setLocalState((prev) => ({
            ...prev,
            authed: isAuthed,
        }));
    }

    const context: ContextInterface = {
        localState: localState,
        userData: userData,

        setCurrentUserData: setCurrentUserData,
        toggleDarkMode: toggleDarkMode,
        setAuthed: setCurrentUserAuthed,
        cacheLocalState: cacheLocalState,
    };

    const initialOptions: ReactPayPalScriptOptions = {
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <Context.Provider value={context}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />

                        <Route path="/" element={<Home />}>
                            <Route path="home" element={<Main />} />
                            <Route path="designer" element={<Designer />} />
                            <Route path="profile" element={<AuthPage />} />
                            <Route path="billing" element={<Billing />} />
                            <Route
                                path="privacy-policy"
                                element={<PrivacyPolicy />}
                            />
                            <Route
                                path="terms-of-service"
                                element={<TermsOfService />}
                            />
                        </Route>

                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </Context.Provider>
        </PayPalScriptProvider>
    );
};

export default App;
