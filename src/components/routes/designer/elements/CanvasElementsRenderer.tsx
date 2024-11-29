import React, { ReactNode } from "react";

export type ElementsType = "div" | Headers | "p";
export type Headers = "h1" | "h2" | "h3" | "h4" | "h5";

export interface CanvasElement {
    id: number;
    element: ElementsType;
    text: string;
    customClasses?: string;
    selected: boolean;
}

export function ElementsRenderer(
    elements: CanvasElement[],
    removeCanvasElement: (elementId: number) => void,
    updateCanvasElement: (
        elementIndex: number,
        newElement: {
            text?: string;
            customClasses?: string;
            selected: boolean;
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
                    element.selected,
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
    isSelected: boolean,
    removeCanvasElement: () => void,
    updateCanvasElement: (
        elementIndex: number,
        newElement: {
            text?: string;
            customClasses?: string;
            selected: boolean;
        },
    ) => void,
): ReactNode {
    function onClickElement(element: HTMLElement) {
        if (element.children.length > 0) {
            return updateCanvasElement(id, {
                selected: !isSelected,
            });
        } else {
            removeCanvasElement();
        }
    }

    return React.createElement(tagName, {
        id: id,
        className: `${className} relative ${isSelected ? "selected" : ""}`,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
            const clickedNode = e.target as HTMLElement;
            onClickElement(clickedNode);
        },
        children: [
            text,
            <span
                className={`x-button-elements w-7 h-7 text-center text-base text-black absolute top-0 right-0 m-2 bg-white rounded-full cursor-pointer transition-all ease-in-out duration-100 ${isSelected ? "" : "hidden"}`}
            >
                x
            </span>,
        ],
    });
}
