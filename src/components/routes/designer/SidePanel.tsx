import {
    DesignerContext,
    DesignerContextInterface,
    HomeContext,
    HomeContextInterface,
    SidelPanelContextInterface,
    SidePanelContext,
} from "@/components/util/context";
import { faL, faShapes, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import {
    CanvasElement,
    ElementsRenderer,
    SelectionNodeModes,
} from "./elements/CanvasElementsRenderer";
import Elements from "./panels/Elements";
import Customize from "./panels/Customize";
import StyledElements from "./panels/StyledElements";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const SidePanel: React.FC = () => {
    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const { isMenuOpen } = homeContext;
    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const {
        canvasRef,
        isSidePanelOpen,
        panelDisplay,
        toggleSidePanel,
        changePanelDisplay,
    } = designerContext;

    const [activePanel, setActivePanel] = useState("elements");
    const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
    const [
        currentEditableIndexInCanvasElements,
        setCurrentEditableIndexInCanvasElements,
    ] = useState<number | undefined>();

    const panels = new Map<string, React.ReactNode>([
        ["elements", <Elements />],
        ["customize", <Customize />],
    ]);

    function getCanvasElementByIndex(index: number): CanvasElement | null {
        if (index > canvasElements.length - 1 || canvasElements.length === 0) {
            return null;
        }

        return canvasElements[index];
    }

    function addCanvasElement(element: CanvasElement) {
        const elements = structuredClone(canvasElements);
        elements.push(element);

        setCanvasElements(elements);
    }

    function removeCanvasElement(elementIndex: number) {
        const newElements = canvasElements.filter((_, index) => {
            return index !== elementIndex;
        });

        setCanvasElements(newElements);
    }

    function updateCanvasElement(
        elementId: number,
        newElement: {
            text?: string;
            customClasses?: string;
            selectMode?: SelectionNodeModes;
        },
    ) {
        setCanvasElements((prevElements) =>
            prevElements.map((element) =>
                element.id === elementId
                    ? {
                          ...element,
                          ...newElement,
                      }
                    : element,
            ),
        );
    }

    function updateActivePanel(id: "elements" | "customize") {
        setActivePanel(id);
    }

    function updateCurrentEditableIndex(index: number) {
        if (index > canvasElements.length - 1 || canvasElements.length === 0) {
            return;
        }

        setCurrentEditableIndexInCanvasElements(index);
    }

    const sidePanelContext: SidelPanelContextInterface = {
        addCanvasElement: addCanvasElement,
        removeCanvasElement: removeCanvasElement,
        updateCanvasElement: updateCanvasElement,

        activePanel: activePanel,
        currentEditableIndexInCanvasElements:
            currentEditableIndexInCanvasElements,
        updateActivePanel: updateActivePanel,
        getCanvasElementByIndex: getCanvasElementByIndex,
    };

    return (
        <SidePanelContext.Provider value={sidePanelContext}>
            {canvasRef.current &&
                createPortal(
                    ElementsRenderer(
                        canvasElements,
                        removeCanvasElement,
                        updateCanvasElement,
                        updateCurrentEditableIndex,
                        updateActivePanel,
                    ),
                    canvasRef.current,
                )}
            <div
                className={`bg-white ${isSidePanelOpen ? "translate-x-0 w-80" : "translate-x-60 w-0"} ${isMenuOpen && "translate-x-24"} transition-all ease-in-out duration-300 dark:bg-gray-900 h-full transform self-end relative overflow-visible ${panelDisplay} place-items-center grid-rows-[auto_1fr]`}
                style={{
                    padding: "1rem",
                    boxSizing: "border-box",
                }}
            >
                <ArrowBigRight
                    onClick={() => {
                        toggleSidePanel(false);
                        setTimeout(() => {
                            changePanelDisplay("hidden");
                        }, 170);
                    }}
                    className="absolute w-10 h-10 -left-5 z-0 transition-all ease-in-out duration-300 cursor-pointer bg-gray-700 first:rounded-full"
                />
                <HorizontalMenu />
                {panels.get(activePanel)}
            </div>
        </SidePanelContext.Provider>
    );
};

const HorizontalMenu: React.FC = () => {
    const sidePanelContext = useContext(
        SidePanelContext,
    ) as SidelPanelContextInterface;
    const { activePanel, updateActivePanel } = sidePanelContext;

    const menuItems = [
        { id: "elements", icon: faShapes },
        { id: "customize", icon: faWrench },
    ];

    return (
        <div className="flex items-center mb-5 justify-around space-x-4 py-4 rounded-md w-full h-fit shadow-sm">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() =>
                        updateActivePanel(item.id as "elements" | "customize")
                    }
                    className={`flex flex-col items-center justify-center px-4 py-2 
          text-sm font-medium rounded-md transition-colors 
          ${
              activePanel === item.id
                  ? "bg-purple-500 text-white"
                  : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
                >
                    <FontAwesomeIcon
                        icon={item.icon}
                        className="text-lg mb-1"
                    />
                </button>
            ))}
        </div>
    );
};

export default SidePanel;
