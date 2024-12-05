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

const StyledElements: React.FC = () => {
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
            <div className="w-full h-full flex justify-center items-center flex-col space-y-6 p-6 bg-gray-900 rounded-lg shadow-lg">
                <div className="w-full flex justify-center items-center space-x-4">
                    <Arrow
                        direction="up"
                        onClick={() => {
                            scrollUp(
                                currentComponentsInterface,
                                setComponentsInterface,
                                setScrollAnimationState,
                            );
                        }}
                        className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-full shadow-lg transform hover:scale-110 transition duration-300"
                    />
                </div>

                {componentsPagedArray.length < 0 ? (
                    <LoadingSpinner className="w-16 h-16 text-purple-600" />
                ) : (
                    <ElementsMapper />
                )}

                <div className="w-full flex justify-center items-center space-x-4">
                    <Arrow
                        direction="down"
                        onClick={() => {
                            scrollDown(
                                currentComponentsInterface,
                                setComponentsInterface,
                                setScrollAnimationState,
                            );
                        }}
                        className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-full shadow-lg transform hover:scale-110 transition duration-300"
                    />
                </div>
            </div>
        </DesignerElementsContext.Provider>
    );
};

export default StyledElements;
