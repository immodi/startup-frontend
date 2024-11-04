import { LocalState } from "@/hooks/local-data/useLocalData";
import { UserModel } from "@/interfaces/userModel";
import { createContext } from "react";

export interface ContextInterface {
    localState: LocalState;
    userData: UserModel | undefined;

    toggleDarkMode: () => void;
    setCurrentUserData: (userData: UserModel | undefined) => void;
    setAuthed: (isAuthed: boolean) => void;
    cacheLocalState: (newState: LocalState) => void;
}

export interface HomeContextInterface {
    isMenuOpen: boolean;
    currentPageName: string;

    setCurrentPageName: (pageName: string) => void;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
    navigateTo: (path: string) => void;
}

export interface GeneratorContextInterface {
    // topic: string;
    templates: Array<string>;
    isLoading: boolean;
    // vocabulary: number;
    // selectedTemplate: string;
    // userTemplateData: Map<string, string>;
    token: string;
    errorMessage: string;

    setTopic: (topic: string) => void;
    setSelectedTemplate: (template: string) => void;
    setVocabulary: (vocabulary: number) => void;
    setErrorMessage: (errorMessage: string) => void;
    setIsModalOpen: (isModalOpen: boolean) => void;
    setIsKeyValuePopupOpen: (isKeyValuePopupOpen: boolean) => void;
    setIsErrorDialogOpen: (isErrorDialogOpen: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setUserTemplateData: (userTemplateData: Map<string, string>) => void;
}

type Option = ContextInterface | null;
type HomeOption = HomeContextInterface | null;
type GeneratorOption = GeneratorContextInterface | null;

export const Context = createContext<Option>(null);
export const HomeContext = createContext<HomeOption>(null);
export const GeneratorContext = createContext<GeneratorOption>(null);
