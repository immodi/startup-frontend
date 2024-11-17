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
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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
        // <div
        //     ref={containerRef}
        //     className={`bg-white dark:bg-gray-800 shadow-lg w-80 h-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : "border-gray-300"} self-end relative`}
        //     style={{
        //         padding: "1rem",
        //         boxSizing: "border-box",
        //         overflowY: isSelecting ? "visible" : "scroll",
        //     }}
        // >
        // </div>

        // nned to be able to render the cards outside their parents
        <div className="w-full h-full self-end bg-gray-100 dark:bg-gray-800 flex justify-end overflow-visible">
            <Slider
                {...settings}
                className="w-48 bg-white dark:bg-gray-900 h-full relative self-end transition-all duration-300 overflow-visible"
            >
                {components.map((component, index) => (
                    <div key={index}>
                        <Draggable
                            position={component.position}
                            onDrag={(_, data) => {
                                // onMoveElement(
                                //     data,
                                //     components,
                                //     index,
                                //     setComponents,
                                // );
                                // setIsSelecting(true);
                            }}
                            onStop={() => {
                                // onStopDrag(components, index, setComponents);
                                // setIsSelecting(false);
                            }}
                        >
                            <div
                                className="w-24 h-24 bg-gray-600 select-none cursor-pointer transition-all ease-out flex justify-center items-center left-1/2"
                                style={{ position: component.state }}
                            >
                                {component.text}
                            </div>
                        </Draggable>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Components;
