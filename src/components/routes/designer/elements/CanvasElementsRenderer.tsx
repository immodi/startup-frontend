import { ReactElement } from "react";

export type ElementsType = "div" | Headers | "p";
export type Headers = "h1" | "h2" | "h3" | "h4" | "h5";

export interface CanvasElement {
    id: number;
    element: ElementsType;
    text: string;
    customClasses?: string;
}

export function ElementsRenderer(elements: CanvasElement[]): ReactElement {
    return (
        <>
            {elements.map((element) => {
                const className = element.customClasses ?? "";
                switch (element.element) {
                    case "div":
                        return <div className={className}>{element.text}</div>;
                    case "h1":
                        return <h1 className={className}>{element.text}</h1>;
                    default:
                        return <div className={className}>Default Text</div>;
                }
            })}
        </>
    );
}
