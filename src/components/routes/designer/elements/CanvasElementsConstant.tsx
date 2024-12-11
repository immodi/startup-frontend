import { getDefaultDesignerComponent } from "@/helpers/designer/manageElements";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { Headers } from "./CanvasElementsRenderer";

interface HeadersData {
    name: string;
    tagName: Headers;
    text: string;
    className: string;
}

const headersText = ["H", "h", "Default H"];
const headersStyles = [
    "text-4xl font-bold tracking-tight text-gray-900",
    "text-3xl font-semibold tracking-tight text-gray-800",
    "text-2xl font-medium text-gray-700",
    "text-xl font-medium text-gray-700",
    "text-lg font-medium text-gray-700",
];
const headersData: HeadersData[] = [1, 2, 3, 4, 5].map((number, index) => {
    return {
        name: `${headersText[0]}${number > 1 ? number : ""}`,
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
            userStyle: {
                fontFamily: "Arial",
                textColor: "black",
                isBold: false,
                isItalic: false,
                isUnderline: false,
                // textContent: "Default Text",
            },
        },
    });
});

export const CanvasElements: DesignerComponent[] = [
    ...canvasHeaders,

    getDefaultDesignerComponent({
        index: 6,
        text: "Text",
        element: {
            element: "p",
            id: 6,
            text: "Default Text",
            customClasses: "text-black",
            selectMode: "idle",
            userStyle: {
                fontFamily: "Arial",
                textColor: "black",
                isBold: false,
                isItalic: false,
                isUnderline: false,
                // textContent: "Default Text",
            },
        },
    }),

    getDefaultDesignerComponent({
        index: 7,
        text: "😊",
        element: {
            element: "p",
            id: 7,
            text: "😊",
            customClasses: "",
            selectMode: "idle",
            userStyle: {
                fontFamily: "Arial",
                textColor: "red",
                isBold: false,
                isItalic: false,
                isUnderline: false,
                // textContent: "Default Text",
            },
        },
    }),
];
