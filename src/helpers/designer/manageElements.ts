import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { ComponentsIndexInterface } from "./scrollBehaviors";
import {
    Action,
    setComponentsArray,
} from "@/hooks/designer/componentsPagedArrayDispatcher";

export function populateDummyElements(
    setComponents: React.Dispatch<React.SetStateAction<DesignerComponent[]>>,
) {
    const componentsArray: DesignerComponent[] = [];
    const elementsNumber = 10;

    for (let i = 0; i < elementsNumber; i++) {
        componentsArray.push({
            index: i,
            text: `DIV ${i}`,
            position: {
                x: 0,
                y: 0,
            },
            state: "relative",
            positionOffset: { x: 0, y: 0 },
            element: {
                element: "div",
                id: i,
                text: i.toString(),
                customClasses:
                    "w-full h-20 bg-red-200 text-black flex justify-center items-center text-7xl",
            },
        });
    }

    setComponents(componentsArray);
}

export function indexAndDisplayElements(
    components: DesignerComponent[],
    currentComponentsInterface: ComponentsIndexInterface,
    setCurrentComponentsInterface: (ci: ComponentsIndexInterface) => void,
    componentsPagedArraydispatch: React.Dispatch<Action>,
) {
    const pagedArray: DesignerComponent[][] = [];
    const indexer = 3;
    const subArrayNumber =
        components.length % 3 === 0
            ? Math.trunc(components.length / 3)
            : Math.trunc(components.length / 3) + 1;

    for (let i = 0; i < subArrayNumber; i++) {
        pagedArray.push(
            i === subArrayNumber + 1
                ? components.slice(i * indexer, -1)
                : components.slice(i * indexer, i * indexer + indexer),
        );
    }

    setCurrentComponentsInterface({
        ...currentComponentsInterface,
        subArrayCount: subArrayNumber,
    });

    setComponentsArray(componentsPagedArraydispatch, pagedArray);
}
