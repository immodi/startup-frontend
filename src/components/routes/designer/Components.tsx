import {
    Context,
    ContextInterface,
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, { useEffect, useReducer, useRef, useState } from "react";
import Draggable from "react-draggable";
import Arrow from "./MoreComponetsArrow";
import {
    onMoveElement,
    onStopDrag,
} from "@/helpers/designer/componentCardsMethods";

interface ComponentsIndexInterface {
    currentIndex: number;
    subArrayCount: number;
}

const initialState: Array<Array<DesignerComponent>> = [[]];

type Action =
    | {
          type: "SET_COMPONENTS_PAGED_ARRAY";
          payload: Array<Array<DesignerComponent>>;
      }
    | {
          type: "REPLACE_SUB_ARRAY_COMPONENT";
          arrayIndex: number;
          subArrayIndex: number;
          functionToRun: () => void;
          component: DesignerComponent;
      };

const componentsReducer = (
    state: Array<Array<DesignerComponent>>,
    action: Action,
): Array<Array<DesignerComponent>> => {
    switch (action.type) {
        case "SET_COMPONENTS_PAGED_ARRAY":
            return action.payload;
        case "REPLACE_SUB_ARRAY_COMPONENT":
            action.functionToRun();
            return updateSubarray<DesignerComponent>(
                state,
                action.arrayIndex,
                action.subArrayIndex,
                action.component,
            );
        default:
            return state;
    }
};
const Components: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [components, setComponents] = useState<Array<DesignerComponent>>([]);
    const [isStartDragging, setIsStartDragging] = useState(false);
    const [componentsPagedArray, dispatch] = useReducer(
        componentsReducer,
        initialState,
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
    }

    function setComponentsArray(newArray: Array<Array<DesignerComponent>>) {
        dispatch({ type: "SET_COMPONENTS_PAGED_ARRAY", payload: newArray });
    }

    function replaceComponentInSubArray(
        currentArrayIndex: number,
        subArrayIndex: number,
        functionToRun: () => void,
        component: DesignerComponent,
    ) {
        dispatch({
            type: "REPLACE_SUB_ARRAY_COMPONENT",
            arrayIndex: currentArrayIndex,
            subArrayIndex: subArrayIndex,
            component: component,
            functionToRun: functionToRun,
        });
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
        setComponentsArray(pagedArray);
    }, [components]);

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
                    return (
                        <Draggable
                            key={component.index}
                            positionOffset={{
                                x: 0,
                                y: component.positionOffset.y,
                            }}
                            position={component.position}
                            onStart={(_, data) => {
                                setIsStartDragging(true);
                                const newElement = onMoveElement(
                                    data,
                                    componentsPagedArray[
                                        currentComponentsInterface.currentIndex
                                    ],
                                    index,
                                );

                                replaceComponentInSubArray(
                                    currentComponentsInterface.currentIndex,
                                    index,
                                    () => {
                                        setTimeout(() => {
                                            setIsStartDragging(false);
                                        }, 100);
                                    },
                                    newElement,
                                );

                                setTimeout(() => {
                                    data.node.style.visibility = "visible";
                                }, 0);
                            }}
                            onStop={(_, data) => {
                                const newElement = onStopDrag(
                                    componentsPagedArray[
                                        currentComponentsInterface.currentIndex
                                    ],
                                    index,
                                );

                                replaceComponentInSubArray(
                                    currentComponentsInterface.currentIndex,
                                    index,
                                    () => {
                                        data.node.style.display = "none";
                                        setTimeout(() => {
                                            data.node.style.display = "flex";
                                        }, 200);
                                    },
                                    newElement,
                                );
                            }}
                        >
                            <div
                                className={`w-24 h-24 bg-gray-600 flex items-center justify-center select-none cursor-pointer ease-out ${isStartDragging ? "transition-none" : "transition-all"}`}
                                style={{ position: component.state }}
                            >
                                {component.text}
                            </div>
                        </Draggable>
                    );
                })}

            <Arrow direction="down" onClick={scrollDown} />
            <Arrow direction="up" onClick={scrollUp} />
        </div>
    );
};

function updateSubarray<T>(
    bigArray: T[][],
    bigIndex: number,
    subIndex: number,
    newElement: T,
): T[][] {
    return bigArray.map((subarray, index) =>
        index === bigIndex
            ? subarray.map((element, i) =>
                  i === subIndex ? newElement : element,
              )
            : subarray,
    );
}

export default Components;
