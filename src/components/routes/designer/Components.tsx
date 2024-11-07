import { Context, ContextInterface } from "@/components/util/context";
import {
    onMoveElement,
    onStopDrag,
} from "@/helpers/designer/componentCardsMethods";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

const Components: React.FC = () => {
    const [components, setComponents] = useState<Array<DesignerComponent>>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const context = useContext(Context) as ContextInterface;
    const { isDarkMode } = context.localState;

    useEffect(() => {
        const componentsArray: DesignerComponent[] = [];
        const elementsNumber = 8;
        let containerWidth;
        if (containerRef.current !== null) {
            const computedStyle = window.getComputedStyle(containerRef.current);
            containerWidth =
                (containerRef.current.offsetWidth -
                    parseInt(computedStyle.paddingLeft) -
                    parseInt(computedStyle.paddingRight)) /
                //neeed to account the card width in this, to center them
                2;
        } else {
            containerWidth = 0;
        }
        for (let i = 0; i < elementsNumber; i++) {
            componentsArray.push({
                text: `DIV ${i}`,
                position: {
                    x: containerWidth,
                    y: i * 40,
                },
                state: "relative",
                positionOffset: { x: 0, y: 0 },
            });
        }

        setComponents(componentsArray);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`bg-white dark:bg-gray-800 shadow-lg w-80 h-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : "border-gray-300"} self-end relative`}
            style={{
                padding: "1rem",
                boxSizing: "border-box",
                overflowY: isSelecting ? "visible" : "scroll",
            }}
        >
            {components.map((component, index) => (
                <Draggable
                    key={index}
                    position={component.position}
                    onDrag={(_, data) => {
                        onMoveElement(data, components, index, setComponents);
                        setIsSelecting(true);
                    }}
                    onStop={() => {
                        onStopDrag(components, index, setComponents);
                        setIsSelecting(false);
                    }}
                >
                    <div
                        className="w-24 h-24 bg-gray-600 flex items-center justify-center select-none cursor-pointer transition-all ease-out z-10"
                        style={{ position: component.state }}
                    >
                        {component.text}
                    </div>
                </Draggable>
            ))}
        </div>
    );
};

export default Components;
