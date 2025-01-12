import {
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import SwipeDetector from "@/helpers/designer/swipeDetector";
import { ArrowBigLeft, ArrowBigUp } from "lucide-react";
import React, { useRef, useState } from "react";
import Canvas from "./Canvas";
import { SaveDesignModal } from "./elements/SaveDesignModal";
import SidePanel from "./SidePanel";

const Designer: React.FC = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);
    const [panelDisplay, setPanelDisplay] = useState<"grid" | "hidden">(
        "hidden",
    );

    const canvasRef = useRef<HTMLDivElement>(null);
    const designerRef = useRef<HTMLDivElement>(null);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [saveModelName, setSaveModalName] = useState("");

    function toggleSidePanel(state: boolean) {
        setIsSidePanelOpen(state);
    }

    function changePanelDisplay(state: "grid" | "hidden") {
        setPanelDisplay(state);
    }

    function toggleSidePanelState(state: boolean) {
        if (state) {
            changePanelDisplay("grid");
        } else {
            changePanelDisplay("hidden");
        }

        setTimeout(() => {
            toggleSidePanel(state);
        }, 10);
    }

    function openSaveModal() {
        setIsSaveModalOpen(true);
    }

    const designerContext: DesignerContextInterface = {
        canvasRef: canvasRef,
        designerRef: designerRef,
        isSidePanelOpen: isSidePanelOpen,
        panelDisplay: panelDisplay,
        saveModelName: saveModelName,
        toggleSidePanel: toggleSidePanel,
        changePanelDisplay: changePanelDisplay,
        toggleSidePanelState: toggleSidePanelState,
        openSaveModal: openSaveModal,
        // changeSaveDesignModal: changeSaveDesignModal,
    };

    return (
        <DesignerContext.Provider value={designerContext}>
            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 relative flex items-center justify-center overflow-hidden">
                <div
                    id="elementHiddenOverlay"
                    ref={designerRef}
                    className="absolute w-screen h-screen"
                ></div>
                <SwipeDetector
                    onSwipeUp={() => {
                        toggleSidePanelState(true);
                    }}
                />
                <ArrowBigUp
                    onClick={() => {
                        toggleSidePanelState(true);
                    }}
                    className={`${isSidePanelOpen ? "hidden" : "absolute"} w-10 h-10 right-[45%] bottom-0 z-10 transition-all ease-in-out duration-300 cursor-pointer bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white rounded-full md:hidden lg:hidden`}
                />

                <ArrowBigLeft
                    onClick={() => {
                        toggleSidePanelState(true);
                    }}
                    className={`${isSidePanelOpen ? "hidden" : "absolute"} w-10 h-10 right-0 z-10 transition-all ease-in-out duration-300 cursor-pointer bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white rounded-full portrait:hidden`}
                />

                <Canvas />
                <SidePanel />

                {
                    <SaveDesignModal
                        isOpen={isSaveModalOpen}
                        onClose={() => {
                            setIsSaveModalOpen(false);
                        }}
                        handleSubmit={setSaveModalName}
                    />
                }
            </div>
        </DesignerContext.Provider>
    );
};

export default Designer;
