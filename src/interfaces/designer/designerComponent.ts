import { ControlPosition } from "react-draggable";

export interface DesignerComponent {
    index: number;
    text: string;
    state: "absolute" | "relative";
    position: ControlPosition;
    positionOffset: ControlPosition;
}
