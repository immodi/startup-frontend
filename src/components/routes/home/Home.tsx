import { useContext, useEffect, useState } from "react";
import "../../../styles/app.css";
import { UserModel } from "@/interfaces/userModel";
import { useGetToken, UserAuthCookie } from "@/hooks/auth/useToken";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    Context,
    ContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";

const Home: React.FC = () => {
    const path = useLocation();
    const navigate = useNavigate();
    const context = useContext(Context) as ContextInterface;
    const isDarkMode = context.localState.isDarkMode;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPageName, setCurrentPageName] = useState(
        path.pathname.slice(1, path.pathname.length),
    );

    function setIsGeneratorMenuOpen(isMenuOpen: boolean) {
        setIsMenuOpen(isMenuOpen);
    }

    function setCurrentGeneratorPageName(pageName: string) {
        setCurrentPageName(pageName);
    }

    function navigateTo(route: string) {
        setCurrentPageName(route);
        navigate(`/${route}`, { replace: true });
    }

    const homeContext: HomeContextInterface = {
        isMenuOpen: isMenuOpen,
        currentPageName: currentPageName,

        setIsMenuOpen: setIsGeneratorMenuOpen,
        setCurrentPageName: setCurrentGeneratorPageName,
        navigateTo: navigateTo,
    };

    return (
        <HomeContext.Provider value={homeContext}>
            <div
                className={`${isDarkMode && "dark"} overflow-x-hidden flex w-screen h-screen flex-col`}
            >
                <Header />

                <Menu />

                <Outlet />

                <Footer />
            </div>
        </HomeContext.Provider>
    );
};

export default Home;
