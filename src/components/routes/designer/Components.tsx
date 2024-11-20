import {
    animate,
    AnimatingAction,
    animatingReducer,
    animationInitialState,
    stopAnimating,
} from "@/hooks/designer/animatingDispatcher";
import {
    componentsPagedArrayInitialState,
    componentsReducer,
    replaceComponentInSubArray,
    setComponentsArray,
} from "@/hooks/designer/componentsPagedArrayDispatcher";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, { useEffect, useReducer, useRef, useState } from "react";
import Draggable from "react-draggable";
import Arrow from "./MoreComponetsArrow";
import { Flag } from "lucide-react";

interface ComponentsIndexInterface {
    currentIndex: number;
    subArrayCount: number;
}

const Components: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [components, setComponents] = useState<Array<DesignerComponent>>([]);
    const [isStartDragging, setIsStartDragging] = useState(false);
    const [scrollingAnimationState, setScrollingAnimationState] = useState<
        "down" | "up"
    >("down");

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

    function scrollDown() {
        const maxIndex = currentComponentsInterface.subArrayCount - 1;
        const newIndex =
            maxIndex >= currentComponentsInterface.currentIndex + 1
                ? currentComponentsInterface.currentIndex + 1
                : maxIndex;

        setCurrentComponentsInterface({
            ...currentComponentsInterface,
            currentIndex: newIndex,
        });

        setScrollingAnimationState("down");
    }

    function scrollUp() {
        // const maxIndex = currentComponentsInterface.subArrayCount - 1;
        const newIndex =
            currentComponentsInterface.currentIndex - 1 < 0
                ? 0
                : currentComponentsInterface.currentIndex - 1;

        setCurrentComponentsInterface({
            ...currentComponentsInterface,
            currentIndex: newIndex,
        });
        setScrollingAnimationState("up");
    }

    useEffect(() => {
        const componentsArray: DesignerComponent[] = [];
        const elementsNumber = 10;

        for (let i = 0; i < elementsNumber; i++) {
            componentsArray.push({
                index: i,
                text: `DIV ${i}`,
                position: {
                    x: 0,
                    y: 0,
                },
                state: "relative",
                positionOffset: { x: 0, y: 0 },
            });
        }

        setComponents(componentsArray);
    }, []);

    useEffect(() => {
        const pagedArray: DesignerComponent[][] = [];
        const indexer = 3;
        const subArrayNumber =
            components.length % 3 === 0
                ? Math.trunc(components.length / 3)
                : Math.trunc(components.length / 3) + 1;

        for (let i = 0; i < subArrayNumber; i++) {
            pagedArray.push(
                i === subArrayNumber + 1
                    ? components.slice(i * indexer, -1)
                    : components.slice(i * indexer, i * indexer + indexer),
            );
        }

        setCurrentComponentsInterface({
            ...currentComponentsInterface,
            subArrayCount: subArrayNumber,
        });
        setComponentsArray(componentsPagedArraydispatch, pagedArray);
    }, [components]);

    // useEffect(() => {
    //     console.log(isAnimating);
    // }, [isAnimating]);

    return (
        <div
            ref={containerRef}
            className={`bg-white dark:bg-gray-900 w-80 h-full transition-all duration-300 transform self-end relative overflow-visible grid place-items-center`}
            style={{
                padding: "1rem",
                boxSizing: "border-box",
            }}
        >
            {componentsPagedArray.length > 1 &&
                componentsPagedArray[
                    currentComponentsInterface.currentIndex
                ].map((component, index) => {
                    // console.log(
                    //     isAnimating.index,
                    //     component.index,
                    //     isAnimating.payload,
                    // );

                    return (
                        <div
                            className={`
                                w-fit h-fit ${isAnimating.index === component.index && isAnimating.payload === true ? "animate-fade-out" : "animate-fade-in"}
                                 
                            `}
                        >
                            <Draggable
                                key={component.index}
                                positionOffset={{
                                    x: 0,
                                    y: component.positionOffset.y,
                                }}
                                position={component.position}
                                onStart={(_, data) => {
                                    // setIsStartDragging(true);
                                    // const newElement = onMoveElement(
                                    //     data,
                                    //     componentsPagedArray[
                                    //         currentComponentsInterface.currentIndex
                                    //     ],
                                    //     index,
                                    // );
                                    // replaceComponentInSubArray(
                                    //     currentComponentsInterface.currentIndex,
                                    //     index,
                                    //     () => {
                                    //         setTimeout(() => {
                                    //             setIsStartDragging(false);
                                    //         }, 100);
                                    //     },
                                    //     newElement,
                                    // );
                                    // setTimeout(() => {
                                    //     data.node.style.visibility = "visible";
                                    // }, 0);
                                }}
                                onDrag={(_, data) => {
                                    const newElement: DesignerComponent = {
                                        ...component,
                                        position: { x: data.x, y: data.y },
                                    };

                                    replaceComponentInSubArray(
                                        componentsPagedArraydispatch,
                                        currentComponentsInterface.currentIndex,
                                        index,
                                        () => {},
                                        newElement,
                                    );
                                }}
                                onStop={(_, data) => {
                                    // const newElement = onStopDrag(
                                    //     componentsPagedArray[
                                    //         currentComponentsInterface.currentIndex
                                    //     ],
                                    //     index,
                                    // );
                                    // replaceComponentInSubArray(
                                    //     currentComponentsInterface.currentIndex,
                                    //     index,
                                    //     () => {
                                    //         data.node.style.display = "none";
                                    //         setTimeout(() => {
                                    //             data.node.style.display = "flex";
                                    //         }, 200);
                                    //     },
                                    //     newElement,
                                    // );

                                    animate(animatingDispatch, component.index);
                                    setIsStartDragging(true);

                                    setTimeout(() => {
                                        const newElement: DesignerComponent = {
                                            ...component,
                                            position: { x: 0, y: 0 },
                                        };

                                        replaceComponentInSubArray(
                                            componentsPagedArraydispatch,
                                            currentComponentsInterface.currentIndex,
                                            index,
                                            () => {
                                                stopAnimating(
                                                    animatingDispatch,
                                                    component.index,
                                                );
                                                setIsStartDragging(false);
                                            },
                                            newElement,
                                        );
                                        // Optional: Remove the class after animation ends
                                        // data.node.addEventListener(
                                        //     "animationend",
                                        //     () => {
                                        //         data.node.classList.remove(
                                        //             "animate-scale-down-fade",
                                        //         );
                                        //     },
                                        // );
                                    }, 301);
                                }}
                            >
                                <div
                                    className={`w-24 h-24 relative bg-gray-600 flex items-center justify-center select-none cursor-pointer ease-out ${isStartDragging ? "transition-none" : "transition-all"} ${scrollingAnimationState === "down" ? "animate-scroll-down" : "animate-scroll-up"}`}
                                    style={{ position: component.state }}
                                >
                                    {component.text}
                                </div>
                            </Draggable>
                        </div>
                    );
                })}

            <Arrow direction="down" onClick={scrollDown} />
            <Arrow direction="up" onClick={scrollUp} />
        </div>
    );
};

export default Components;
