import {
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import React, { useRef, useState } from "react";
import Canvas from "./Canvas";
import SidePanel from "./SidePanel";

const Designer: React.FC = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);
    const [panelDisplay, setPanelDisplay] = useState<"grid" | "hidden">(
        "hidden",
    );

    const canvasRef = useRef<HTMLDivElement>(null);
    const designerContext: DesignerContextInterface = {
        canvasRef: canvasRef,
        isSidePanelOpen: isSidePanelOpen,
        panelDisplay: panelDisplay,
        toggleSidePanel: toggleSidePanel,
        changePanelDisplay: changePanelDisplay,
    };

    function toggleSidePanel(state: boolean) {
        setIsSidePanelOpen(state);
    }

    function changePanelDisplay(state: "grid" | "hidden") {
        setPanelDisplay(state);
    }

    return (
        <DesignerContext.Provider value={designerContext}>
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
                <ArrowBigLeft
                    onClick={() => {
                        changePanelDisplay("grid");
                        setTimeout(() => {
                            toggleSidePanel(true);
                        }, 2);
                    }}
                    className="absolute w-10 h-10 right-0 transition-all ease-in-out duration-300 cursor-pointer bg-gray-700 rounded-full"
                />
                <Canvas />
                <SidePanel />
            </div>
        </DesignerContext.Provider>
    );
};

export default Designer;
