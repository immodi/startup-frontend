import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { ComponentsIndexInterface } from "./scrollBehaviors";
import {
    Action,
    setComponentsArray,
} from "@/hooks/designer/componentsPagedArrayDispatcher";
import { CanvasElement } from "@/components/routes/designer/elements/CanvasElementsRenderer";

export function populateDummyElements(
    setComponents: React.Dispatch<React.SetStateAction<DesignerComponent[]>>,
) {
    const componentsArray: DesignerComponent[] = [
        getDefaultDesignerComponent({
            index: 0,
            text: "Header",
            element: {
                element: "h1",
                id: 0,
                text: "Default H1",
                customClasses:
                    "w-full " +
                    "text-4xl font-bold text-gray-800 leading-tight",
                selected: false,
            },
        }),
        getDefaultDesignerComponent({
            index: 1,
            text: "Header 2",
            element: {
                element: "h2",
                id: 1,
                text: "Default H2",
                customClasses:
                    "w-full " +
                    "text-2xl font-semibold text-gray-700 leading-snug",
                selected: false,
            },
        }),
        getDefaultDesignerComponent({
            index: 2,
            text: "Header 3",
            element: {
                element: "h3",
                id: 2,
                text: "Default H3",
                customClasses:
                    "w-full " +
                    "text-xl font-semibold text-gray-600 leading-snug",
                selected: false,
            },
        }),
        getDefaultDesignerComponent({
            index: 3,
            text: "Text Area",
            element: {
                element: "p",
                id: 3,
                text: "Default Text",
                customClasses: "w-full " + "text-white",
                selected: false,
            },
        }),
    ];

    setComponents(componentsArray);
}

interface PartialDesignerComponent {
    index: number;
    text: string;
    element: CanvasElement;
}

function getDefaultDesignerComponent(
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
