import { LoadingSpinner } from "@/components/ui/Spinner";
import {
    DesignerElementsContext,
    DesignerElementsContextInterface,
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
import useLandscapeMode from "@/helpers/designer/useLandscapeMode";
import {
    animatingReducer,
    animationInitialState,
} from "@/hooks/designer/animatingDispatcher";
import {
    componentsPagedArrayInitialState,
    componentsReducer,
} from "@/hooks/designer/componentsPagedArrayDispatcher";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, { useEffect, useReducer, useState } from "react";
import ElementsMapper from "../elements/ElementsMapFunction";
import Arrow from "../elements/ElementsSelectArrow";

export type AnimationState = "down" | "up" | "none";

const Elements: React.FC = () => {
    const [components, setComponents] = useState<Array<DesignerComponent>>([]);
    const [isStartDragging, setIsStartDragging] = useState(false);
    const [scrollingAnimationState, setScrollingAnimationState] =
        useState<AnimationState>("none");
    const isPhoneLandscape = useLandscapeMode();

    const [componentsPagedArray, componentsPagedArraydispatch] = useReducer(
        componentsReducer,
        componentsPagedArrayInitialState,
    );

    // const [_a, componentsArrayDispatch] = useReducer(
    //     componentsArrayReducer,
    //     componentsArrayInitialState,
    // );

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
        let indexer = 3;

        // Check for landscape orientation or if the device is a tablet/PC
        const isLandscape = window.matchMedia(
            "(orientation: landscape)",
        ).matches;
        const isLargeScreen = window.innerWidth > 768; // Consider anything larger than 768px as tablet/PC

        // If in landscape mode or on a larger device (tablet/PC)
        if (!isPhoneLandscape && isLandscape && isLargeScreen) {
            indexer = 9;
        }

        indexAndDisplayElements(
            isPhoneLandscape,
            indexer,
            components,
            currentComponentsInterface,
            setComponentsInterface,
            componentsPagedArraydispatch,
        );
    }, [components, isPhoneLandscape]);

    function setComponentsInterface(ci: ComponentsIndexInterface) {
        setCurrentComponentsInterface(ci);
    }

    function setScrollAnimationState(animationState: AnimationState) {
        setScrollingAnimationState(animationState);
    }

    function updateComponentByIndex(
        index: number,
        newComponent: DesignerComponent,
    ) {
        setComponents((prevComponents) =>
            prevComponents.map((component, cIndex) =>
                cIndex === index ? newComponent : component,
            ),
        );
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
        updateComponentByIndex: updateComponentByIndex,
    };

    return (
        <DesignerElementsContext.Provider value={designerElementsContext}>
            <div
                className={`w-full h-full ${!isStartDragging && "overflow-y-auto overscroll-x-none"} grid relative flex-col`}
            >
                {componentsPagedArray.length < 0 ? (
                    <LoadingSpinner className="w-16 h-16" />
                ) : (
                    <ElementsMapper />
                    // <HeadingControls />
                )}

                <div className="flex justify-between items-center w-full h-fit relative bg-gray-300 rounded-md dark:bg-gray-700">
                    <Arrow
                        direction="up"
                        className="p-3"
                        onClick={() => {
                            scrollUp(
                                currentComponentsInterface,
                                setComponentsInterface,
                                setScrollAnimationState,
                            );
                        }}
                    />
                    <Arrow
                        direction="down"
                        className="p-3"
                        onClick={() => {
                            scrollDown(
                                currentComponentsInterface,
                                setComponentsInterface,
                                setScrollAnimationState,
                            );
                        }}
                    />
                </div>
            </div>
        </DesignerElementsContext.Provider>
    );
};

export default Elements;
