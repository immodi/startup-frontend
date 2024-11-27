import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./routes/landing/Landing";
import Home from "./routes/home/Home";
import ErrorPage from "./util/Error";
import {
    LocalState,
    useLocalStorageState,
} from "@/hooks/local-data/useLocalData";
import { Context, ContextInterface } from "./util/context";
import { UserModel } from "@/interfaces/auth/userModel";
import getLocalUser from "@/helpers/auth/getLocalUser";
import Main from "./routes/home/pages/Main";
import NotFound from "./routes/home/pages/404";
import { AuthPage } from "./routes/auth/Auth";
import Designer from "./routes/designer/Designer";

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
        // console.log(localState);
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

    return (
        <Context.Provider value={context}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route path="/" element={<Home />}>
                        <Route path="home" element={<Main />} />
                        <Route path="designer" element={<Designer />} />
                        <Route path="profile" element={<AuthPage />} />
                        <Route path="billing" element={<NotFound />} />
                    </Route>

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
};

export default App;
