import {
    faCheck,
    faPen,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";

export type ElementsType = Headers | "div";
export type Headers = "h1" | "h2" | "h3" | "h4" | "h5";
export type SelectionNodeModes = "selected" | "editing" | "idle";
export type UserFont = "Sans" | "Serif" | "Monospace";
export type UserTextAlignment = "left" | "center" | "right";

export interface CanvasElement {
    id: number;
    element: ElementsType;
    text: string;
    selectMode: SelectionNodeModes;
    userStyle: CanvasElementStyles;
    customClasses?: string;
}

export interface CanvasElementStyles {
    textColor: string;
    fontFamily: UserFont;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    textAlignment: UserTextAlignment;
    // textContent: string;
}
export interface NewCanvasElement {
    text?: string;
    customClasses?: string;
    selectMode?: SelectionNodeModes;
    userStyle?: CanvasElementStyles;
}

export function ElementsRenderer(
    elements: CanvasElement[],
    removeCanvasElement: (elementId: number) => void,
    updateCanvasElement: (
        elementIndex: number,
        newElement: NewCanvasElement,
    ) => void,
    updateCurrentEditableIndex: (index: number) => void,
    updateActivePanel: (id: "elements" | "customize") => void,
): ReactNode {
    return (
        <>
            {elements.map((element, index) => {
                const className = element.customClasses ?? "";
                return convertHTMLElementToReactNode(
                    element.element,
                    className,
                    element.text,
                    element.id,
                    element.selectMode,
                    element.userStyle,
                    () => {
                        removeCanvasElement(index);
                    },
                    updateCanvasElement,
                    () => {
                        updateCurrentEditableIndex(index);
                        updateActivePanel("customize");
                    },
                );
            })}
        </>
    );
}

function convertHTMLElementToReactNode(
    tagName: string,
    className: string,
    text: string,
    id: number,
    selectMode: SelectionNodeModes,
    userStyle: CanvasElementStyles,
    removeCanvasElement: () => void,
    updateCanvasElement: (
        elementIndex: number,
        newElement: NewCanvasElement,
    ) => void,
    updateCurrentEditableIndex: () => void,
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
        if (node.children.length > 0) {
            clickManager();
            const textInput = node as HTMLTextAreaElement;

            textInput.value = text;
            textInput.focus();

            updateCanvasElement(id, {
                selectMode: "editing",
            });
        }
    }

    return React.createElement(tagName, {
        key: id,
        id: id,
        style: { color: userStyle.textColor },
        className: `${className} w-full min-h-12 h-auto flex items-center relative ${selectMode !== "idle" ? "selected" : ""} ${userStyle.textAlignment}`,
        onClick: () => {
            // const node = e.currentTarget as HTMLElement;
            clickManager();
        },

        onDoubleClick: (e: React.MouseEvent<HTMLElement>) => {
            const node = e.currentTarget as HTMLElement;
            handleEditText(node);
        },

        children: [
            <div
                id={`mainElementText${id}`}
                className={`whitespace-pre-wrap content-center w-full h-auto min-h-12 ${userStyle.isBold && "font-bold"} ${userStyle.isItalic && "italic"} ${userStyle.isUnderline && "underline"} ${getFontStyle(userStyle.fontFamily)}`}
            >
                {text}
            </div>,
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    removeCanvasElement();
                }}
                id={`deleteElementButton${id}`}
                className={`remove-this-at-export x-button-elements absolute top-0 right-0 flex justify-center items-center z-10 w-7 h-7 text-base text-black m-2 bg-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
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
                className={`remove-this-at-export x-button-elements absolute top-0 right-10 flex justify-center items-center z-10 w-7 h-7 text-center text-base text-black m-2 bg-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
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
                className={`remove-this-at-export x-button-elements absolute top-0 right-20 flex justify-center items-center z-10 w-7 h-7 text-center text-base text-black m-2 bg-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
            >
                <FontAwesomeIcon icon={faPen} />
            </span>,
            <textarea
                defaultValue={text}
                onChange={(event) => {
                    // updateKeyBoardString(event.target.value);
                    updateCanvasElement(id, {
                        text: event.target.value,
                    });
                }}
                // type="text"
                className={`remove-this-at-export content-center w-full min-h-12 h-full resize-none bg-gray-500 absolute left-0 ${selectMode === "editing" ? "w-full" : "hidden w-0"} ${userStyle.isBold ? "font-bold" : ""} ${userStyle.isItalic ? "italic" : ""} ${userStyle.isUnderline ? "underline" : ""} ${"text-" + userStyle.textAlignment} ${getFontStyle(userStyle.fontFamily)}`}
            />,
        ],
    });
}
