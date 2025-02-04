import {
    faArrowDown,
    faArrowUp,
    faCheck,
    faPen,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";

export type ElementsType = Headers | "div" | "ol" | "ul";
export type Headers = "h1" | "h2" | "h3" | "h4" | "h5";
export type SelectionNodeModes = "selected" | "editing" | "idle";
export type UserFont = "Sans" | "Serif" | "Monospace";
export type UserTextAlignment = "left" | "center" | "right";
const flexAligner = new Map<UserTextAlignment, string>([
    ["left", "items-baseline"],
    ["center", "items-center"],
    ["right", "items-end"],
]);

export interface CanvasElement {
    id: number;
    element: ElementsType;
    text: string;
    identifier: string | null;
    selectMode: SelectionNodeModes;
    userStyle: CanvasElementStyles;
    customClasses?: string;
    childrenNodeTexts?: Array<string>;
    childrenNodes?: Array<CanvasElement>;
    tabWidth?: number;
}

export interface CanvasElementStyles {
    textColor: string;
    fontFamily: UserFont;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    textAlignment: UserTextAlignment;
    width?: number;
}
export interface NewCanvasElement {
    text?: string;
    customClasses?: string;
    selectMode?: SelectionNodeModes;
    userStyle?: CanvasElementStyles;
    childrenNodes?: Array<CanvasElement>;
}

export function ElementsRenderer(
    elements: CanvasElement[],
    changeAllCanvasElements: (newCanvasElements: CanvasElement[]) => void,
    removeCanvasElement: (elementId: number) => void,
    updateCanvasElement: (
        elementIndex: number,
        newElement: NewCanvasElement,
    ) => void,
    updateCurrentEditableIndex: (index: number) => void,
    updateActivePanel: (id: "elements" | "customize") => void,
): ReactNode {
    function moveElementUp(id: number) {
        const elementsCopy = [...elements];
        const currentIndex = elementsCopy.findIndex(
            (element) => element.id === id,
        );

        // If element not found or it's already at the top
        if (currentIndex <= 0) {
            return elementsCopy;
        }

        // Swap with previous element
        const temp = elementsCopy[currentIndex];
        elementsCopy[currentIndex] = elementsCopy[currentIndex - 1];
        elementsCopy[currentIndex - 1] = temp;

        changeAllCanvasElements(elementsCopy);
    }

    function moveElementDown(id: number) {
        const elementsCopy = [...elements];
        const currentIndex = elementsCopy.findIndex(
            (element) => element.id === id,
        );

        // If element not found or it's already at the bottom
        if (currentIndex === -1 || currentIndex >= elementsCopy.length - 1) {
            return elementsCopy;
        }

        // Swap with next element
        const temp = elementsCopy[currentIndex];
        elementsCopy[currentIndex] = elementsCopy[currentIndex + 1];
        elementsCopy[currentIndex + 1] = temp;

        changeAllCanvasElements(elementsCopy);
    }

    return (
        <>
            {elements.map((element, index) => {
                const className = element.customClasses ?? "";
                return convertHTMLElementToReactNode(
                    element.element,
                    element.identifier,
                    className,

                    element.text,
                    element.id,
                    element.selectMode,
                    element.userStyle,
                    element.childrenNodeTexts,
                    element.childrenNodes,
                    element.tabWidth,
                    () => {
                        removeCanvasElement(index);
                    },
                    updateCanvasElement,
                    () => {
                        updateCurrentEditableIndex(index);
                        updateActivePanel("customize");
                    },
                    moveElementUp,
                    moveElementDown,
                );
            })}
        </>
    );
}

function convertHTMLElementToReactNode(
    tagName: string,
    identifier: string | null,
    className: string,
    text: string,
    id: number,
    selectMode: SelectionNodeModes,
    userStyle: CanvasElementStyles,
    childrenNodeTexts: Array<string> | undefined,
    childrenNodes: Array<CanvasElement> | undefined,
    tabWidth: number | undefined,
    removeCanvasElement: () => void,
    updateCanvasElement: (
        elementIndex: number,
        newElement: NewCanvasElement,
    ) => void,
    updateCurrentEditableIndex: () => void,
    moveElementUp: (id: number) => void,
    moveElementDown: (id: number) => void,
): ReactNode {
    function clickManager() {
        if (selectMode !== "editing") {
            switch (selectMode) {
                case "idle":
                    return updateCanvasElement(id, {
                        selectMode: "selected",
                    });
                default:
                    return updateCanvasElement(id, {
                        selectMode: "idle",
                    });
            }
        }
    }

    function getFontStyle(userFont: UserFont) {
        const fontsStyles = {
            Sans: "font-sans",
            Serif: "font-serif",
            Monospace: "font-mono",
        };

        return fontsStyles[userFont];
    }

    function handleEditText(node: HTMLElement) {
        if (node.children.length > 0 && !className.includes("spacer-div")) {
            clickManager();
            const textInput = document.querySelector(
                `#textarea${id}`,
            ) as HTMLTextAreaElement;

            textInput.value = text;
            textInput.focus();

            updateCanvasElement(id, {
                selectMode: "editing",
            });
        }
    }

    function buttons(): Array<JSX.Element> {
        return [
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    removeCanvasElement();
                }}
                id={`deleteElementButton${id}`}
                className={`remove-this-at-export opacity-40 hover:opacity-100 x-button-elements absolute top-0 right-0 flex justify-center items-center z-10 w-7 h-7 text-base dark:text-black m-2 dark:bg-white bg-black text-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
            >
                <FontAwesomeIcon icon={faTrash} />
            </span>,
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    updateCanvasElement(id, {
                        selectMode: "idle",
                    });
                }}
                id={`saveElementButton${id}`}
                className={`remove-this-at-export opacity-40 hover:opacity-100 x-button-elements absolute top-0 right-10 flex justify-center items-center z-10 w-7 h-7 text-center text-base dark:text-black m-2 dark:bg-white bg-black text-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
            >
                <FontAwesomeIcon icon={faCheck} />
            </span>,

            <span
                id={`editElementButton${id}`}
                onClick={(e) => {
                    e.stopPropagation();
                    updateCurrentEditableIndex();

                    handleEditText(e.currentTarget);
                }}
                className={`remove-this-at-export opacity-40 hover:opacity-100 x-button-elements absolute top-0 right-20 flex justify-center items-center z-10 w-7 h-7 text-center text-base dark:text-black m-2 dark:bg-white bg-black text-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
            >
                <FontAwesomeIcon icon={faPen} />
            </span>,
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    // updateCanvasElement(id, {
                    //     selectMode: "idle",
                    // });
                    moveElementUp(id);
                }}
                id={`upElementButton${id}`}
                className={`remove-this-at-export opacity-40 hover:opacity-100 x-button-elements absolute top-0 right-[7.5rem] flex justify-center items-center z-10 w-7 h-7 text-center text-base dark:text-black m-2 dark:bg-white bg-black text-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </span>,
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    // updateCanvasElement(id, {
                    //     selectMode: "idle",
                    // });
                    moveElementDown(id);
                }}
                id={`downElementButton${id}`}
                className={`remove-this-at-export opacity-40 hover:opacity-100 x-button-elements absolute top-0 right-[10rem] flex justify-center items-center z-10 w-7 h-7 text-center text-base dark:text-black m-2 dark:bg-white bg-black text-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
            >
                <FontAwesomeIcon icon={faArrowDown} />
            </span>,
        ];
    }

    function getChildren(): Array<JSX.Element> {
        if (childrenNodeTexts !== undefined) {
            const children = [
                ...childrenNodeTexts.map((listItem) => <li>{listItem}</li>),
                ...buttons(),
            ];

            return children;
        } else if (childrenNodes !== undefined) {
            const children = [
                ...childrenNodes.map((node) => {
                    return React.createElement(node.element, {
                        key: node.id,
                        id: node.id,
                        style: {
                            color: node.userStyle.textColor,
                            paddingLeft: `${node.tabWidth}rem`,
                            width: `${node.userStyle.width}%`,
                            backgroundColor:
                                selectMode === "selected" && getRandomColor(),
                            textDecoration: node.userStyle.isUnderline
                                ? "underline"
                                : "none",
                            textDecorationLine: node.userStyle.isUnderline
                                ? "underline"
                                : "none",
                            textDecorationStyle: "solid",
                            display: "flex", // Add this
                            alignItems: "center",
                            justifyContent:
                                node.userStyle.textAlignment === "right"
                                    ? "flex-end"
                                    : node.userStyle.textAlignment === "center"
                                      ? "center"
                                      : "flex-start",
                            textAlign: node.userStyle.textAlignment,
                        },
                        className: `${node.customClasses} flex min-h-12 h-auto relative text-${node.userStyle.textAlignment}`, // Add text alignment class
                        children: [
                            <div
                                id={`${node.identifier !== null ? node.identifier : ""}`}
                                className={`
                              ${node.userStyle.isBold && "font-bold"} 
                              ${node.userStyle.isItalic && "italic"} 
                              ${getFontStyle(node.userStyle.fontFamily)} 
                              w-fit h-fit
                              text-${node.userStyle.textAlignment}  // Add this
                            `}
                                style={{
                                    width: "100%", // Add this
                                    textAlign: node.userStyle.textAlignment, // Add this
                                }}
                            >
                                {node.text}
                            </div>,
                        ],
                    });
                }),
                ...buttons(),
            ];

            return children;
        }

        const children = [
            <div
                style={{
                    textDecoration: userStyle.isUnderline
                        ? "underline"
                        : "none",
                    textDecorationLine: userStyle.isUnderline
                        ? "underline"
                        : "none",
                    textDecorationStyle: "solid",
                    display: "flex", // Add this
                    alignItems: "center",
                    justifyContent:
                        userStyle.textAlignment === "right"
                            ? "flex-end"
                            : userStyle.textAlignment === "center"
                              ? "center"
                              : "flex-start",
                    textAlign: userStyle.textAlignment,
                    width: "100%", // Add this to ensure full width
                }}
                id={`mainElementText${id}`}
                className={`whitespace-pre-wrap content-center w-full h-auto min-h-12 text-${userStyle.textAlignment}`}
            >
                <p
                    id={`${identifier !== null ? identifier : ""}`}
                    className={`w-full h-auto ${userStyle.isBold && "font-bold"} ${
                        userStyle.isItalic && "italic"
                    } ${getFontStyle(userStyle.fontFamily)} text-${userStyle.textAlignment}`}
                    style={{
                        textAlign: userStyle.textAlignment, // Add this
                        width: "100%", // Add this
                    }}
                >
                    {text}
                </p>
            </div>,
            ...buttons(),
            <textarea
                id={`textarea${id}`}
                defaultValue={text}
                onChange={(event) => {
                    // updateKeyBoardString(event.target.value);
                    updateCanvasElement(id, {
                        text: event.target.value,
                    });
                }}
                // type="text"
                className={`remove-this-at-export content-center w-full min-h-12 h-full resize-none bg-gray-400 dark:bg-gray-600 absolute left-0 ${selectMode === "editing" ? "w-full" : "hidden w-0"} ${userStyle.isBold ? "font-bold" : ""} ${userStyle.isItalic ? "italic" : ""} ${userStyle.isUnderline ? "underline" : ""} ${"text-" + userStyle.textAlignment} ${getFontStyle(userStyle.fontFamily)}`}
            />,
        ];

        return children;
    }

    return React.createElement(tagName, {
        key: id,
        id: id,
        style: {
            color: userStyle.textColor,
            paddingLeft: `${tabWidth}rem`,
            width: "100%", // Add this to ensure full width
            textAlign: userStyle.textAlignment, // Add explicit text alignment
        },
        className: `${className} w-full min-h-12 h-auto relative flex ${
            selectMode !== "idle" ? "selected" : ""
        } ${
            childrenNodeTexts === undefined
                ? `${userStyle.textAlignment} ${flexAligner.get(userStyle.textAlignment)}`
                : flexAligner.get(userStyle.textAlignment)
        }`,
        onClick: () => {
            clickManager();
        },
        onDoubleClick: (e: React.MouseEvent<HTMLElement>) => {
            const node = e.currentTarget as HTMLElement;
            if (!className.includes("spacer-div")) {
                handleEditText(node);
            }
        },
        children: getChildren(),
    });
}

function getRandomColor(): string {
    // Generate random RGB values (0-255)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convert to hex and pad with zeros if needed
    const toHex = (n: number): string => n.toString(16).padStart(2, "0");

    // Return hex color string
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
