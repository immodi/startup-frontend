import {
    DesignerContext,
    DesignerContextInterface,
    DesignerElementsContext,
    DesignerElementsContextInterface,
} from "@/components/util/context";
import checkCollision from "@/helpers/designer/checkCollision";
import { animate, stopAnimating } from "@/hooks/designer/animatingDispatcher";
import { replaceComponentInSubArray } from "@/hooks/designer/componentsPagedArrayDispatcher";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, { useContext } from "react";
import Draggable from "react-draggable";

const ElementsMapper: React.FC = () => {
    const designerElementsContext = useContext(
        DesignerElementsContext,
    ) as DesignerElementsContextInterface;

    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { canvasRef } = designerContext;

    const {
        componentsPagedArray,
        currentComponentsInterface,
        animatingDispatch,
        componentsPagedArraydispatch,
        isAnimating,
        isStartDragging,
        scrollingAnimationState,
        setIsStartDragging,
        addCanvasElement,
    } = designerElementsContext;

    return (
        <div className="elements w-fit h-full overflow-visible grid place-items-start">
            {componentsPagedArray.length > 0 &&
                componentsPagedArray[
                    currentComponentsInterface.currentIndex
                ].map((component, index) => {
                    return (
                        <div
                            key={index}
                            className={`w-fit h-fit ${isAnimating.index === component.index && isAnimating.payload === true ? "animate-fade-out" : "animate-fade-in"}`}
                        >
                            <Draggable
                                key={component.index}
                                positionOffset={{
                                    x: 0,
                                    y: component.positionOffset.y,
                                }}
                                position={component.position}
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
                                    }, 301);

                                    if (canvasRef.current) {
                                        const isCollidingWithCanvas =
                                            checkCollision(
                                                data.node,
                                                canvasRef,
                                            );
                                        if (isCollidingWithCanvas) {
                                            addCanvasElement({
                                                id: Math.floor(
                                                    Math.random() *
                                                        Math.floor(
                                                            Math.random() *
                                                                Date.now(),
                                                        ),
                                                ),
                                                element:
                                                    component.element.element,
                                                text: component.element.text,
                                                customClasses:
                                                    component.element
                                                        .customClasses,

                                                selected: false,
                                            });
                                        }
                                    }
                                }}
                            >
                                <div
                                    className={`w-24 h-24 relative bg-gray-600 flex items-center justify-center select-none cursor-pointer ease-out ${isStartDragging ? "transition-none" : "transition-all"} ${scrollingAnimationState === "down" ? "animate-scroll-down" : scrollingAnimationState === "up" ? "animate-scroll-up" : ""}`}
                                    style={{ position: component.state }}
                                >
                                    {component.text}
                                </div>
                            </Draggable>
                        </div>
                    );
                })}
        </div>
    );
};

export default ElementsMapper;
