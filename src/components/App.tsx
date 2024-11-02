import React, { createContext, useEffect, useState } from "react";
import {
    BrowserRouter,
    createBrowserRouter,
    Outlet,
    Route,
    RouterProvider,
    Routes,
} from "react-router-dom";
import LandingPage from "./routes/landing/Landing";
import Home from "./routes/home/Home";
import ErrorPage from "./util/Error";
import useLocalStorageState from "@/hooks/local-data/useLocalData";
import { Context } from "./util/context";

const App: React.FC = () => {
    const [localState, setLocalState, clearLocalState] = useLocalStorageState();
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (localState.isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        setIsDarkMode(localState.isDarkMode);
    }, [localState.isDarkMode]);

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        setLocalState((prev) => ({ ...prev, isDarkMode: newDarkMode }));
        document.documentElement.classList.toggle("dark", newDarkMode);
    };

    return (
        <Context.Provider
            value={{ isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode }}
        >
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LandingPage
                                isDarkMode={isDarkMode}
                                toggleDarkMode={toggleDarkMode}
                            />
                        }
                    />
                    <Route path="/" element={<HomeLayout />}>
                        <Route path="home" element={<Home />} />
                        <Route path="designer" element={<Home />} />
                        <Route path="profile" element={<Home />} />
                        <Route path="billing" element={<Home />} />
                    </Route>

                    <Route
                        path="*"
                        element={
                            <ErrorPage
                                isDarkMode={isDarkMode}
                                toggleDarkMode={toggleDarkMode}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
};

const HomeLayout: React.FC = () => {
    return <Outlet />;
};

export default App;
