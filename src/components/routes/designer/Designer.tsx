import {
    Context,
    ContextInterface,
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import React, { useContext, useRef } from "react";
import Elements from "./Elements";
import Canvas from "./Canvas";
import { LoadingSpinner } from "@/components/ui/Spinner";

const Designer: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const designerContext: DesignerContextInterface = {
        canvasRef: canvasRef,
    };

    return (
        <DesignerContext.Provider value={designerContext}>
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
                <Canvas />
                <Elements />
            </div>
        </DesignerContext.Provider>
    );
};

export default Designer;
