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
    const { canvasRef } = designerContext;

    return (
        <div
            id="calbas"
            ref={canvasRef}
            className={`${isMenuOpen && "translate-x-24"} bg-gray-500 h-full w-full transition-all ease-in-out duration-300 overflow-y-scroll flex-grow select-none`}
        ></div>
    );
};

export default Canvas;
