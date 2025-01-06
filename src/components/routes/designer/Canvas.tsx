import {
    DesignerContext,
    DesignerContextInterface,
    HomeContext,
    HomeContextInterface,
    SidelPanelContextInterface,
    SidePanelContext,
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
            className={`${isMenuOpen && "translate-x-24"} ${isSidePanelOpen && "border-4 border-gray-100 shadow-lg p-4"} h-full w-full md:w-screen lg:w-screen transition-all ease-in-out duration-300 overflow-y-scroll flex-grow select-none`}
        ></div>
    );
};

export default Canvas;
