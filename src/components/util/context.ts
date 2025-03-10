import { UserFile } from "@/helpers/auth/getUserFiles";
import { ComponentsIndexInterface } from "@/helpers/designer/scrollBehaviors";
import {
    AnimatingAction,
    AnimatingState,
} from "@/hooks/designer/animatingDispatcher";
import { Action } from "@/hooks/designer/componentsPagedArrayDispatcher";
import { LocalState } from "@/hooks/local-data/useLocalData";
import { UserModel } from "@/interfaces/auth/userModel";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { Template } from "@/interfaces/generator/template";
import { createContext } from "react";
import {
    CanvasElement,
    NewCanvasElement,
    SelectionNodeModes,
} from "../routes/designer/elements/CanvasElementsRenderer";
import { AnimationState } from "../routes/designer/panels/Elements";

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
    templates: Array<Template>;
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
    isSidePanelOpen: boolean;
    canvasRef: React.RefObject<HTMLDivElement>;
    designerRef: React.RefObject<HTMLDivElement>;
    saveModelName: string;
    panelDisplay: "grid" | "hidden";
    toggleSidePanel: (state: boolean) => void;
    changePanelDisplay: (state: "grid" | "hidden") => void;
    toggleSidePanelState: (state: boolean) => void;
    openSaveModal: () => void;

    addCanvasElement: (element: CanvasElement) => void;
    removeCanvasElement: (elementId: number) => void;

    updateCanvasElement: (
        elementId: number,
        newElement: NewCanvasElement,
    ) => void;
    triggerIdleToAllCanvasElements: () => void;

    canvasElements: CanvasElement[];
    currentEditableIndexInCanvasElements: number | undefined;
    recentlySelectedActiveElement: CanvasElement | null;
    getAllIdentifiersCanvasElements: () => Array<string>;
    changeAllCanvasElements: (newCanvasElements: CanvasElement[]) => void;
    updateCurrentEditableIndex: (index: number) => void;
    updateCanvasElementByItsId: (
        elementId: number,
        newElement: {
            text?: string;
            customClasses?: string;
            selectMode?: SelectionNodeModes;
            childrenNodes?: Array<CanvasElement>;
        },
    ) => void;
    updateSubCanvasElement: (
        subElementId: number,
        newSubElement: CanvasElement,
    ) => void;
}

export interface SidelPanelContextInterface {
    activePanel: string;
    updateActivePanel: (itemId: "elements" | "customize") => void;
    setSidePanelTransparency: (isTransparent: boolean) => void;

    // getCanvasElementByIndex: (index: number) => CanvasElement | null;
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
    updateComponentByIndex: (
        index: number,
        newComponent: DesignerComponent,
    ) => void;

    // componentsArrayDispatch: React.Dispatch<ActionArray>;
}

export interface ProfileContextInterface {
    userFiles: UserFile[];
}

type Option = ContextInterface | null;
type HomeOption = HomeContextInterface | null;
type GeneratorOption = GeneratorContextInterface | null;
type DesignerOption = DesignerContextInterface | null;
type SidelPanelOption = SidelPanelContextInterface | null;
type DesignerElementsOption = DesignerElementsContextInterface | null;
type ProfileOption = ProfileContextInterface | null;

export const Context = createContext<Option>(null);
export const HomeContext = createContext<HomeOption>(null);
export const GeneratorContext = createContext<GeneratorOption>(null);
export const DesignerContext = createContext<DesignerOption>(null);
export const SidePanelContext = createContext<SidelPanelOption>(null);
export const DesignerElementsContext =
    createContext<DesignerElementsOption>(null);
export const ProfileContext = createContext<ProfileOption>(null);
