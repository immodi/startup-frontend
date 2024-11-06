import React, { useEffect, useState } from "react";
import Draggable, { ControlPosition, DraggableData } from "react-draggable";

interface Component {
    text: string;
    state: "absolute" | "relative";
    position: ControlPosition;
    positionOffset: ControlPosition;
}

const Designer: React.FC = () => {
    const [components, setComponents] = useState<Array<Component>>([]);

    useEffect(() => {
        const componentsArray: Component[] = [];
        const elementsNumber = 8;
        for (let i = 0; i < elementsNumber; i++) {
            componentsArray.push({
                text: `DIV ${i}`,
                position: { x: 0, y: elementsNumber + -40 },
                state: "relative",
                positionOffset: { x: 0, y: 0 },
            });
        }

        setComponents(componentsArray);
    }, []);

    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center">
            {components.map((component, index) => {
                return (
                    <Draggable
                        positionOffset={{
                            x: component.positionOffset.x,
                            y: component.positionOffset.y,
                        }}
                        position={component.position}
                        onStart={(_, data) => {
                            onMoveElement(
                                data,
                                components,
                                index,
                                setComponents,
                            );
                        }}
                        onStop={() => {
                            onStopDrag(components, index, setComponents);
                        }}
                    >
                        <div
                            className={`w-10 h-10 bg-red-600 flex items-center justify-center select-none cursor-pointer transition-all ease-out ${component.state}`}
                        >
                            {component.text}
                        </div>
                    </Draggable>
                );
            })}
        </div>
    );
};

function onMoveElement(
    data: DraggableData,
    components: Component[],
    componentIndex: number,
    setComponents: React.Dispatch<React.SetStateAction<Component[]>>,
) {
    const component = {
        ...components[componentIndex],
        state: "absolute",
        positionOffset: {
            x: Math.abs(data.x),
            y: computeOffset(
                components.length,
                componentIndex,
                data.node.offsetHeight,
            ),
        },
    };
    const newComponents = components
        .slice(0, componentIndex)
        .concat(components.slice(componentIndex + 1));
    setComponents(insertAtIndex(newComponents, componentIndex, component));
}

function computeOffset(
    arrayLength: number,
    index: number,
    elementOffSetHeight: number,
): number {
    const middleIndex = Math.floor(arrayLength / 2);

    if (arrayLength % 2 !== 0) {
        let offsetHeight;

        if (index < middleIndex) {
            offsetHeight = elementOffSetHeight * -(middleIndex - index);
        } else if (index === middleIndex) {
            offsetHeight = 0;
        } else {
            offsetHeight = elementOffSetHeight * (index - middleIndex);
        }

        return offsetHeight;
        // array is odd
    } else {
        const middleIndices = [middleIndex - 1, middleIndex];
        let offsetHeight;

        if (index < middleIndices[0]) {
            offsetHeight =
                elementOffSetHeight * -(middleIndex - index) +
                elementOffSetHeight / 2;
        } else if (index === middleIndices[0]) {
            offsetHeight = 0 - elementOffSetHeight / 2;
        } else if (index === middleIndices[1]) {
            offsetHeight = 0 + elementOffSetHeight / 2;
        } else {
            offsetHeight =
                elementOffSetHeight * (index - middleIndex) +
                elementOffSetHeight / 2;
        }
        return offsetHeight;
    }
}

function onStopDrag(
    components: Component[],
    componentIndex: number,
    setComponents: React.Dispatch<React.SetStateAction<Component[]>>,
) {
    const component = {
        ...components[componentIndex],
        state: "relative",
        positionOffset: { x: 0, y: 0 },
    };
    const newComponents = components
        .slice(0, componentIndex)
        .concat(components.slice(componentIndex + 1));
    setComponents(insertAtIndex(newComponents, componentIndex, component));
}

function insertAtIndex(arr: any[], index: number, element: any) {
    arr.splice(index, 0, element);
    return arr;
}

export default Designer;
