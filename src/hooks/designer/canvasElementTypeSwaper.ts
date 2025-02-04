import {
    CanvasElement,
    ElementsType,
    Headers,
} from "@/components/routes/designer/elements/CanvasElementsRenderer";

type Lists = "ol" | "ul";
type CanvasElementType = Headers | Lists | "text" | "br";

// Create arrays of all possible values
// const LISTS = ["ol", "ul"] as const;
const HEADERS = ["h1", "h2", "h3", "h4", "h5"] as const;
export const CANVAS_ELEMENT_TYPES = [
    ...HEADERS,
    // ...LISTS,
    "br",
    "text",
] as const;

const headersStyles = [
    "text-4xl font-bold tracking-tight text-gray-900",
    "text-3xl font-semibold tracking-tight text-gray-800",
    "text-2xl font-medium text-gray-700",
    "text-xl font-medium text-gray-700",
    "text-lg font-medium text-gray-700",
];

export function changeCanvasElementType(
    element: CanvasElement,
    newType: CanvasElementType,
): CanvasElement {
    if (newType.charAt(0) === "h") {
        return {
            ...element,
            text:
                element.text === "{SPACER}"
                    ? `Default Header Text`
                    : element.text,
            element: newType as ElementsType,
            customClasses: `${headersStyles[parseInt(newType.charAt(1))]}`,
            childrenNodeTexts: undefined,
            childrenNodes: undefined,
            tabWidth: undefined,
        };
    } else if (newType === "br") {
        return {
            ...element,
            element: "div",
            text: "{SPACER}",
            customClasses: `spacer-div`,
            childrenNodeTexts: undefined,
            childrenNodes: undefined,
            tabWidth: undefined,
        };
    }
    // } else if (newType.charAt(1) === "l") {
    //     return {
    //         ...element,
    //         element: "ol",
    //         text: "",
    //         customClasses: `spacer-div list-disc list flex flex-col`,
    //         childrenNodes: undefined,
    //         childrenNodeTexts: element.childrenNodeTexts ?? [
    //             "list item 1",
    //             "list item 2",
    //             "list item 3",
    //         ],
    //         tabWidth: element.tabWidth ?? 1,
    //     };
    // }
    return {
        ...element,
        element: "div",
        text: element.text === "{SPACER}" ? "Default Text" : element.text,
        customClasses: "text-black",
        childrenNodeTexts: undefined,
        childrenNodes: undefined,
        tabWidth: undefined,
    };
}

export function defaultTextCanvasElement(): CanvasElement {
    const id = Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now()),
    );
    return {
        id: id,
        identifier: id.toString().concat(generateIdentifier()),
        element: "div",
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
            width: 10,
        },
    };
}

function generateIdentifier(): string {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let identifier = "";
    for (let i = 0; i < 6; i++) {
        identifier += characters.charAt(
            Math.floor(Math.random() * characters.length),
        );
    }
    return identifier;
}
