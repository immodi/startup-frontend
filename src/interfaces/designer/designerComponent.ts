import { CanvasElement } from "@/components/routes/designer/elements/CanvasElementsRenderer";
import { ControlPosition } from "react-draggable";

export interface DesignerComponent {
    index: number;
    text: string;
    description: string;
    state: "absolute" | "relative";
    node?: HTMLElement;
    position: ControlPosition;
    positionOffset: ControlPosition;
    element: CanvasElement;
    icon: string;
}
