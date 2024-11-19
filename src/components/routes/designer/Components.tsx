import {
    Context,
    ContextInterface,
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import Arrow from "./MoreComponetsArrow";

const Components: React.FC = () => {
    const [components, setComponents] = useState<Array<DesignerComponent>>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { designerComponentRef } = designerContext;

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
                    x: 0,
                    y: 0,
                },
                state: "relative",
                positionOffset: { x: 0, y: 0 },
            });
        }

        setComponents(componentsArray);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        vertical: true,
        swipe: false,
        centerMode: true, // Center the current slide
        variableWidth: true, // Allow variable-width slides
    };

    return (
        <div
            ref={containerRef}
            className={`bg-white dark:bg-gray-800 w-80 h-full transition-all border duration-300 transform self-end relative overflow-visible grid place-items-center gap-10`}
            style={{
                padding: "1rem",
                boxSizing: "border-box",
                // overflow: isSelecting ? "visible" : "scroll",
            }}
        >
            {components.map((component, index) => (
                <Draggable
                    key={index}
                    position={component.position}
                    onDrag={() => {
                        // onMoveElement(data, components, index, setComponents);
                        // setIsSelecting(true);
                    }}
                    onStop={() => {
                        // onStopDrag(components, index, setComponents);
                        // setIsSelecting(false);
                    }}
                >
                    <div
                        className="w-24 h-24 bg-gray-600 flex items-center justify-center select-none cursor-pointer transition-all ease-out"
                        style={{ position: component.state }}
                    >
                        {component.text}
                    </div>
                </Draggable>
            ))}

            <Arrow />
        </div>
    );
};

export default Components;
