import { getDefaultDesignerComponent } from "@/helpers/designer/manageElements";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { Headers } from "./CanvasElementsRenderer";
import H1 from "@/assets/designer-elements-svgs/h1.svg";
import H2 from "@/assets/designer-elements-svgs/h2.svg";
import H3 from "@/assets/designer-elements-svgs/h3.svg";
import H4 from "@/assets/designer-elements-svgs/h4.svg";
import H5 from "@/assets/designer-elements-svgs/h5.svg";
import Text from "@/assets/designer-elements-svgs/text.svg";
import Spacer from "@/assets/designer-elements-svgs/spacer.svg";

interface HeadersData {
    name: string;
    tagName: Headers;
    text: string;
    description: string;
    className: string;
    icon: string;
}

const headersText = ["H", "h", "Document H"];
const headersDescription = [
    "Main Title",
    "Section Header",
    "Sub Section",
    "Minor Header",
    "Small Header",
];

const headersStyles = [
    "text-4xl font-bold tracking-tight text-gray-900",
    "text-3xl font-semibold tracking-tight text-gray-800",
    "text-2xl font-medium text-gray-700",
    "text-xl font-medium text-gray-700",
    "text-lg font-medium text-gray-700",
];

const headersIcons = [H1, H2, H3, H4, H5];
const headersData: HeadersData[] = [1, 2, 3, 4, 5].map((number, index) => {
    return {
        name: `${headersText[0]}${number ? number : ""}`,
        tagName: `${headersText[1]}${number}` as Headers,
        text: `${headersText[2]}${number}`,
        description: headersDescription[index],
        className: headersStyles[index],
        icon: headersIcons[index],
    };
});

const canvasHeaders: DesignerComponent[] = headersData.map((value, index) => {
    return getDefaultDesignerComponent({
        index: index,
        text: value.name,
        description: value.description,
        icon: value.icon,
        element: {
            identifier: value.text,
            element: value.tagName,
            id: index,
            text: value.text,
            customClasses: value.className,
            selectMode: "idle",
            userStyle: {
                fontFamily: "Sans",
                textColor: "black",
                isBold: false,
                textAlignment: "left",
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
        description: "Paragraph",
        icon: Text,
        element: {
            identifier: "Text",
            element: "div",
            id: 6,
            text: "Default Text",
            customClasses: "text-black",
            selectMode: "idle",
            userStyle: {
                fontFamily: "Sans",
                textColor: "black",
                textAlignment: "left",
                isBold: false,
                isItalic: false,
                isUnderline: false,
                // textContent: "Default Text",
            },
        },
    }),

    getDefaultDesignerComponent({
        index: 7,
        text: "Space",
        description: "Element Spacer",
        icon: Spacer,
        element: {
            identifier: null,
            element: "div",
            id: 7,
            text: "{SPACER}",
            customClasses: "spacer-div",
            selectMode: "idle",
            userStyle: {
                fontFamily: "Sans",
                textColor: "black",
                textAlignment: "center",
                isBold: false,
                isItalic: false,
                isUnderline: false,
                // textContent: "Default Text",
            },
        },
    }),
];
