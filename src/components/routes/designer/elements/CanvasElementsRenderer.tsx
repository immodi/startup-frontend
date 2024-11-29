import React, { ReactNode } from "react";

export type ElementsType = "div" | Headers | "p";
export type Headers = "h1" | "h2" | "h3" | "h4" | "h5";

export interface CanvasElement {
    id: number;
    element: ElementsType;
    text: string;
    customClasses?: string;
}

export function ElementsRenderer(elements: CanvasElement[]): ReactNode {
    return (
        <>
            {elements.map((element) => {
                const className = element.customClasses ?? "";
                return convertHTMLElementToReactNode(
                    element.element,
                    className,
                    element.text,
                );
            })}
        </>
    );
}

function convertHTMLElementToReactNode(
    tagName: string,
    className: string,
    text: string,
): ReactNode {
    const canvasElement = document.createElement(tagName);
    const classes = className.split(" ");
    classes.forEach((className) => {
        if (className.trim() !== "") {
            canvasElement.classList.add(className.trim());
        }
    });
    canvasElement.innerHTML = text;

    return React.createElement(tagName, {
        className: canvasElement.className,
        dangerouslySetInnerHTML: {
            __html: canvasElement.innerHTML,
        },
    });
}
