import { UserModel } from "@/interfaces/userModel";
import { createContext } from "react";

export interface ContextObject {
    isDarkMode: boolean;
    authed: boolean;
    userData: UserModel | undefined;

    toggleDarkMode: () => void;
    setCurrentUserData: (userData: UserModel | undefined) => void;
    setAuthed: (isAuthed: boolean) => void;
}

export interface GeneratorContextObject {
    isMenuOpen: boolean;
    currentPageName: string;
    setCurrentPageName: (pageName: string) => void;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
    navigateTo: (path: string) => void;
}

type Option = ContextObject | null;
type GeneratorOption = GeneratorContextObject | null;

export const Context = createContext<Option>(null);
export const GeneratorContext = createContext<GeneratorOption>(null);
