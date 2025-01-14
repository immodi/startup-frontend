import {
    DesignerContext,
    DesignerContextInterface,
    HomeContext,
    HomeContextInterface,
    SidelPanelContextInterface,
    SidePanelContext,
} from "@/components/util/context";
import {
    faFileExport,
    faShapes,
    faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBigDown, ArrowBigRight } from "lucide-react";
import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { ElementsRenderer } from "./elements/CanvasElementsRenderer";
import Customize from "./panels/Customize";
import Elements from "./panels/Elements";
import Export from "./panels/Export";

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
        toggleSidePanelState,
        canvasElements,
        changeAllCanvasElements,
        removeCanvasElement,
        updateCanvasElementByItsId,
        updateCurrentEditableIndex,
    } = designerContext;

    const [activePanel, setActivePanel] = useState("elements");
    const [isTransparent, setIsTransparent] = useState(false);

    const panels = new Map<string, React.ReactNode>([
        ["elements", <Elements />],
        ["customize", <Customize />],
        ["export", <Export />],
    ]);

    function updateActivePanel(id: "elements" | "customize" | "export") {
        setActivePanel(id);
    }

    function setSidePanelTransparency(isTransparent: boolean) {
        setIsTransparent(isTransparent);
    }

    const sidePanelContext: SidelPanelContextInterface = {
        activePanel: activePanel,
        updateActivePanel: updateActivePanel,

        setSidePanelTransparency: setSidePanelTransparency,

        // getCanvasElementByIndex: getCanvasElementByIndex,
    };

    return (
        <SidePanelContext.Provider value={sidePanelContext}>
            {canvasRef.current &&
                createPortal(
                    ElementsRenderer(
                        canvasElements,
                        changeAllCanvasElements,
                        removeCanvasElement,
                        updateCanvasElementByItsId,
                        updateCurrentEditableIndex,
                        updateActivePanel,
                    ),
                    canvasRef.current,
                )}
            <div
                className={`bg-white ${isTransparent ? "opacity-10" : ""} absolute md:relative lg:relative h-1/2 md:h-full lg:h-full w-[100dvw] md:w-96 lg:w-96 ${isSidePanelOpen ? "translate-x-0" : "translate-y-60 md:translate-y-0 lg:translate-y-0 md:translate-x-60 lg:translate-x-60"} ${isMenuOpen && "translate-x-24"} transition-all ease-in-out duration-300 dark:bg-gray-900 z-20 transform self-end overflow-visible ${panelDisplay} place-items-center grid-rows-[auto_1fr]`}
                style={{
                    padding: "1rem",
                    boxSizing: "border-box",
                }}
            >
                <ArrowBigDown
                    onClick={() => {
                        toggleSidePanelState(false);
                    }}
                    className={`absolute bottom-[95%] md:bottom-1/2 lg:bottom-1/2 left-[45%] md:-left-5 lg:-left-5 w-10 h-10 z-10 transition-all ease-in-out duration-300 cursor-pointer bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white rounded-full md:hidden lg:hidden`}
                />

                <ArrowBigRight
                    onClick={() => {
                        toggleSidePanelState(false);
                    }}
                    className={`absolute w-10 h-10 -left-5 z-10 transition-all ease-in-out duration-300 cursor-pointer bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white rounded-full portrait:hidden`}
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
        { id: "export", icon: faFileExport },
    ];

    return (
        <div className="flex items-center justify-around py-2 rounded-md w-full h-fit shadow-sm">
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
                  ? "bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white"
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
