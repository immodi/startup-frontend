import React, { ReactNode, useState } from "react";
``;
export type ElementsType = Headers | "p";
export type Headers = "h1" | "h2" | "h3" | "h4" | "h5";
export type SelectionNodeModes = "selected" | "editing" | "idle";
export type UserFont =
    | "Arial"
    | "Verdana"
    | "Georgia"
    | "Times New Roman"
    | "Courier New";

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
    textContent: string;
}

export function ElementsRenderer(
    elements: CanvasElement[],
    removeCanvasElement: (elementId: number) => void,
    updateCanvasElement: (
        elementIndex: number,
        newElement: {
            text?: string;
            customClasses?: string;
            selectMode?: SelectionNodeModes;
        },
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
    removeCanvasElement: () => void,
    updateCanvasElement: (
        elementIndex: number,
        newElement: {
            text?: string;
            customClasses?: string;
            selectMode?: SelectionNodeModes;
        },
    ) => void,
    updateCurrentEditableIndex: () => void,
): ReactNode {
    function clickManager(element: HTMLElement) {
        if (element.children.length > 0) {
            // main element
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
        } else if (element.id === "deleteElementButton") {
            removeCanvasElement();
        } else if (element.id === "saveElementButton") {
            return updateCanvasElement(id, {
                selectMode: "idle",
            });
        } else if (element.id === "editElementButton") {
            updateCurrentEditableIndex();
        }
    }

    function handleSaveText(e: KeyboardEvent, closingFn: () => void) {
        if (e.key === "Enter") {
            document.removeEventListener("keyup", (e: KeyboardEvent) => {
                handleSaveText(e, closingFn);
            });

            closingFn();
        }
    }

    function handleEditText(node: HTMLElement) {
        if (node.children.length > 0) {
            clickManager(node);

            const textInput = node.children[1] as HTMLElement;
            textInput.focus();

            updateCanvasElement(id, {
                selectMode: "editing",
            });

            document.addEventListener("keyup", (e: KeyboardEvent) => {
                handleSaveText(e, () => {
                    updateCanvasElement(id, {
                        selectMode: "idle",
                    });
                });
            });
        }
    }

    return React.createElement(tagName, {
        id: id,
        className: `${className} w-full h-12 flex left items-center relative ${selectMode !== "idle" ? "selected" : ""}`,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
            const node = e.target as HTMLElement;
            clickManager(node);
        },

        onDoubleClick: (e: React.MouseEvent<HTMLElement>) => {
            const node = e.target as HTMLElement;
            handleEditText(node);
        },

        children: [
            text,
            <span
                id="deleteElementButton"
                className={`x-button-elements absolute top-0 right-0 flex justify-center items-center z-10 w-7 h-7 text-base text-black m-2 bg-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
            >
                🗑
            </span>,
            <span
                id="saveElementButton"
                className={`x-button-elements absolute top-0 right-10 flex justify-center items-center z-10 w-7 h-7 text-center text-base text-black m-2 bg-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode === "editing" ? "" : "hidden"}`}
            >
                ✔
            </span>,
            <span
                id="editElementButton"
                className={`x-button-elements absolute top-0 right-20 flex justify-center items-center z-10 w-7 h-7 text-center text-base text-black m-2 bg-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode === "editing" ? "" : "hidden"}`}
            >
                ✎
            </span>,
            <input
                defaultValue={text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    // updateKeyBoardString(event.target.value);
                    updateCanvasElement(id, {
                        text: event.target.value,
                    });
                }}
                type="text"
                className={`bg-gray-500 absolute left-0 ${selectMode === "editing" ? "w-full" : "hidden w-0"}`}
            />,
        ],
    });
}
