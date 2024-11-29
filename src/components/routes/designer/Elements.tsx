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
import {
    ComponentsIndexInterface,
    scrollDown,
    scrollUp,
} from "@/helpers/designer/scrollBehaviors";
import {
    animatingReducer,
    animationInitialState,
} from "@/hooks/designer/animatingDispatcher";
import {
    componentsPagedArrayInitialState,
    componentsReducer,
} from "@/hooks/designer/componentsPagedArrayDispatcher";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, {
    ReactElement,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import ElementsMapper from "./elements/ElementsMapFunction";
import Arrow from "./elements/ElementsSelectArrow";
import { LoadingSpinner } from "@/components/ui/Spinner";
import { createPortal } from "react-dom";
import {
    CanvasElement,
    ElementsRenderer,
    ElementsType,
} from "./elements/CanvasElementsRenderer";

export type AnimationState = "down" | "up" | "none";

const Elements: React.FC = () => {
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

    useEffect(() => {
        console.log(canvasElements);
    }, [canvasElements.length]);

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

    function setScrollAnimationState(animationState: AnimationState) {
        setScrollingAnimationState(animationState);
    }

    function setStartDragging(state: boolean) {
        setIsStartDragging(state);
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
    };

    // useEffect(() => {
    //     console.log(canvasElements);
    // }, [canvasElements.length]);

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
        },
    ) {
        const newElements = canvasElements.map((element) => {
            return element.id === elementId
                ? { ...element, ...newElement }
                : element;
        });

        setCanvasElements(newElements);
    }

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
            >
                <Arrow
                    direction="up"
                    onClick={() => {
                        scrollUp(
                            currentComponentsInterface,
                            setComponentsInterface,
                            setScrollAnimationState,
                        );
                    }}
                />

                {componentsPagedArray.length < 0 ? (
                    <LoadingSpinner className="w-16 h-16" />
                ) : (
                    <ElementsMapper />
                )}

                <Arrow
                    direction="down"
                    onClick={() => {
                        scrollDown(
                            currentComponentsInterface,
                            setComponentsInterface,
                            setScrollAnimationState,
                        );
                    }}
                />
            </div>
        </DesignerElementsContext.Provider>
    );
};

export default Elements;
