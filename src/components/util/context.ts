import { LocalState } from "@/hooks/local-data/useLocalData";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { UserModel } from "@/interfaces/auth/userModel";
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
    templates: Array<string>;
    isLoading: boolean;
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

export interface DesignerContextInterface {
    designerComponentRef: React.RefObject<HTMLDivElement>;
}

type Option = ContextInterface | null;
type HomeOption = HomeContextInterface | null;
type GeneratorOption = GeneratorContextInterface | null;
type DesignerOption = DesignerContextInterface | null;

export const Context = createContext<Option>(null);
export const HomeContext = createContext<HomeOption>(null);
export const GeneratorContext = createContext<GeneratorOption>(null);
export const DesignerContext = createContext<DesignerOption>(null);
