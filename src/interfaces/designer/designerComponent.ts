import { CanvasElement } from "@/components/routes/designer/elements/CanvasElementsRenderer";
import { ReactNode } from "react";
import { ControlPosition } from "react-draggable";

export interface DesignerComponent {
    index: number;
    text: string;
    state: "absolute" | "relative";
    position: ControlPosition;
    positionOffset: ControlPosition;
    element: CanvasElement;
}
