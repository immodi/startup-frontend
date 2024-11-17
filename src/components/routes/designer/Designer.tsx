import {
    Context,
    ContextInterface,
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import React, { useContext, useRef } from "react";
import Components from "./Components";

const Designer: React.FC = () => {
    const designerComponentRef = useRef<HTMLDivElement>(null);
    const designerContext: DesignerContextInterface = {
        designerComponentRef: designerComponentRef,
    };

    return (
        <DesignerContext.Provider value={designerContext}>
            <div
                ref={designerComponentRef}
                id="designerComponentRef"
                className="w-full h-full bg-gray-100 dark:bg-gray-800 relative flex flex-col items-center justify-center overflow-hidden"
            >
                <Components />
            </div>
        </DesignerContext.Provider>
    );
};

export default Designer;
