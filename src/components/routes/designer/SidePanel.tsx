import {
    DesignerContext,
    DesignerContextInterface,
    DesignerElementsContext,
    DesignerElementsContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";
import {
    indexAndDisplayElements,
    populateDummyElements,
} from "@/helpers/designer/manageElements";
import { ComponentsIndexInterface } from "@/helpers/designer/scrollBehaviors";
import {
    animatingReducer,
    animationInitialState,
} from "@/hooks/designer/animatingDispatcher";
import {
    componentsPagedArrayInitialState,
    componentsReducer,
} from "@/hooks/designer/componentsPagedArrayDispatcher";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import { AnimationState } from "./Elements";
import {
    CanvasElement,
    ElementsRenderer,
    SelectionNodeModes,
} from "./elements/CanvasElementsRenderer";

const SidePanel: React.FC = () => {
    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const { isMenuOpen } = homeContext;
    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { canvasRef } = designerContext;

    const [components, setComponents] = useState<Array<DesignerComponent>>([]);
    const [isStartDragging, setIsStartDragging] = useState(false);
    const [scrollingAnimationState, setScrollingAnimationState] =
        useState<AnimationState>("none");
    const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);

    const [componentsPagedArray, componentsPagedArraydispatch] = useReducer(
        componentsReducer,
        componentsPagedArrayInitialState,
    );

    const [isAnimating, animatingDispatch] = useReducer(
        animatingReducer,
        animationInitialState,
    );

    const [currentComponentsInterface, setCurrentComponentsInterface] =
        useState<ComponentsIndexInterface>({
            currentIndex: 0,
            subArrayCount: 0,
        });

    useEffect(() => {
        populateDummyElements(setComponents);
    }, []);

    // useEffect(() => {
    //     console.log(canvasElements);
    // }, [canvasElements.length]);

    useEffect(() => {
        indexAndDisplayElements(
            components,
            currentComponentsInterface,
            setComponentsInterface,
            componentsPagedArraydispatch,
        );
    }, [components]);

    function setComponentsInterface(ci: ComponentsIndexInterface) {
        setCurrentComponentsInterface(ci);
    }

    function setStartDragging(state: boolean) {
        setIsStartDragging(state);
    }

    function addCanvasElement(element: CanvasElement) {
        const elements = canvasElements;
        elements.push(element);

        setCanvasElements(elements);
    }

    function removeCanvasElement(elementIndex: number) {
        const newElements = canvasElements.filter((_, index) => {
            return index !== elementIndex;
        });

        setCanvasElements(newElements);
    }

    function updateCanvasElement(
        elementId: number,
        newElement: {
            text?: string;
            customClasses?: string;
            selectMode?: SelectionNodeModes;
        },
    ) {
        setCanvasElements((prevElements) =>
            prevElements.map((element) =>
                element.id === elementId
                    ? {
                          ...element,
                          ...newElement,
                      }
                    : element,
            ),
        );
    }

    const designerElementsContext: DesignerElementsContextInterface = {
        componentsPagedArray: componentsPagedArray,
        currentComponentsInterface: currentComponentsInterface,
        isAnimating: isAnimating,
        isStartDragging: isStartDragging,
        scrollingAnimationState: scrollingAnimationState,
        componentsPagedArraydispatch: componentsPagedArraydispatch,
        animatingDispatch: animatingDispatch,
        setIsStartDragging: setStartDragging,
        addCanvasElement: addCanvasElement,
        removeCanvasElement: removeCanvasElement,
        updateCanvasElement: updateCanvasElement,
        // updateKeyBoardString: updateKeyBoardString,
    };

    return (
        <DesignerElementsContext.Provider value={designerElementsContext}>
            {canvasRef.current &&
                createPortal(
                    ElementsRenderer(
                        canvasElements,
                        removeCanvasElement,
                        updateCanvasElement,
                    ),
                    canvasRef.current,
                )}
            <div
                className={`bg-white ${isMenuOpen && "translate-x-24"} transition-all ease-in-out duration-300 dark:bg-gray-900 w-80 h-full transform self-end relative overflow-visible grid place-items-center`}
                style={{
                    padding: "1rem",
                    boxSizing: "border-box",
                }}
            ></div>
        </DesignerElementsContext.Provider>
    );
};
