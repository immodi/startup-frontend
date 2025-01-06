import { LoadingSpinner } from "@/components/ui/Spinner";
import {
    DesignerElementsContext,
    DesignerElementsContextInterface,
} from "@/components/util/context";
import { populateDummyElements } from "@/helpers/designer/manageElements";
import { ComponentsIndexInterface } from "@/helpers/designer/scrollBehaviors";
import {
    animatingReducer,
    animationInitialState,
} from "@/hooks/designer/animatingDispatcher";
import {
    componentsArrayInitialState,
    componentsArrayReducer,
} from "@/hooks/designer/componentsArrayDispatcher";
import {
    componentsPagedArrayInitialState,
    componentsReducer,
} from "@/hooks/designer/componentsPagedArrayDispatcher";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, { useEffect, useReducer, useState } from "react";
import ElementsMapper from "../elements/ElementsMapFunction";

export type AnimationState = "down" | "up" | "none";

const Elements: React.FC = () => {
    const [components, setComponents] = useState<Array<DesignerComponent>>([]);
    const [isStartDragging, setIsStartDragging] = useState(false);
    const [scrollingAnimationState] = useState<AnimationState>("none");

    const [componentsPagedArray, componentsPagedArraydispatch] = useReducer(
        componentsReducer,
        componentsPagedArrayInitialState,
    );

    const [_a, componentsArrayDispatch] = useReducer(
        componentsArrayReducer,
        componentsArrayInitialState,
    );

    const [isAnimating, animatingDispatch] = useReducer(
        animatingReducer,
        animationInitialState,
    );

    const [currentComponentsInterface, _] = useState<ComponentsIndexInterface>({
        currentIndex: 0,
        subArrayCount: 0,
    });

    useEffect(() => {
        populateDummyElements(setComponents);
    }, []);

    useEffect(() => {
        // indexAndDisplayElements(
        //     components,
        //     currentComponentsInterface,
        //     setComponentsInterface,
        //     componentsPagedArraydispatch,
        // );
        // componentsArrayDispatch({type="REPLACE_ARRAY_COMPONENT", })
    }, [components]);

    // function setComponentsInterface(ci: ComponentsIndexInterface) {
    //     setCurrentComponentsInterface(ci);
    // }

    // function setScrollAnimationState(animationState: AnimationState) {
    //     setScrollingAnimationState(animationState);
    // }

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
        componentsArrayDispatch: componentsArrayDispatch,
    };

    return (
        <DesignerElementsContext.Provider value={designerElementsContext}>
            <div className="w-full h-full flex relative justify-center items-center flex-col">
                {/* <Arrow
                    direction="up"
                    onClick={() => {
                        scrollUp(
                            currentComponentsInterface,
                            setComponentsInterface,
                            setScrollAnimationState,
                        );
                    }}
                /> */}

                {componentsPagedArray.length < 0 ? (
                    <LoadingSpinner className="w-16 h-16" />
                ) : (
                    <ElementsMapper components={components} />
                    // <HeadingControls />
                )}

                {/* <Arrow
                    direction="down"
                    onClick={() => {
                        scrollDown(
                            currentComponentsInterface,
                            setComponentsInterface,
                            setScrollAnimationState,
                        );
                    }}
                /> */}
            </div>
        </DesignerElementsContext.Provider>
    );
};

export default Elements;
