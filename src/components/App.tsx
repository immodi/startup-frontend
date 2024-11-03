import React, { createContext, useEffect, useState } from "react";
import {
    BrowserRouter,
    createBrowserRouter,
    Outlet,
    Route,
    RouterProvider,
    Routes,
    useNavigate,
} from "react-router-dom";
import LandingPage from "./routes/landing/Landing";
import Home from "./routes/home/Home";
import ErrorPage from "./util/Error";
import useLocalStorageState from "@/hooks/local-data/useLocalData";
import { Context, ContextObject } from "./util/context";
import { UserModel } from "@/interfaces/userModel";
import getLocalUser from "@/helpers/getLocalUser";
import Main from "./routes/home/pages/Main";
import NotFound from "./routes/home/pages/404";
import { AuthPage } from "./routes/auth/Auth";

const App: React.FC = () => {
    const [localState, setLocalState, clearLocalState] = useLocalStorageState();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [authed, setAuthed] = useState(false);
    const [userData, setUserData] = useState<UserModel | undefined>(
        getLocalUser(),
    );

    useEffect(() => {
        if (localState.isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        setIsDarkMode(localState.isDarkMode);
    }, [localState.isDarkMode]);

    useEffect(() => {
        userData?.token !== undefined && setAuthed(true);
    }, [userData]);

    function toggleDarkMode() {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        setLocalState((prev) => ({ ...prev, isDarkMode: newDarkMode }));
        document.documentElement.classList.toggle("dark", newDarkMode);
    }

    function setCurrentUserData(userData: UserModel | undefined) {
        setUserData(userData);
    }

    function setCurrentUserAuthed(isAuthed: boolean) {
        setAuthed(isAuthed);
    }

    const context: ContextObject = {
        isDarkMode: isDarkMode,
        authed: authed,
        userData: userData,

        setCurrentUserData: setCurrentUserData,
        toggleDarkMode: toggleDarkMode,
        setAuthed: setCurrentUserAuthed,
    };

    return (
        <Context.Provider value={context}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route path="/" element={<Home />}>
                        <Route path="home" element={<Main />} />
                        <Route path="designer" element={<NotFound />} />
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
