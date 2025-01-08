import {
    DesignerContext,
    DesignerContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";
import React, { useContext } from "react";

const Canvas: React.FC = () => {
    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const { isMenuOpen } = homeContext;

    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { canvasRef, isSidePanelOpen } = designerContext;

    return (
        <div
            id="canvas"
            ref={canvasRef}
            className={`
                ${isMenuOpen ? "translate-x-24" : ""} 
                ${isSidePanelOpen ? "border-4 shadow-lg p-4" : ""} 
                ${
                    isSidePanelOpen
                        ? "border-[#4A00E0] dark:border-[#7A1CAC]"
                        : "border-gray-300 dark:border-gray-700"
                } 
                h-full w-full md:w-screen lg:w-screen 
                transition-all ease-in-out duration-300 
                overflow-y-scroll flex-grow select-none
              `}
        ></div>
    );
};

export default Canvas;
