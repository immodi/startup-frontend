import {
    DesignerContext,
    DesignerContextInterface,
    DesignerElementsContext,
    DesignerElementsContextInterface,
    SidelPanelContextInterface,
    SidePanelContext,
} from "@/components/util/context";
import checkCollision from "@/helpers/designer/checkCollision";
import useLandscapeMode from "@/helpers/designer/useLandscapeMode";
import { animate, stopAnimating } from "@/hooks/designer/animatingDispatcher";
import { replaceComponentInArray } from "@/hooks/designer/componentsArrayDispatcher";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, { useContext } from "react";
import Draggable from "react-draggable";

const ElementsMapper: React.FC<{ components: DesignerComponent[] }> = ({
    components,
}) => {
    const isPhoneLandscape = useLandscapeMode();
    const designerElementsContext = useContext(
        DesignerElementsContext,
    ) as DesignerElementsContextInterface;

    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { canvasRef } = designerContext;

    const sidePanelContext = useContext(
        SidePanelContext,
    ) as SidelPanelContextInterface;
    const { addCanvasElement, setSidePanelTransparency } = sidePanelContext;

    // useEffect(() => {}, [isPhoneLandscape]);

    const {
        // currentComponentsInterface,
        animatingDispatch,
        // componentsPagedArraydispatch,
        componentsArrayDispatch,
        isAnimating,
        isStartDragging,
        scrollingAnimationState,
        setIsStartDragging,
    } = designerElementsContext;

    return (
        <div className="w-full h-[90%]">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Elements..."
                    className="w-full p-2 text-sm bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md placeholder-gray-800 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
            </div>
            <div
                className={`elements w-full ${isPhoneLandscape ? "md:h-[40%] h-1/2" : "h-[75%] pb-80"} md:h-[98%] lg:h-[98%] overflow-scroll max-h-[100vh] relative grid grid-cols-3 grid-rows-auto-fill gap-2 place-items-center content-baseline items-center bg-gray-100 dark:bg-gray-800 p-4 pb-8 rounded-md shadow-md`}
            >
                {components.length > 0 &&
                    components.map((component, index) => {
                        return (
                            <div
                                key={index}
                                className={`w-full h-full transition-all ease-in-out scale-90 md:scale-100 lg:scale-100 duration-150 hover:scale-105 ${isAnimating.index === component.index && isAnimating.payload === true ? "animate-fade-out" : "animate-fade-in"}`}
                            >
                                <Draggable
                                    key={component.index}
                                    positionOffset={{
                                        x: 0,
                                        y: component.positionOffset.y,
                                    }}
                                    position={component.position}
                                    onStart={() => {
                                        setSidePanelTransparency(true);
                                    }}
                                    onDrag={(_, data) => {
                                        const newElement: DesignerComponent = {
                                            ...component,
                                            position: {
                                                x: data.x,
                                                y: data.y,
                                            },
                                        };

                                        replaceComponentInArray(
                                            // ...component,
                                            // currentComponentsInterface.currentIndex,
                                            // index,
                                            // () => {
                                            //     console.log(
                                            //         currentComponentsInterface,
                                            //     );
                                            // },
                                            // newElement,
                                            componentsArrayDispatch,
                                            index,
                                            () => {},
                                            newElement,
                                        );
                                    }}
                                    onStop={(_, data) => {
                                        setSidePanelTransparency(false);
                                        animate(
                                            animatingDispatch,
                                            component.index,
                                        );
                                        setIsStartDragging(true);

                                        setTimeout(() => {
                                            const newElement: DesignerComponent =
                                                {
                                                    ...component,
                                                    position: {
                                                        x: 0,
                                                        y: 0,
                                                    },
                                                };

                                            // replaceComponentInSubArray(
                                            //     componentsPagedArraydispatch,
                                            //     currentComponentsInterface.currentIndex,
                                            //     index,
                                            // () => {
                                            //     stopAnimating(
                                            //         animatingDispatch,
                                            //         component.index,
                                            //     );
                                            //     setIsStartDragging(false);
                                            // },
                                            //     newElement,
                                            // );
                                            replaceComponentInArray(
                                                componentsArrayDispatch,
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
                                                        component.element
                                                            .element,
                                                    text: component.element
                                                        .text,
                                                    customClasses:
                                                        component.element
                                                            .customClasses,

                                                    selectMode:
                                                        component.element
                                                            .selectMode ??
                                                        "idle",
                                                    userStyle: {
                                                        fontFamily:
                                                            component.element
                                                                .userStyle
                                                                .fontFamily ??
                                                            "Sans",
                                                        textColor:
                                                            component.element
                                                                .userStyle
                                                                .textColor ??
                                                            "black",
                                                        isBold:
                                                            component.element
                                                                .userStyle
                                                                .isBold ??
                                                            false,
                                                        isItalic:
                                                            component.element
                                                                .userStyle
                                                                .isItalic ??
                                                            false,
                                                        isUnderline:
                                                            component.element
                                                                .userStyle
                                                                .isUnderline ??
                                                            false,
                                                        textAlignment:
                                                            component.element
                                                                .userStyle
                                                                .textAlignment ??
                                                            "left",
                                                        // textContent:
                                                        //     component.element.text,
                                                    },
                                                });
                                            }
                                        }
                                    }}
                                >
                                    <div
                                        className={`w-full gap-2 px-3 min-h-fit h-full rounded-md text-center my-2 relative text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center select-none ease-out flex-col cursor-grab ${isStartDragging ? "transition-none" : "transition-all"} ${scrollingAnimationState === "down" ? "animate-scroll-down" : scrollingAnimationState === "up" ? "animate-scroll-up" : ""}`}
                                        style={{
                                            position: component.state,
                                        }}
                                    >
                                        {/* <span className="anton-regular text-base md:text-3xl lg:text-4xl">
                                        {component.text}
                                    </span>
                                    <span className="text-xs text-gray-400 relative bottom-1">
                                        {component.description}
                                    </span> */}
                                        <img
                                            className="scale-150 md:scale-110 lg:scale-110 select-none"
                                            draggable="false"
                                            src={component.icon}
                                            alt={component.text}
                                        />
                                    </div>
                                </Draggable>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ElementsMapper;
