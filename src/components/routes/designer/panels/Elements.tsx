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
    };

    return (
        <DesignerElementsContext.Provider value={designerElementsContext}>
            <div className="w-full h-full flex relative justify-center items-center flex-col">
                <Arrow
                    // className="absolute -top-2 z-10"
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
                    // className="absolute -bottom-2 z-10"
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
