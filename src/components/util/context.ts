import { ComponentsIndexInterface } from "@/helpers/designer/scrollBehaviors";
import {
    AnimatingAction,
    AnimatingState,
} from "@/hooks/designer/animatingDispatcher";
import { Action } from "@/hooks/designer/componentsPagedArrayDispatcher";
import { LocalState } from "@/hooks/local-data/useLocalData";
import { UserModel } from "@/interfaces/auth/userModel";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { createContext } from "react";
import { AnimationState } from "../routes/designer/Elements";
import { CanvasElement } from "../routes/designer/elements/CanvasElementsRenderer";

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
    canvasRef: React.RefObject<HTMLDivElement>;
}

export interface DesignerElementsContextInterface {
    componentsPagedArray: DesignerComponent[][];
    currentComponentsInterface: ComponentsIndexInterface;
    isAnimating: AnimatingState;
    isStartDragging: boolean;
    scrollingAnimationState: AnimationState;
    componentsPagedArraydispatch: React.Dispatch<Action>;
    animatingDispatch: React.Dispatch<AnimatingAction>;
    setIsStartDragging: (state: boolean) => void;
    addCanvasElement: (element: CanvasElement) => void;
}

type Option = ContextInterface | null;
type HomeOption = HomeContextInterface | null;
type GeneratorOption = GeneratorContextInterface | null;
type DesignerOption = DesignerContextInterface | null;
type DesignerElementsOption = DesignerElementsContextInterface | null;

export const Context = createContext<Option>(null);
export const HomeContext = createContext<HomeOption>(null);
export const GeneratorContext = createContext<GeneratorOption>(null);
export const DesignerContext = createContext<DesignerOption>(null);
export const DesignerElementsContext =
    createContext<DesignerElementsOption>(null);
