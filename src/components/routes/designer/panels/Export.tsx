import {
    DesignerContext,
    DesignerContextInterface,
    SidelPanelContextInterface,
    SidePanelContext,
} from "@/components/util/context";
import React, { useContext, useEffect, useState } from "react";

const Export: React.FC = () => {
    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { canvasRef } = designerContext;
    const sidePanelContext = useContext(
        SidePanelContext,
    ) as SidelPanelContextInterface;
    const { triggerIdleToAllCanvasElements } = sidePanelContext;
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        if (exporting) {
            const html = computeHTML(canvasRef);
            // the export is here for some reason
            console.log(html);
        }

        setExporting(false);
    }, [exporting]);

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md w-full h-full overflow-y-scroll flex justify-center items-center">
            <button
                className="w-fit h-fit p-2 rounded-md text-lg bg-gray-300 text-black duration-300 hover:bg-gray-500 hover:scale-110"
                onClick={() => {
                    setExporting(true);
                    triggerIdleToAllCanvasElements();
                }}
            >
                Export Now!
            </button>
        </div>
    );
};

function computeHTML(elementRef: React.RefObject<HTMLDivElement>): string {
    if (!elementRef.current) return "";

    const element = elementRef.current;
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.backgroundColor = "#FFFFFF";

    Array.from(clonedElement.children).forEach((canvasElement) => {
        if (canvasElement.classList.contains("spacer-div")) {
            canvasElement.innerHTML = "<br />";
        }

        Array.from(canvasElement.children).forEach((canvasElementChild) => {
            if (
                canvasElementChild.classList.contains("remove-this-at-export")
            ) {
                canvasElementChild.remove();
            }
        });
    });

    const cssStyles = Array.from(document.head.getElementsByTagName("style"))
        .map((style) => style.innerHTML)
        .join("");

    const styleElement = document.createElement("style");
    styleElement.innerHTML = cssStyles;

    clonedElement.appendChild(styleElement);
    return clonedElement.outerHTML;
}

export default Export;
