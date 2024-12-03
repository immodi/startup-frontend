import { getDefaultDesignerComponent } from "@/helpers/designer/manageElements";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { Headers } from "./CanvasElementsRenderer";

interface HeadersData {
    name: string;
    tagName: Headers;
    text: string;
    className: string;
}

const headersText = ["Header", "h", "Default H"];
const headersStyles = [
    "text-4xl font-bold tracking-tight text-gray-900",
    "text-3xl font-semibold tracking-tight text-gray-800",
    "text-2xl font-medium text-gray-700",
    "text-xl font-medium text-gray-700",
    "text-lg font-medium text-gray-700",
];
const headersData: HeadersData[] = [1, 2, 3, 4, 5].map((number, index) => {
    return {
        name: `${headersText[0]}${number > 1 ? " " + number : ""}`,
        tagName: `${headersText[1]}${number}` as Headers,
        text: `${headersText[2]}${number}`,
        className: headersStyles[index],
    };
});

const canvasHeaders: DesignerComponent[] = headersData.map((value, index) => {
    return getDefaultDesignerComponent({
        index: index,
        text: value.name,
        element: {
            element: value.tagName,
            id: index,
            text: value.text,
            customClasses: value.className,
            selectMode: "idle",
        },
    });
});

export const CanvasElements: DesignerComponent[] = [
    ...canvasHeaders,

    getDefaultDesignerComponent({
        index: 6,
        text: "Text Area",
        element: {
            element: "p",
            id: 6,
            text: "Default Text",
            customClasses: "text-white",
            selectMode: "idle",
        },
    }),
];
