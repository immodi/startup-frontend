import React, { ReactNode, useState } from "react";

export type ElementsType = "div" | Headers | "p";
export type Headers = "h1" | "h2" | "h3" | "h4" | "h5";
export type SelectionNodeModes = "selected" | "editing" | "idle";

export interface CanvasElement {
    id: number;
    element: ElementsType;
    text: string;
    customClasses?: string;
    selectMode: SelectionNodeModes;
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
        } else if (element.nodeName === "SPAN") {
            removeCanvasElement();
        } else {
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

    return React.createElement(tagName, {
        id: id,
        className: `${className} relative ${selectMode !== "idle" ? "selected" : ""}`,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
            const node = e.target as HTMLElement;
            clickManager(node);
        },

        onDoubleClick: (e: React.MouseEvent<HTMLElement>) => {
            const node = e.target as HTMLElement;

            if (node.children.length > 0) {
                console.log(node);

                clickManager(node);

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
        },

        children: [
            text,
            <span
                className={`x-button-elements z-10 w-7 h-7 text-center text-base text-black absolute top-0 right-0 m-2 bg-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${selectMode !== "idle" ? "" : "hidden"}`}
            >
                x
            </span>,
            <input
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    // updateKeyBoardString(event.target.value);
                    /// TODO: thtis doesnt change the state and thus doesn't change the vlaues, fix it
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
