import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { ComponentsIndexInterface } from "./scrollBehaviors";
import {
    Action,
    setComponentsArray,
} from "@/hooks/designer/componentsPagedArrayDispatcher";
import { CanvasElement } from "@/components/routes/designer/elements/CanvasElementsRenderer";
import { CanvasElements } from "@/components/routes/designer/elements/CanvasElementsConstant";
import H1 from "@/assets/designer-elements-svgs/h1.svg";
import { icons } from "lucide-react";

export function populateDummyElements(
    setComponents: React.Dispatch<React.SetStateAction<DesignerComponent[]>>,
) {
    setComponents(CanvasElements);
}

export interface PartialDesignerComponent {
    index: number;
    text: string;
    element: CanvasElement;
    description: string;
    icon: string;
}

export function getDefaultDesignerComponent(
    cp: PartialDesignerComponent,
): DesignerComponent {
    return {
        ...cp,
        position: {
            x: 0,
            y: 0,
        },
        state: "relative",
        positionOffset: { x: 0, y: 0 },
    };
}

export function indexAndDisplayElements(
    components: DesignerComponent[],
    currentComponentsInterface: ComponentsIndexInterface,
    setCurrentComponentsInterface: (ci: ComponentsIndexInterface) => void,
    componentsPagedArraydispatch: React.Dispatch<Action>,
) {
    const pagedArray: DesignerComponent[][] = [];
    const indexer = 6;
    const subArrayNumber =
        components.length % indexer === 0
            ? Math.trunc(components.length / indexer)
            : Math.trunc(components.length / indexer) + 1;

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
