import { createContext } from "react";

export interface ContextObject {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

type Option = ContextObject | null;

export const Context = createContext<Option>(null);
