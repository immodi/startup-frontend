import { CanvasElements } from "@/components/routes/designer/elements/CanvasElementsConstant";
import { CanvasElement } from "@/components/routes/designer/elements/CanvasElementsRenderer";
import {
    Action,
    setComponentsArray,
} from "@/hooks/designer/componentsPagedArrayDispatcher";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { ComponentsIndexInterface } from "./scrollBehaviors";

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
    isPhoneLandscape: boolean,
    maxElementsNumber: number,
    components: DesignerComponent[],
    currentComponentsInterface: ComponentsIndexInterface,
    setCurrentComponentsInterface: (ci: ComponentsIndexInterface) => void,
    componentsPagedArraydispatch: React.Dispatch<Action>,
) {
    const pagedArray: DesignerComponent[][] = [];
    const indexer = maxElementsNumber;
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

    // Check for landscape orientation or if the device is a tablet/PC
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const isLargeScreen = window.innerWidth > 768; // Consider anything larger than 768px as tablet/PC
    let currentIndex =
        !isPhoneLandscape && isLandscape && isLargeScreen
            ? 0
            : currentComponentsInterface.currentIndex;
    // not a phone and not in landscape with large screen with 10 indexer
    // reset current page to the first

    setCurrentComponentsInterface({
        currentIndex: currentIndex,
        subArrayCount: subArrayNumber,
    });

    setComponentsArray(componentsPagedArraydispatch, pagedArray);
}
