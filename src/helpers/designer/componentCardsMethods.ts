import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { DraggableData } from "react-draggable";

function onMoveElement(
    data: DraggableData,
    components: DesignerComponent[],
    componentIndex: number,
    // setNewComponent: () => void,
) {
    const component: DesignerComponent = {
        ...components[componentIndex],
        state: "absolute",

        positionOffset: {
            x: Math.abs(data.x),
            y: computeVerticalOffset(
                components.length,
                componentIndex,
                data.node.offsetHeight +
                    parseInt(window.getComputedStyle(data.node).marginTop) +
                    parseInt(window.getComputedStyle(data.node).marginBottom),
            ),
        },
    };
    // const newComponents = components
    //     .slice(0, componentIndex)
    //     .concat(components.slice(componentIndex + 1));
    // insertAtIndex(newComponents, componentIndex, component)
    // setNewComponent();
    return component;
}

function computeVerticalOffset(
    arrayLength: number,
    index: number,
    elementOffSetHeight: number,
): number {
    const middleIndex = Math.floor(arrayLength / 2);

    if (arrayLength % 2 !== 0) {
        let offsetHeight;

        if (index < middleIndex) {
            offsetHeight =
                elementOffSetHeight * -(middleIndex - index) -
                elementOffSetHeight / 1.5;
        } else if (index === middleIndex) {
            offsetHeight = 0;
        } else {
            offsetHeight =
                elementOffSetHeight * (index - middleIndex) +
                elementOffSetHeight / 1.5;
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
    components: DesignerComponent[],
    componentIndex: number,
    // setComponents: React.Dispatch<React.SetStateAction<DesignerComponent[]>>,
) {
    const component: DesignerComponent = {
        ...components[componentIndex],
        state: "relative",
        positionOffset: { x: 0, y: 0 },
    };

    return component;
    // const newComponents = components
    //     .slice(0, componentIndex)
    //     .concat(components.slice(componentIndex + 1));
    // setComponents(insertAtIndex(newComponents, componentIndex, component));
}

function insertAtIndex(arr: any[], index: number, element: any) {
    arr.splice(index, 0, element);
    return arr;
}

export { computeVerticalOffset, insertAtIndex, onMoveElement, onStopDrag };
