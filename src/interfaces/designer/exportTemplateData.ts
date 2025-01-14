import { CanvasElement } from "@/components/routes/designer/elements/CanvasElementsRenderer";

export interface TemplateData {
    id: string;
    name: string;
    data: Array<string>;
    html: string;
    canvasElements: CanvasElement[];
}
