import Container from "@/assets/container.svg";
import H1 from "@/assets/h1.svg";
import H2 from "@/assets/h2.svg";
import H3 from "@/assets/h3.svg";
import H4 from "@/assets/h4.svg";
import H5 from "@/assets/h5.svg";
// import OL from "@/assets/ol.svg";
import Spacer from "@/assets/spacer.svg";
import Text from "@/assets/text.svg";
// import UL from "@/assets/ul.svg";
import { getDefaultDesignerComponent } from "@/helpers/designer/manageElements";
import { DesignerComponent } from "@/interfaces/designer/designerComponent";
import { CanvasElement, Headers } from "./CanvasElementsRenderer";

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

const defaultContainerContent: Array<CanvasElement> = [
    {
        identifier: "Text",
        element: "div",
        id: 98,
        text: "First Text Block",
        customClasses: "text-black",
        selectMode: "idle",
        userStyle: {
            width: 50,
            fontFamily: "Sans",
            textColor: "black",
            textAlignment: "center",
            isBold: false,
            isItalic: true,
            isUnderline: false,
        },
    },
    {
        identifier: "Text",
        element: "div",
        id: 99,
        text: "Second Text Block",
        customClasses: "text-black",
        selectMode: "idle",
        userStyle: {
            width: 50,
            fontFamily: "Sans",
            textColor: "black",
            textAlignment: "center",
            isBold: false,
            isItalic: false,
            isUnderline: true,
        },
    },
];

export const CanvasElements: DesignerComponent[] = [
    ...canvasHeaders,

    // text
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

    // <ol>
    // getDefaultDesignerComponent({
    //     index: 7,
    //     text: "Orderd List",
    //     description: "Numbered List",
    //     icon: OL,
    //     element: {
    //         identifier: null,
    //         element: "ol",
    //         id: 7,
    //         text: "",
    //         customClasses: "spacer-div list-decimal list flex flex-col",
    //         selectMode: "idle",
    //         userStyle: {
    //             fontFamily: "Sans",
    //             textColor: "black",
    //             textAlignment: "left",
    //             isBold: false,
    //             isItalic: false,
    //             isUnderline: false,
    //             // textContent: "Default Text",
    //         },
    //         childrenNodeTexts: ["list item 1", "list item 2", "list item 3"],
    //         tabWidth: 1,
    //     },
    // }),

    // // <ul>
    // getDefaultDesignerComponent({
    //     index: 8,
    //     text: "Unorderd List",
    //     description: "Not a Numbered List",
    //     icon: UL,
    //     element: {
    //         identifier: null,
    //         element: "ul",
    //         id: 8,
    //         text: "",
    //         customClasses: "spacer-div list-disc list flex flex-col",
    //         selectMode: "idle",
    //         userStyle: {
    //             fontFamily: "Sans",
    //             textColor: "black",
    //             textAlignment: "left",
    //             isBold: false,
    //             isItalic: false,
    //             isUnderline: false,
    //             // textContent: "Default Text",
    //         },
    //         childrenNodeTexts: ["list item 1", "list item 2", "list item 3"],
    //         tabWidth: 1,
    //     },
    // }),

    // <br>
    getDefaultDesignerComponent({
        index: 9,
        text: "Space",
        description: "Element Spacer",
        icon: Spacer,
        element: {
            identifier: null,
            element: "div",
            id: 9,
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

    // container
    getDefaultDesignerComponent({
        index: 10,
        text: "Container",
        description: "Element Container",
        icon: Container,
        element: {
            identifier: null,
            element: "div",
            id: 10,
            text: "",
            customClasses: "container-div",
            selectMode: "idle",
            childrenNodes: defaultContainerContent,
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
];
