import { ControlPosition } from "react-draggable";

export interface DesignerComponent {
    text: string;
    state: "absolute" | "relative";
    position: ControlPosition;
    positionOffset: ControlPosition;
}
